import babel from "gulp-babel";
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
import uglify from "gulp-uglify";
import log from "fancy-log";
import parseArgs from "minimist";
import jsdoc from "gulp-jsdoc3";
import nodeGlobals from "rollup-plugin-node-globals";
import nodeBuiltins from "@stream-io/rollup-plugin-node-builtins";
import stripDebug from "gulp-strip-debug";
import connect from "gulp-connect";
import typescript from "gulp-typescript";

const env = parseArgs(process.argv.slice(2));
let mode = env.mode;
if (typeof (mode) === "undefined")
	mode = "DEBUG";
const isReleaseMode = mode === "RELEASE";
log.info(mode + " mode detected");

/* eslint-disable func-style */
gulp.task("lint.js", gulp.parallel(function()
{
	return gulp.src(
		[
			"gulpfile.babel.js",
			"src/**/*.js",
			"test/**/*.js"
		]).
		pipe(eslint(
			{
				parserOptions:
					{
						// debugLevel: true
					}
			})).
		pipe(eslint.format()).
		pipe(eslint.failOnError());
}));

gulp.task("lint.ts", gulp.parallel(function()
{
	return gulp.src(
		[
			"src/**/*.ts",
			"test/**/*.ts"
		]).
		pipe(eslint(
			{
				parserOptions:
					{
						// debugLevel: true
					}
			})).
		pipe(eslint.format()).
		pipe(eslint.failOnError());
}));

// Per https://github.com/typescript-eslint/typescript-eslint/issues/109#issuecomment-536160947 we need
// separate configurations for JS and TS files separately
gulp.task("lint", gulp.parallel("lint.js", "lint.ts"));

gulp.task("bundle-src-for-browser", gulp.parallel(async function()
{
	// See https://github.com/gulpjs/gulp/blob/master/docs/recipes/rollup-with-rollup-stream.md
	const bundle = await rollup(
		{
			input: "src/index.ts",
			external: ["urijs", "lodash"],
			plugins:
				[
					rollupTypescript(),
					rollupNodeResolve(
						{
							mainFields: ["module"],
							preferBuiltins: true
						}),
					rollupCommonjs({include: "node_modules/**"}),
					nodeBuiltins(),
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
								]
						})
				],
			// Assume that the top-level "this" is "window" since we are targeting a browser environment
			context: "window",
			onwarn(warning, warn)
			{
				const ignoredCircular =
					[
						"src/internal/internal.ts"
					];
				if (warning.code === "CIRCULAR_DEPENDENCY" &&
					ignoredCircular.includes(warning.importer.replace(/\\/g, "/")))
					return;
				warn(warning.toString());
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
					urijs: "URI",
					lodash: "_"
				},
			sourcemap: isReleaseMode,
			dir: "target/publish/browser"
		});
	if (isReleaseMode)
	{
		await gulp.src("target/publish/browser/**").
			pipe(stripDebug()).
			pipe(gulp.dest("target/publish/browser/**"));
		await gulp.src("index.ts").
			pipe(stripDebug()).
			pipe(sourcemaps.init({loadMaps: true})).
			pipe(uglify()).
			pipe(rename("index.min.js")).
			pipe(sourcemaps.write(".")).
			pipe(gulp.dest("target/publish/browser"));
	}
}));

gulp.task("bundle-src-for-node-with-modules", gulp.parallel(function()
{
	let result = gulp.src("src/**/*.ts");
	if (isReleaseMode)
		result = result.pipe(stripDebug());
	return result.
		pipe(babel({
			presets:
				[
					[
						"@babel/preset-env",
						{
							targets: ["node 14"]
						}
					]
				]
		})).
		pipe(gulp.dest("target/publish/node/mjs"));
}));

gulp.task("bundle-typescript-declarations", gulp.parallel(function()
{
	let result = gulp.src("src/**/*.ts");
	if (isReleaseMode)
		result = result.pipe(stripDebug());
	const compileTypescript = typescript.createProject("tsconfig.json", {
		declaration: true,
		emitDeclarationOnly: true
	});
	return result.
		pipe(compileTypescript()).
		pipe(gulp.dest("target/publish/node/ts"));
}));

const babelConfigurationForCommonjs =
	{
		presets:
			[
				[
					"@babel/preset-env",
					{
						targets: ["node 14"],
						modules: "cjs"
					}
				]
			]
	};

gulp.task("bundle-src-for-node-without-modules", gulp.parallel(function()
{
	let result = gulp.src("src/**/*.ts");
	if (isReleaseMode)
		result = result.pipe(stripDebug());
	return result.
		pipe(babel(babelConfigurationForCommonjs)).
		pipe(gulp.dest("target/publish/node/cjs"));
}));

gulp.task("bundle-test", gulp.parallel(function()
{
	let result = gulp.src("test/**/*.ts");
	if (isReleaseMode)
		result = result.pipe(stripDebug());
	return result.
		pipe(replace("from \"../src/", "from \"../publish/node/cjs/")).
		pipe(babel(babelConfigurationForCommonjs)).
		pipe(gulp.dest("target/test"));
}));

gulp.task("test", gulp.series(gulp.parallel("bundle-src-for-node-without-modules", "bundle-test"), function()
{
	return gulp.src("target/test/**/*.js").
		pipe(tape(
			{
				reporter: tapeReporter(),
				nyc: true
			}));
}));

gulp.task("bundle-jsdoc", gulp.parallel(function(cb)
{
	return gulp.src(["README.md", "src/**/*.ts"], {read: false}).
		pipe(jsdoc(
			{
				tags:
					{
						allowUnknownTags: true
					},
				plugins:
					[
						"node_modules/better-docs/typescript"
					],
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
}));

gulp.task("bundle-resources", gulp.parallel(function()
{
	return gulp.src(
		[
			"license.md",
			"package.json",
			"README.md"
		]).
		pipe(gulp.dest("target/publish"));
}));

gulp.task("server", gulp.parallel(function()
{
	connect.server(
		{
			livereload: true
		});
}));

gulp.task("bundle", gulp.parallel("bundle-src-for-browser", "bundle-src-for-node-with-modules",
	"bundle-src-for-node-without-modules", "bundle-typescript-declarations", "bundle-jsdoc",
	"bundle-resources"));
gulp.task("target", gulp.parallel("lint", "bundle", "test"));
gulp.task("default", gulp.parallel("target"));