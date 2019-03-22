import babel from "gulp-babel";
import commonjs from "rollup-plugin-commonjs";
import eslint from "gulp-eslint";
import gulp from "gulp";
import replace from "gulp-replace";
import istanbul from "gulp-istanbul";
import nodeResolve from "rollup-plugin-node-resolve";
import rollupBabel from "rollup-plugin-babel";
import rename from "gulp-rename";
import {rollup} from "rollup";
import sourcemaps from "gulp-sourcemaps";
import tape from "gulp-tape";
import tapeReporter from "tap-diff";
import uglify from "gulp-uglify";
import util from "gulp-util";

let mode = util.env.mode;
if (typeof (mode) === "undefined")
	mode = "DEBUG";
const isReleaseMode = mode === "RELEASE";
util.log(mode + " mode detected");

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
					jsnext: true,
					browser: true
				}
			),
			commonjs({include: "node_modules/**"}),
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
			sugar: "window"
		},
		sourcemap: isReleaseMode,
		dir: "build/es5/browser"
	});
	if (isReleaseMode)
	{
		await gulp.src("index.js").
			pipe(sourcemaps.init({loadMaps: true})).
			pipe(uglify()).
			pipe(rename("index.min.js")).
			pipe(sourcemaps.write(".")).
			pipe(gulp.dest("build/es5/browser"));
	}
}));

gulp.task("bundle-src-for-node", gulp.parallel(function()
{
	return gulp.src(
		[
			"src/**/*.js",
			"!src/index.js"
		]
	).
		pipe(babel({
			presets: [
				"@babel/preset-env"
			]
		})).
		pipe(gulp.dest("build/es5/node")).
		pipe(istanbul()).
		pipe(istanbul.hookRequire());
}));

gulp.task("bundle-test", gulp.parallel(function()
{
	return gulp.src("test/**/*.js").
		pipe(replace("from \"../src/", "from \"../node/")).
		pipe(babel(
			{
				presets: [
					"@babel/preset-env"
				]
			})).
		pipe(gulp.dest("build/es5/test"));
}));

gulp.task("test", gulp.series(gulp.parallel("bundle-src-for-node", "bundle-test"), function()
{
	return gulp.src("build/es5/test/**/*.js").
		pipe(tape({reporter: tapeReporter()})).
		pipe(istanbul.writeReports());
}));

gulp.task("bundle-src", gulp.parallel(function()
{
	return gulp.src("src/**/*.js").
		pipe(gulp.dest("build/es5/modules"));
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

gulp.task("bundle", gulp.parallel("bundle-src-for-browser", "bundle-src-for-node", "bundle-src", "bundle-resources"));
gulp.task("build", gulp.parallel("lint", "bundle", "test"));
gulp.task("default", gulp.parallel("build"));