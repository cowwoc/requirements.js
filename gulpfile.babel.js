import babel from "gulp-babel";
import commonjs from "rollup-plugin-commonjs";
import eslint from "gulp-eslint";
import gulp from "gulp";
import istanbul from "gulp-istanbul";
import nodeResolve from "rollup-plugin-node-resolve";
import rename from "gulp-rename";
import rollup from "gulp-rollup";
import rollupJs from "rollup";
import sourcemaps from "gulp-sourcemaps";
import tape from "gulp-tape";
import tapeReporter from "tap-diff";

/* eslint-disable func-style */
gulp.task("lint", function()
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
});

gulp.task("bundle-es5", function()
{
	return gulp.src("src/**/*.js").
		pipe(sourcemaps.init()).
		pipe(rollup(
			{
				rollup: rollupJs,
				entry: "src/es5.js",
				format: "iife",
				// See https://github.com/rollup/rollup/issues/772#issuecomment-231299803
				allowRealFiles: true,
				external: ["urijs", "sugar", "babel-polyfill"],
				// See https://github.com/rollup/rollup/issues/494#issuecomment-268243574
				moduleName: "window",
				plugins: [
					nodeResolve(
						{
							jsnext: true,
							main: true
						}
					),
					commonjs({include: "node_modules/**"})
				],
				globals: {
					urijs: "URI",
					sugar: "Sugar"
				}
			})).
		pipe(sourcemaps.write()).
		pipe(rename("index.js")).
		pipe(gulp.dest("build/es5"));
});

gulp.task("bundle-es6", function()
{
	return gulp.src(
		[
			"src/**/*.js",
			"!src/es5.js"
		]
	).
		pipe(babel({
			presets: ["latest"],
			plugins: [
				["babel-plugin-transform-builtin-extend", {
					globals: ["Error", "Array"]
				}]
			]
		})).
		pipe(gulp.dest("build/node")).
		pipe(istanbul()).
		pipe(istanbul.hookRequire());
});

gulp.task("test-es5", function()
{
	return gulp.src("test/**/*.js").
		pipe(babel(
			{
				presets: ["latest"],
				plugins: [
					["babel-plugin-transform-builtin-extend", {
						globals: ["Error", "Array"]
					}]
				]
			})).
		pipe(gulp.dest("build/test"));
});

gulp.task("test", ["bundle-es5", "test-es5"], function()
{
	return gulp.src("build/test/**/*.js").
		pipe(tape({reporter: tapeReporter()})).
		pipe(istanbul.writeReports());
});

gulp.task("bundle-resources", function()
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
});

gulp.task("bundle", ["bundle-es5", "bundle-es6", "bundle-resources"]);
gulp.task("build", ["lint", "bundle", "test"]);
gulp.task("default", ["build"]);