import babel from "gulp-babel";
import bower from "gulp-bower";
import bowerResolve from "rollup-plugin-bower-resolve";
import commonjs from "rollup-plugin-commonjs";
import eslint from "gulp-eslint";
import gulp from "gulp";
import intern from "gulp-intern";
import nodeResolve from "rollup-plugin-node-resolve";
import rollup from "gulp-rollup";
import rollupBabel from "rollup-plugin-babel";
import rollupJs from "rollup";
import sourcemaps from "gulp-sourcemaps";

const rollupBabelConfiguration =
	{
		babelrc: false,
		presets: [
			[
				"latest",
				{
					es2015: {
						modules: false
					}
				}
			]
		],
		exclude: "node_modules/**",
		plugins: [
			"external-helpers"
		]
	};

/* eslint-disable func-style */
gulp.task("lint-for-node", function()
{
	return gulp.src(
		[
			"gulpfile.babel.js",
			"src/**.js",
			"test/**.js"
		]).
		pipe(eslint(
			{
				envs: ["es6", "node", "amd"]
			}
		)).
		pipe(eslint.format()).
		pipe(eslint.failOnError());
});

gulp.task("lint-for-browser", function()
{
	return gulp.src(
		[
			"src/**.js"
		]).
		pipe(eslint(
			{
				envs: ["es6", "browser"]
			}
		)).
		pipe(eslint.format()).
		pipe(eslint.failOnError());
});

gulp.task("bower", function()
{
	return bower();
});

gulp.task("bundle-for-browser", ["bower"], function()
{
	return gulp.src("src/*.js").
		pipe(sourcemaps.init()).
		pipe(rollup(
			{
				rollup: rollupJs,
				entry: "src/Requirements.js",
				format: "iife",
				// See https://github.com/rollup/rollup/issues/772#issuecomment-231299803
				allowRealFiles: true,
				moduleName: "requireThat",
				plugins: [
					bowerResolve(),
					rollupBabel(rollupBabelConfiguration)
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

gulp.task("bundle-for-node", function()
{
	return gulp.src("src/*.js").
		pipe(sourcemaps.init()).
		pipe(rollup(
			{
				rollup: rollupJs,
				entry: "src/Requirements.js",
				format: "amd",
				// See https://github.com/rollup/rollup/issues/772#issuecomment-231299803
				allowRealFiles: true,
				external: ["urijs", "sugar", "babel-polyfill"],
				moduleName: "Requirements",
				plugins: [
					nodeResolve(
						{
							jsnext: true,
							main: true
						}
					),
					commonjs({include: "node_modules/**"})
				]
			})).
		pipe(sourcemaps.write()).
		pipe(gulp.dest("build/node"));
});

gulp.task("test-as-es5", function()
{
	return gulp.src("test/unit/*.js").
		pipe(babel(
			{
				presets: ["latest"]
			})).
		pipe(gulp.dest("build/test/unit"));
});

gulp.task("test", ["bundle-for-node", "test-as-es5"], function()
{
	return gulp.src("build/test/unit/*.js").
		pipe(gulp.dest("build/intern")).
		pipe(intern({
			config: "test/intern",
			// defaults to "client", use "runner" if you want to run functional tests
			runType: "client"
		}));
});

gulp.task("lint", ["lint-for-node", "lint-for-browser"]);
gulp.task("bundle", ["lint", "bundle-for-node", "bundle-for-browser"]);
gulp.task("build", ["bundle", "test"]);
gulp.task("default", ["build"]);