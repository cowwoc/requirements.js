/* eslint-disable jsdoc/require-jsdoc */
import babel from "gulp-babel";
import babelConfig from "./.babelrc.js";
import eslint from "gulp-eslint7";
import gulp from "gulp";
import replace from "gulp-replace";
import rollupCommonjs from "@rollup/plugin-commonjs";
import rollupNodeResolve from "@rollup/plugin-node-resolve";
import rollupTypescript from "@rollup/plugin-typescript";
import rollupBabel from "@rollup/plugin-babel";
import rename from "gulp-rename";
import {rollup} from "rollup";
import sourcemaps from "gulp-sourcemaps";
import tape from "gulp-tape";
import tapeReporter from "tap-diff";
import terser from "gulp-terser";
import log from "fancy-log";
import parseArgs from "minimist";
import jsdoc from "gulp-jsdoc3";
import nodeGlobals from "rollup-plugin-node-globals";
import connect from "gulp-connect";
import typescript from "gulp-typescript";

const env = parseArgs(process.argv.slice(2));
let mode = env.mode;
if (typeof (mode) === "undefined")
	mode = "DEBUG";
const isReleaseMode = mode === "RELEASE";
const targets = ["node 15"];
log.info(mode + " mode detected");

function lintJs()
{
	return gulp.src(["gulpfile.babel.js", ".eslintrc.js"]).
		pipe(eslint(
			{
				parserOptions:
					{
						// debugLevel: true
					}
			})).
		pipe(eslint.format()).
		pipe(eslint.failOnError());
}

function lintTs()
{
	const checkTypescript = typescript.createProject("tsconfig.json", {
		noEmit: true
	});
	return gulp.src(
		[
			"src/**/*.ts",
			"test/**/*.ts"
		]).
		pipe(checkTypescript()).
		pipe(eslint(
			{
				parserOptions:
					{
						// debugLevel: true
					}
			})).
		pipe(eslint.format()).
		pipe(eslint.failOnError());
}

// Remove console.log, alert, debugger statements
const stripDebug =
	{
		compress:
			{
				defaults: false,
				ecma: 2020,
				/* eslint-disable camelcase */
				drop_console: true,
				drop_debugger: true,
				global_defs:
					{
						"@alert": "console.log"
					}
				/* eslint-enable camelcase */
			},
		mangle: false,
		format:
			{
				beautify: true
			}
	};

async function bundleSrcForBrowser()
{
	// See https://github.com/gulpjs/gulp/blob/master/docs/recipes/rollup-with-rollup-stream.md
	const bundle = await rollup(
		{
			input: "src/index.ts",
			external: ["lodash"],
			plugins:
				[
					rollupTypescript(),
					rollupNodeResolve(
						{
							mainFields: ["module"],
							preferBuiltins: true
						}),
					rollupCommonjs({include: "node_modules/**"}),
					nodeGlobals(),
					rollupBabel(
						{
							presets:
								[
									[
										"@babel/preset-env",
										{
											targets: ["defaults"]
										}
									]
								],
							babelHelpers: "runtime",
							plugins:
								[
									["@babel/plugin-transform-runtime",
										{
											useESModules: true
										}
									]
								],
							ignore: babelConfig.ignore
						})
				],
			// Assume that the top-level "this" is "window" since we are targeting a browser environment
			context: "window",
			onwarn(warning, warn)
			{
				// Ignore false alarm about circular dependency involving internal.ts
				const ignoredCircular =
					[
						"src/internal/internal.ts"
					];
				if (warning.code === "CIRCULAR_DEPENDENCY" && warning.importer &&
					ignoredCircular.includes(warning.importer.replace(/\\/g, "/")))
					return;
				// Reminder: Use warning.toString() to find out which file/line is at fault
				warn(warning);
			}
		});
	await bundle.write(
		{
			// On the browser, module exports need to be translated into global variables (properties of "window"):
			// https://github.com/rollup/rollup/issues/494#issuecomment-268243574
			name: "window",
			extend: true,
			format: "iife",
			globals:
				{
					lodash: "_",
					tty: "tty"
				},
			sourcemap: isReleaseMode,
			dir: "target/publish/browser"
		});
	if (isReleaseMode)
	{
		await gulp.src("target/publish/browser/**/*.js").
			pipe(sourcemaps.init({loadMaps: true})).
			pipe(terser(
				{
					ecma: 2020,
					compress:
						{
							/* eslint-disable camelcase */
							drop_console: true,
							global_defs:
								{
									"@alert": "console.log"
								}
							/* eslint-enable camelcase */
						}
				}
			)).
			pipe(rename("index.min.js")).
			pipe(sourcemaps.write(".")).
			pipe(gulp.dest("target/publish/browser"));
	}
}

function bundleSrcForNodeWithModules()
{
	let result = gulp.src("src/**/*.ts").
		pipe(babel({
			presets:
				[
					"@babel/preset-typescript",
					[
						"@babel/preset-env",
						{
							modules: false,
							targets
						}
					]
				],
			plugins:
				[
					"@babel/plugin-transform-typescript",
					"@babel/proposal-class-properties",
					"@babel/proposal-object-rest-spread",
					["babel-plugin-add-import-extension", {extension: "mjs"}]
				],
			ignore: babelConfig.ignore
		})).
		pipe(rename(path =>
		{
			path.extname = ".mjs";
		}));
	if (isReleaseMode)
		result = result.pipe(terser(stripDebug));
	return result.
		pipe(gulp.dest("target/publish/node/mjs"));
}

function bundleTypescriptDeclarations()
{
	const compileTypescript = typescript.createProject("tsconfig.json", {
		declaration: true,
		emitDeclarationOnly: true
	});
	return gulp.src("src/**/*.ts").
		pipe(compileTypescript()).
		pipe(gulp.dest("target/publish/node/ts"));
}

const babelConfigurationForCommonjs =
	{
		presets:
			[
				[
					"@babel/preset-env",
					{
						targets,
						modules: "cjs"
					}
				]
			],
		ignore: babelConfig.ignore
	};

function bundleSrcForNodeWithoutModules()
{
	let result = gulp.src("src/**/*.ts").
		pipe(babel(babelConfigurationForCommonjs));
	if (isReleaseMode)
		result = result.pipe(terser(stripDebug));
	return result.
		pipe(gulp.dest("target/publish/node/cjs"));
}

function bundleTest()
{
	let result = gulp.src("test/**/*.ts").
		pipe(replace("from \"../src/", "from \"../publish/node/cjs/")).
		pipe(babel(babelConfigurationForCommonjs));
	if (isReleaseMode)
		result = result.pipe(terser(stripDebug));
	return result.
		pipe(gulp.dest("target/test"));
}

function test()
{
	return gulp.src("target/test/**/*.js").
		pipe(tape(
			{
				reporter: tapeReporter(),
				nyc: true
			}));
}

function bundleJsDoc(cb)
{
	return gulp.src(["src/**/*.ts"], {read: false}).
		pipe(jsdoc(
			{
				tags:
					{
						allowUnknownTags: true
					},
				plugins: ["node_modules/better-docs/typescript"],
				source:
					{
						include: ["."],
						exclude: ["src/internal"],
						includePattern: "\\.ts$"
					},
				opts:
					{
						template: "node_modules/better-docs",
						destination: "./target/apidocs"
					}
			}, cb));
}

function bundleResources()
{
	return gulp.src(
		[
			"license.md",
			"package.json",
			"README.md"
		]).
		pipe(gulp.dest("target/publish"));
}

function server()
{
	connect.server(
		{
			livereload: true
		});
}

const lint = gulp.parallel(lintJs, lintTs);
const bundleAll = gulp.series(lint,
	gulp.parallel(bundleSrcForBrowser, bundleSrcForNodeWithModules, bundleSrcForNodeWithoutModules,
		bundleTypescriptDeclarations, bundleJsDoc, bundleResources));

// Per https://github.com/typescript-eslint/typescript-eslint/issues/109#issuecomment-536160947 we need
// separate configurations for JS and TS files
gulp.task("lint", lint);
gulp.task("server", server);
gulp.task("test", gulp.series(lint,
	gulp.parallel(bundleSrcForNodeWithModules, bundleTest), test));
gulp.task("bundle", bundleAll);
gulp.task("target", gulp.series(bundleAll, bundleTest, test));
gulp.task("watch", function()
{
	gulp.watch(["gulpfile.babel.js", ".eslintrc.js"], {delay: 500}, lintJs);
	gulp.watch(["src/**/*.ts", "test/**/*.ts"], {delay: 500},
		gulp.series(lintTs, bundleSrcForNodeWithoutModules, bundleTest, test));
});
gulp.task("default", gulp.parallel("target"));