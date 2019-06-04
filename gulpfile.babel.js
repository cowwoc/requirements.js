import babel from "gulp-babel";
import commonjs from "rollup-plugin-commonjs";
import eslint from "gulp-eslint";
import gulp from "gulp";
import replace from "gulp-replace";
import nodeResolve from "rollup-plugin-node-resolve";
import rollupBabel from "rollup-plugin-babel";
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
import stripDebug from "gulp-strip-debug";
import connect from "gulp-connect";

const env = parseArgs(process.argv.slice(2));
let mode = env.mode;
if (typeof (mode) === "undefined")
	mode = "DEBUG";
const isReleaseMode = mode === "RELEASE";
log.info(mode + " mode detected");

/* eslint-disable func-style */
gulp.task("lint", gulp.parallel(function()
{
	return gulp.src(
		[
			"gulpfile.babel.js",
			"src/**/*.js",
			"test/**/*.js"
		]).
		pipe(eslint(
			{
				envs: ["es6", "node", "browser"]
			}
		)).
		pipe(eslint.format()).
		pipe(eslint.failOnError());
}));

gulp.task("bundle-src-for-browser", gulp.parallel(async function()
{
	// See https://github.com/gulpjs/gulp/blob/master/docs/recipes/rollup-with-rollup-stream.md
	const bundle = await rollup({
		input: "src/index.js",
		external: ["urijs", "sugar"],
		plugins: [
			nodeResolve(
				{
					mainFields: ["module", "main", "browser"]
				}
			),
			commonjs({include: "node_modules/**"}),
			nodeGlobals(),
			rollupBabel(
				{
					babelrc: false,
					exclude: "node_modules/**",
					presets: [
						"@babel/preset-env"
					]
				})
		],
		// Assume that the top-level "this" is "window" since we are targeting a browser environment
		context: "window",
		onwarn(warning, warn)
		{
			// We only care about circular dependencies that affect top-level declarations
			const ignoredCircular = [
				"src/NoOpObjectVerifier.js",
				"src/NoOpArrayVerifier.js",
				"src/ObjectVerifier.js",
				"src/ArrayVerifier.js",
				"src/Configuration.js"
			];
			if (warning.code === "CIRCULAR_DEPENDENCY" && ignoredCircular.includes(warning.importer.replace(/\\/g, "/")))
				return;
			warn(warning);
		}
	});
	await bundle.write({
		// On the browser, module exports need to be translated into global variables (properties of "window"):
		// https://github.com/rollup/rollup/issues/494#issuecomment-268243574
		name: "window",
		extend: true,
		format: "iife",
		globals: {
			urijs: "URI",
			sugar: "Sugar"
		},
		sourcemap: isReleaseMode,
		dir: "build/es5/browser"
	});
	if (isReleaseMode)
	{
		await gulp.src("build/es5/browser/**").
			pipe(stripDebug()).
			pipe(gulp.dest("build/es5/browser/**"));
		await gulp.src("index.js").
			pipe(stripDebug()).
			pipe(sourcemaps.init({loadMaps: true})).
			pipe(uglify()).
			pipe(rename("index.min.js")).
			pipe(sourcemaps.write(".")).
			pipe(gulp.dest("build/es5/browser"));
	}
}));

gulp.task("bundle-src-for-node", gulp.parallel(function()
{
	let result = gulp.src(
		[
			"src/**/*.js",
			"!src/index.js"
		]
	);
	if (isReleaseMode)
		result = result.pipe(stripDebug());
	return result.
		pipe(babel({
			presets: [
				"@babel/preset-env"
			]
		})).
		pipe(gulp.dest("build/es5/node"));
}));

gulp.task("bundle-test", gulp.parallel(function()
{
	let result = gulp.src("test/**/*.js").
		pipe(replace("from \"../src/", "from \"../node/")).
		pipe(babel(
			{
				presets: [
					"@babel/preset-env"
				]
			}));
	if (isReleaseMode)
		result = result.pipe(stripDebug());
	return result.
		pipe(gulp.dest("build/es5/test"));
}));

gulp.task("test", gulp.series(gulp.parallel("bundle-src-for-node", "bundle-test"), function()
{
	return gulp.src("build/es5/test/**/*.js").
		pipe(tape(
			{
				reporter: tapeReporter(),
				nyc: true
			}));
}));

gulp.task("bundle-src", gulp.parallel(function()
{
	let result = gulp.src("src/**/*.js");
	if (isReleaseMode)
		result = result.pipe(stripDebug());
	return result.
		pipe(gulp.dest("build/es5/modules"));
}));

gulp.task("bundle-jsdoc", gulp.parallel(function(cb)
{
	return gulp.src(["README.md", "src/**/*.js"], {read: false}).
		pipe(jsdoc(
			{
				opts:
					{
						destination: "./build/jsdoc"
					}
			}, cb));
}));

gulp.task("bundle-resources", gulp.parallel(function()
{
	return gulp.src(
		[
			".npmignore",
			"changelog.md",
			"license.md",
			"package.json",
			"readme.md"
		]).
		pipe(gulp.dest("build"));
}));

gulp.task("server", gulp.parallel(function()
{
	connect.server(
		{
			livereload: true
		}
	);
}));

gulp.task("bundle", gulp.parallel("bundle-src-for-browser", "bundle-src-for-node", "bundle-src", "bundle-jsdoc",
	"bundle-resources"));
gulp.task("build", gulp.parallel("lint", "bundle", "test"));
gulp.task("default", gulp.parallel("build"));