const gulp = require("gulp");
const gutil = require("gulp-util");

// TODO: See https://github.com/tiagorg/gulp-es6-webpack-example for using ES6 in gulpfile.js
gulp.task("lint", function()
{
	const eslint = require("gulp-eslint");
	return gulp.src(
		[
			"gulpfile.js",
			"src/*.js"
		]).
		pipe(eslint()).
		pipe(eslint.format()).
		pipe(eslint.failOnError());
});

gulp.task("bundle-for-browser", function()
{
	const rollup = require("gulp-rollup");
	const sourcemaps = require("gulp-sourcemaps");
	const bowerResolve = require("rollup-plugin-bower-resolve");

	// used to track the cache for subsequent bundles
	var cache;

	gulp.src("src/*.js").
		pipe(sourcemaps.init()).
		pipe(rollup(
			{
				entry: "src/Requirements.js",
				// If you have a bundle you want to re-use (e.g., when using a watcher to rebuild as files
				// change), you can tell rollup use a previous bundle as its starting point.
				// This is entirely optional!
				cache: cache,
				format: "iife",
				// See https://github.com/rollup/rollup/issues/772#issuecomment-231299803
				allowRealFiles: true,
				moduleName: "Requirements",
				moduleContext: {
					"bower_components/urijs/src/URI.js": "window",
					"bower_components/sugar/dist/sugar.js": "window"
				},
				plugins: [
					bowerResolve(
						{
							//// if there's something your bundle requires that you DON'T
							//// want to include, add it to 'skip'
							//skip: ['some-big-dependency'],  // Default: []
							//
							//// Override path to main file (relative to the module directory).
							//override: {
							//	lodash: 'dist/lodash.js'
							//}
						})
				],
				external: ["urijs", "sugar"],
				globals: {
					urijs: "URI",
					sugar: "Sugar"
				}
			})).
		pipe(sourcemaps.write()).
		pipe(gulp.dest("build/browser"));

	gulp.src("src/*.js").
		pipe(sourcemaps.init()).
		pipe(rollup(
			{
				entry: "src/RequirementVerifier.js",
				// If you have a bundle you want to re-use (e.g., when using a watcher to rebuild as files
				// change), you can tell rollup use a previous bundle as its starting point.
				// This is entirely optional!
				cache: cache,
				format: "iife",
				// See https://github.com/rollup/rollup/issues/772#issuecomment-231299803
				allowRealFiles: true,
				moduleName: "RequirementVerifier",
				moduleContext: {
					"bower_components/urijs/src/URI.js": "window",
					"bower_components/sugar/dist/sugar.js": "window"
				},
				plugins: [
					bowerResolve(
						{
							//// if there's something your bundle requires that you DON'T
							//// want to include, add it to 'skip'
							//skip: ['some-big-dependency'],  // Default: []
							//
							//// Override path to main file (relative to the module directory).
							//override: {
							//	lodash: 'dist/lodash.js'
							//}
						})
				],
				external: ["urijs", "sugar"],
				globals: {
					urijs: "URI",
					sugar: "Sugar"
				}
			})).
		pipe(sourcemaps.write()).
		pipe(gulp.dest("build/browser"));
});

gulp.task("bundle-for-amd", function()
{
	const rollup = require("gulp-rollup");
	const sourcemaps = require("gulp-sourcemaps");
	const nodeResolve = require("rollup-plugin-node-resolve");
	const commonjs = require("rollup-plugin-commonjs");

	// used to track the cache for subsequent bundles
	var cache;

	gulp.src("src/*.js").
		pipe(sourcemaps.init()).
		pipe(rollup(
			{
				entry: "src/RequirementVerifier.js",
				// If you have a bundle you want to re-use (e.g., when using a watcher to rebuild as files
				// change), you can tell rollup use a previous bundle as its starting point.
				// This is entirely optional!
				//cache: RequirementVerifierCache,
				format: "amd",
				// See https://github.com/rollup/rollup/issues/772#issuecomment-231299803
				allowRealFiles: true,
				moduleName: "Requirements",
				plugins: [
					nodeResolve({jsnext: true, main: true}),
					commonjs({include: 'node_modules/**'})
				]
			})).
		pipe(sourcemaps.write()).
		pipe(gulp.dest("build/amd"));

	gulp.src("src/*.js").
		pipe(sourcemaps.init()).
		pipe(rollup(
			{
				entry: "src/Requirements.js",
				// If you have a bundle you want to re-use (e.g., when using a watcher to rebuild as files
				// change), you can tell rollup use a previous bundle as its starting point.
				// This is entirely optional!
				//cache: cache,
				format: "amd",
				// See https://github.com/rollup/rollup/issues/772#issuecomment-231299803
				allowRealFiles: true,
				moduleName: "Requirements",
				plugins: [
					nodeResolve({jsnext: true, main: true}),
					commonjs({include: 'node_modules/**'})
				]
			})).
		pipe(sourcemaps.write()).
		pipe(gulp.dest("build/amd"));
});

gulp.task("intern-as-es5", ["bundle"], function()
{
	const babel = require("gulp-babel");
	gulp.src("test/unit/*.js").
		pipe(babel(
			{
				presets: ["latest"]
			})).
		pipe(gulp.dest("build/test/unit"));
});

gulp.task("build", ["lint", "bundle-for-browser", "bundle-for-amd"]);
gulp.task("default", ["build"]);