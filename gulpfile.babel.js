import gulp from "gulp";
// See http://stackoverflow.com/a/27732401/14731
import babel from "gulp-babel";
import rollup from "gulp-rollup";
import rollupBabel from "rollup-plugin-babel";
import sourcemaps from "gulp-sourcemaps";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import intern from "gulp-intern";
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
		exclude: 'node_modules/**',
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

gulp.task("bundle-for-browser", function()
{
	return gulp.src("src/*.js").
		pipe(sourcemaps.init()).
		pipe(rollup(
			{
				entry: "src/Requirements.js",
				format: "iife",
				// See https://github.com/rollup/rollup/issues/772#issuecomment-231299803
				allowRealFiles: true,
				moduleName: "requireThat",
				moduleContext: {
					"bower_components/urijs/src/URI.js": "window",
					"bower_components/sugar/dist/sugar.js": "window"
				},
				plugins: [
					bowerResolve(),
					rollupBabel(rollupBabelConfiguration)
				],
				external: ["urijs", "sugar", "babel-polyfill"],
				globals: {
					urijs: "URI",
					sugar: "Sugar",
					"babel-polyfill": "_babelPolyfill"
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
				entry: "src/Requirements.js",
				format: "amd",
				// See https://github.com/rollup/rollup/issues/772#issuecomment-231299803
				allowRealFiles: true,
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

gulp.task("test", ["bundle-for-amd"], function() // "test-as-es5"
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