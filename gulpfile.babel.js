import gulp from "gulp";
import babel from "gulp-babel";
import rollup from "gulp-rollup";
import rollupJs from "rollup";
import rollupBabel from "rollup-plugin-babel";
import sourcemaps from "gulp-sourcemaps";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import intern from "gulp-intern";
import bower from "gulp-bower";
import bowerResolve from "rollup-plugin-bower-resolve";
import eslint from "gulp-eslint";
const rollupBabelConfiguration =
	{
		babelrc: false,
		presets: [
			[
				"latest",
				{
					"es2015": {
						"modules": false
					}
				}
			]
		],
		exclude: "node_modules/**",
		plugins: [
			"external-helpers"
		]
	};

gulp.task("lint", function()
{
	return gulp.src(
		[
			"gulpfile.babel.js",
			"src/*.js"
		]).
		pipe(eslint()).
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
					sugar: "Sugar",
				}
			})).
		pipe(sourcemaps.write()).
		pipe(gulp.dest("build/browser"));
});

gulp.task("bundle-for-amd", function()
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
				external: ["urijs"],
				moduleName: "Requirements",
				plugins: [
					nodeResolve({jsnext: true, main: true}),
					commonjs({include: "node_modules/**"})
				]
			})).
		pipe(sourcemaps.write()).
		pipe(gulp.dest("build/amd"));
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

gulp.task("test", ["bundle-for-amd", "test-as-es5"], function()
{
	return gulp.src("build/test/unit/*.js").
		pipe(gulp.dest("build/intern")).
		pipe(intern({
			config: "test/intern",
			runType: "client" // defaults to "client", use "runner" if you want to run functional tests
		}));
});

gulp.task("build", ["lint", "bundle-for-browser", "test"]);
gulp.task("default", ["build"]);