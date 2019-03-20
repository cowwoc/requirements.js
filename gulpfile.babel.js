import babel from "gulp-babel";
import buffer from "vinyl-buffer";
import commonjs from "rollup-plugin-commonjs";
import eslint from "gulp-eslint";
import gulp from "gulp";
import istanbul from "gulp-istanbul";
import nodeResolve from "rollup-plugin-node-resolve";
import rollupBabel from "rollup-plugin-babel";
import rollupStream from "rollup-stream";
import source from "vinyl-source-stream";
import rename from "gulp-rename";
import rollupJs from "rollup";
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

gulp.task("bundle-src-for-browser", gulp.parallel(function()
{
	// See https://github.com/gulpjs/gulp/blob/master/docs/recipes/rollup-with-rollup-stream.md
	let result = rollupStream(
		{
			rollup: rollupJs,
			input: "src/index.js",
			format: "iife",
			external: ["urijs", "sugar"],
			// On the browser, module exports need to be translated into global variables (properties of "window"):
			// https://github.com/rollup/rollup/issues/494#issuecomment-268243574
			name: "window",
			// Assume that the top-level "this" is "window" since we are targeting a browser environment
			context: "window",
			globals: {
				urijs: "URI",
				sugar: "window"
			},
			// Assume that the top-level "this" is "window" since we are targeting a browser environment
			//context: "window",
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
			sourcemap: isReleaseMode
		}).
		pipe(source("index.js")).
		pipe(buffer());
	if (isReleaseMode)
	{
		result = result.
			pipe(sourcemaps.init({loadMaps: true}));
	}
	result = result.pipe(gulp.dest("build/es5/browser"));
	if (isReleaseMode)
	{
		result = result.
			pipe(uglify()).
			pipe(rename("index.min.js")).
			pipe(sourcemaps.write(".")).
			pipe(gulp.dest("build/es5/browser"));
	}
	return result;
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
		pipe(babel(
			{
				presets: [
					"@babel/preset-env"
				]
			})).
		pipe(gulp.dest("build/es5/test"));
}));

gulp.task("test", gulp.parallel("bundle-src-for-node", "bundle-test", function()
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