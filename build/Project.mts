import url from "url";
import path from "path";
import {ESLint} from "eslint";
import TypeDoc from "typedoc";
import fs from "node:fs";
import rollupCommonjs from "@rollup/plugin-commonjs";
import {nodeResolve as rollupNodeResolve} from "@rollup/plugin-node-resolve";
import rollupTypescript from "@rollup/plugin-typescript";
import {
	type Plugin,
	rollup
} from "rollup";
import {assert} from "chai";
import ts from "typescript";
import {glob} from "glob";
import {minify} from "terser";
import {spawn} from "child_process";
import {LogFactory} from "./LogFactory.mjs";
import {default as chokidar} from "chokidar";
import eslintConfig from "../.eslintrc.mjs";
import {Logger} from "winston";
import {mode} from "./mode.mjs";
import parseArgs from "minimist";


class Project
{
	private readonly mode: string;
	private readonly log: Logger;

	constructor(mode: string)
	{
		// Use POSIX paths across all platforms
		const posixPath = url.fileURLToPath(import.meta.url).split(path.sep).join(path.posix.sep);
		const __filename = path.posix.basename(posixPath);
		this.log = LogFactory.getLogger(__filename);
		this.mode = mode;
	}

	/**
	 * @param sources the files to lint
	 * @private
	 */
	private async lintTypescript(sources: string[])
	{
		console.time("lintTypescript");
		const eslint = new ESLint({
			baseConfig: eslintConfig,
			cache: true,
			"overrideConfig": {
				parserOptions: {
					debugLevel: false
				}
			}
		});
		let results;
		try
		{
			results = await eslint.lintFiles(sources);
			const formatter = await eslint.loadFormatter("stylish");
			const resultText = await formatter.format(results);
			if (resultText)
				this.log.info(resultText);
		}
		catch (error)
		{
			this.log.error(`Lint error: ${error}`);
			throw error;
		}

		for (const result of results)
		{
			if (result.errorCount > 0)
				throw new Error("lintTypescript failed");
		}
		console.timeEnd("lintTypescript");
	}

	/**
	 * @param sources - the files to compile
	 * @private
	 */
	private async bundleForNode(sources: string[])
	{
		console.time("bundleForNode");
		try
		{
			await Promise.all([this.lintTypescript(sources), this.compileTypescript(sources)]);
		}
		catch (error)
		{
			this.log.error(`bundleForNode error: ${error}`);
			throw error;
		}
		console.timeEnd("bundleForNode");
	}

	/**
	 * @param sources the files to compile
	 * @private
	 */
	private async compileTypescript(sources: string[])
	{
		console.time("compileTypescript");
		// Example of compiling using API: https://gist.github.com/jeremyben/4de4fdc40175d0f76892209e00ece98f
		const cwd = process.cwd();
		const configFile = ts.findConfigFile(cwd, ts.sys.fileExists, "tsconfig.json");
		if (!configFile)
			throw Error("tsconfig.json not found");
		const {config} = ts.readConfigFile(configFile, ts.sys.readFile);
		config.compilerOptions.outDir = "target/publish/node/";
		config.compilerOptions.declaration = true;
		config.include = undefined;
		config.files = sources;

		const {
			options,
			fileNames,
			errors
		} = ts.parseJsonConfigFileContent(config, ts.sys, cwd);
		const program = ts.createProgram({
			options,
			rootNames: fileNames,
			configFileParsingDiagnostics: errors
		});

		const {
			diagnostics,
			emitSkipped
		} = program.emit();

		const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(diagnostics, errors);
		if (allDiagnostics.length)
		{
			const formatHost: ts.FormatDiagnosticsHost = {
				getCanonicalFileName: (path) => path,
				getCurrentDirectory: ts.sys.getCurrentDirectory,
				getNewLine: () => ts.sys.newLine
			};
			const message = ts.formatDiagnostics(allDiagnostics, formatHost);
			this.log.warn(message);
		}
		if (emitSkipped)
			throw new Error("compileTypescript() failed");
		console.timeEnd("compileTypescript");
	}

	public async bundleForBrowser()
	{
		console.time("bundleForBrowser");

		// Need to cast plugins to Function due to bug in type definitions.
		// WORKAROUND: https://github.com/algolia/algoliasearch-client-javascript/issues/1431#issuecomment-1568529321
		const plugins: Plugin[] = [
			rollupCommonjs,
			(rollupTypescript as unknown as Function)({
				"module": "ES2022",
				"moduleResolution": "bundler"
			}),
			rollupNodeResolve(
				{
					mainFields: ["module"],
					preferBuiltins: true
				}),
			(rollupCommonjs as unknown as Function)({include: "node_modules/**"})
		];

		try
		{
			const bundle = await rollup(
				{
					input: "src/index.mts",
					plugins,
					onwarn(warning, warn)
					{
						// Ignore false alarm about circular dependencies involving internal.mts
						const ignoredCircular = ["src/internal/internal.mts"];
						const isCircularDependency = warning.code === "CIRCULAR_DEPENDENCY" &&
							ignoredCircular.some(predicate =>
								warning.message.replace(/\\/g, "/").includes(predicate));
						if (isCircularDependency)
							return;
						warn(warning);
					}
				});
			await bundle.write(
				{
					sourcemap: true,
					dir: "target/publish/browser"
				});
			if (this.mode === "RELEASE")
				await this.minifyBrowserSources();
		}
		catch (error)
		{
			this.log.error(`bundleForBrowser error: ${error}`);
			throw error;
		}
		console.timeEnd("bundleForBrowser");
	}

	/**
	 * Minify the source-code.
	 *
	 * @private
	 */
	private async minifyBrowserSources()
	{
		console.time("minifyBrowserSources");
		const targetDirectory = "target/publish/browser/";

		const sourceFiles = glob.sync("target/publish/browser/index.js");

		const pathToCode: { [name: string]: string } = {};
		for (const file of sourceFiles)
			pathToCode[file] = fs.readFileSync(file, "utf8");
		const {
			code,
			map
		} = await minify(pathToCode, {
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
					},
				sourceMap: {
					filename: "index.min.mjs.map"
				}
			}
		);
		assert(typeof (code) === "string");
		assert(typeof (map) === "string");

		fs.writeFileSync(targetDirectory + "index.min.mjs", code);
		fs.writeFileSync(targetDirectory + "index.min.mjs.map", map);
		console.timeEnd("minifyBrowserSources");
	}

	public async generateDocumentation()
	{
		console.time("generateDocumentation");
		const targetDirectory = "target/apidocs/";

		const app = await TypeDoc.Application.bootstrapWithPlugins({}, [
			new TypeDoc.TypeDocReader(),
			new TypeDoc.TSConfigReader()
		]);

		const project = await app.convert();
		if (!project)
			throw new Error("generateDocumentation() failed");
		app.validate(project);
		if (app.logger.hasErrors())
			throw new Error("generateDocumentation failed");
		await app.generateDocs(project, targetDirectory);
		if (app.logger.hasErrors())
			throw new Error("generateDocumentation failed");
		console.timeEnd("generateDocumentation");
	}

	/**
	 * @param sources - the resources in the project
	 * @private
	 */
	public async bundleResources(sources: string[])
	{
		console.time("bundleResources");
		const targetDirectory = "target/publish/";
		if (!fs.existsSync(targetDirectory))
			fs.mkdirSync(targetDirectory, {recursive: true});
		let promises: Promise<void>[] = [];

		try
		{
			for (const source of sources)
			{
				const target = targetDirectory + path.posix.basename(source);
				promises.concat(fs.promises.copyFile(source, target));
			}
			await Promise.all(promises);
		}
		catch (error)
		{
			this.log.error(`bundleResources error: ${error}`);
			throw error;
		}
		console.timeEnd("bundleResources");
	}

	public async test()
	{
		console.time("test");
		const binPath = path.posix.resolve("./node_modules/.bin");
		const c8Path = path.posix.resolve(binPath + "/c8");
		const mochaPath = path.posix.resolve(binPath + "/mocha");

		// https://stackoverflow.com/a/53204227/14731
		const promise = new Promise(function(resolve, reject)
		{
			// https://stackoverflow.com/a/14231570/14731
			const process = spawn(c8Path, [mochaPath, "./test/**/*.mts", "--mode=" + mode],
				{
					shell: true,
					stdio: "inherit"
				});
			process.on("error", function(err)
			{
				reject(err);
			});
			process.on("close", function(code)
			{
				if (code !== 0)
					reject(new Error(`Exit code: ${code}`));
				resolve(undefined);
			});
		});
		try
		{
			await promise;
		}
		catch (error)
		{
			this.log.error(`bundleForBrowser error: ${error}`);
			throw error;
		}
		console.timeEnd("test");
	}

	private async getTypescriptFiles()
	{
		return [...await glob.glob("src/**/*.mts")];
	}

	public async build()
	{
		console.time("build");
		const typescriptFiles = await this.getTypescriptFiles();
		await this.bundleForNode(typescriptFiles);
		// REMINDER: If the tests return "ERROR: null" it means that the test files could not be compiled, or two
		// tests had the same name.
		await Promise.all([this.bundleForBrowser(), this.generateDocumentation(),
			this.bundleResources(this.getResourceFiles()), await this.test()]);
		console.timeEnd("build");
	}

	/**
	 * @param paths the paths to watch
	 * @param callback the callback to notify after a path is updated.
	 * The callback consumes a list of changed paths and returns a promise for the operation that processes
	 * the changes.
	 * @private
	 */
	private async watchFiles(paths: string | ReadonlyArray<string>,
	                         callback: (sources: string[]) => Promise<void>): Promise<void>
	{
		const onUpdate = async (changed: string, stats: fs.Stats) =>
		{
			this.log.info(`Updating: ${changed}`);
			// Use POSIX paths across all platforms
			const posixPath = changed.split(path.posix.sep).join(path.posix.sep);
			await callback([posixPath]);
		};
		chokidar.watch(paths).on("add", onUpdate).
			on("addDir", onUpdate).
			on("change", onUpdate).
			on("error", error => this.log.info(`Watch error: ${error}`)).
			on("ready", () => this.log.info("Watch ready..."));
	}

	/**
	 * @returns the resources in the project
	 * @private
	 */
	private getResourceFiles()
	{
		return [
			"license.md",
			"package.json",
			"README.md"
		];
	}

	public async watch()
	{
		await Promise.all([this.watchFiles("src/**/*.mts", this.bundleForNode.bind(this)),
			this.watchFiles(this.getResourceFiles(), this.bundleResources.bind(this))]);
		this.log.info("Watching for changes...");

		// Wait forever
		await new Promise<void>(() =>
		{
		});
	}
}

console.time("Time elapsed");
const project = new Project(mode);
const command = parseArgs(process.argv.slice(2));
switch (command._[0])
{
	case "build":
	{
		await project.build();
		break;
	}
	case "watch":
	{
		await project.watch();
		break;
	}
}
console.timeEnd("Time elapsed");