import url from "url";
import path from "path";
import {ESLint} from "eslint";
import * as TypeDoc from "typedoc";
import fs from "node:fs";
import _rollupCommonJs from "@rollup/plugin-commonjs";
import {nodeResolve as rollupNodeResolve} from "@rollup/plugin-node-resolve";
import _rollupTypescript, {type RollupTypescriptOptions} from "@rollup/plugin-typescript";
import {
	type Plugin,
	rollup
} from "rollup";
import {assert} from "chai";
import ts from "typescript";
import {glob} from "glob";
import {minify} from "terser";
import {spawn} from "child_process";
import {default as chokidar} from "chokidar";
import eslintConfig from "../eslint.config.mjs";
import parseArgs from "minimist";
import {
	diary,
	enable as enableDiaries
} from "diary";
import debounce from "lodash.debounce";
import padStart from "lodash.padstart";

// WORKAROUND: https://github.com/rollup/plugins/issues/1662#issuecomment-2337703188
const rollupCommonJs = _rollupCommonJs as unknown as (options?: unknown) => Plugin;
const rollupTypescript = _rollupTypescript as unknown as (options?: RollupTypescriptOptions) => Plugin;

class Project
{
	private static readonly outputDirectory = "target";

	/**
	 * @param sources - the files to lint
	 */
	private async lintTypescript(sources: string[])
	{
		if (sources.length === 0)
			return;
		const startTime = performance.now();
		const eslint = new ESLint({
			baseConfig: eslintConfig,
			cache: true
		});
		let results;
		try
		{
			results = await eslint.lintFiles(sources);
			const resultsMeta: ESLint.LintResultData =
				{
					cwd: process.cwd(),
					rulesMeta: eslint.getRulesMetaForResults(results)
				};
			const formatter = await eslint.loadFormatter("stylish");
			const resultText = await formatter.format(results, resultsMeta);
			if (resultText)
				log.info(resultText);
		}
		catch (error)
		{
			log.error(`Lint error: ${JSON.stringify(error, null, 2)}`);
			throw error;
		}

		for (const result of results)
		{
			if (result.errorCount > 0)
				throw new Error("lintTypescript failed");
		}
		log.info(`lintTypescript: ${Project.timeElapsedSince(startTime)}`);
	}

	/**
	 * @param sources - the files to compile
	 */
	private async bundleForNode(sources: string[])
	{
		const startTime = performance.now();
		try
		{
			await this.lintTypescript(sources);
		}
		catch (error)
		{
			log.error(`bundleForNode error: ${JSON.stringify(error, null, 2)}`);
			throw error;
		}
		this.compileTypescript(sources);
		log.info(`bundleForNode: ${Project.timeElapsedSince(startTime)}`);
	}

	/**
	 * @param sources - the files to compile
	 */
	private compileTypescript(sources: string[])
	{
		const startTime = performance.now();
		// Example of compiling using API: https://gist.github.com/jeremyben/4de4fdc40175d0f76892209e00ece98f
		const cwd = process.cwd();
		const configFile = ts.findConfigFile(cwd, filename => ts.sys.fileExists(filename), "tsconfig.json");
		if (!configFile)
			throw Error("tsconfig.json not found");
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const {config} = ts.readConfigFile(configFile, path => ts.sys.readFile(path));
		/* eslint-disable @typescript-eslint/no-unsafe-member-access */
		config.compilerOptions.outDir = `${Project.outputDirectory}/publish/node/`;
		config.compilerOptions.declaration = true;
		config.include = undefined;
		config.files = sources;
		/* eslint-enable @typescript-eslint/no-unsafe-member-access */

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
				getCurrentDirectory: () => ts.sys.getCurrentDirectory(),
				getNewLine: () => ts.sys.newLine
			};
			const message = ts.formatDiagnostics(allDiagnostics, formatHost);
			log.warn(message);
		}
		if (emitSkipped)
			throw new Error("compileTypescript() failed");
		log.info(`compileTypescript: ${Project.timeElapsedSince(startTime)}`);
	}

	private async bundleForBrowser()
	{
		const startTime = performance.now();
		const plugins: Plugin[] = [
			rollupTypescript({
				"module": "ES2022",
				"moduleResolution": "bundler"
			}),
			rollupNodeResolve(
				{
					mainFields: ["module"],
					preferBuiltins: true
				}),
			rollupCommonJs({include: "node_modules/**"})
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
					dir: `${Project.outputDirectory}/publish/browser`
				});
			await this.minifyBrowserSources();
		}
		catch (error)
		{
			log.error(`bundleForBrowser error: ${JSON.stringify(error, null, 2)}`);
			throw error;
		}
		log.info(`bundleForBrowser: ${Project.timeElapsedSince(startTime)}`);
	}

	/**
	 * Minify the source-code.
	 */
	private async minifyBrowserSources()
	{
		const startTime = performance.now();
		const targetDirectory = `${Project.outputDirectory}/publish/browser/`;

		const sourceFiles = glob.sync(`${Project.outputDirectory}/publish/browser/index.js`);

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
						drop_console: true,
						global_defs:
							{
								"@alert": "console.log"
							}
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
		log.info(`minifyBrowserSources: ${Project.timeElapsedSince(startTime)}`);
	}

	public async generateDocumentation()
	{
		const startTime = performance.now();
		const targetDirectory = `${Project.outputDirectory}/apidocs/`;

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
		log.info(`generateDocumentation: ${Project.timeElapsedSince(startTime)}`);
	}

	/**
	 * @param sources - the files to bundle
	 */
	private async bundleResources(sources: string[])
	{
		if (sources.length === 0)
			return;
		const startTime = performance.now();
		const targetDirectory = `${Project.outputDirectory}/publish/`;
		if (!fs.existsSync(targetDirectory))
			fs.mkdirSync(targetDirectory, {recursive: true});
		let promises: Promise<void>[] = [];

		try
		{
			for (const source of sources)
			{
				const target = targetDirectory + path.posix.basename(source);
				promises = promises.concat(fs.promises.copyFile(source, target));
			}
			await Promise.all(promises);
		}
		catch (error)
		{
			log.error(`bundleResources error: ${JSON.stringify(error, null, 2)}`);
			throw error;
		}
		log.info(`bundleResources: ${Project.timeElapsedSince(startTime)}`);
	}

	private async test()
	{
		const startTime = performance.now();
		const binPath = path.posix.resolve("./node_modules/.bin");
		const c8Path = path.posix.resolve(binPath + "/c8");
		const mochaPath = path.posix.resolve(binPath + "/mocha");

		// https://stackoverflow.com/a/53204227/14731
		const promise = new Promise(function(resolve, reject)
		{
			// https://stackoverflow.com/a/14231570/14731
			const process = spawn(c8Path, [mochaPath, "--parallel", "./test/**/*.mts"],
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
			log.error(`bundleForBrowser error: ${JSON.stringify(error, null, 2)}`);
			throw error;
		}
		log.info(`test: ${Project.timeElapsedSince(startTime)}`);
	}

	private async getTypescriptFiles()
	{
		return [...await glob.glob("src/**/*.mts")];
	}

	public async build()
	{
		const startTime = performance.now();
		const typescriptFiles = await this.getTypescriptFiles();
		await this.bundleForNode(typescriptFiles);
		// REMINDER: If the tests return "ERROR: null" it means that the test files could not be compiled, or two
		// tests had the same name.
		await Promise.all([this.bundleForBrowser(), this.generateDocumentation(),
			this.bundleResources(this.getResourceFiles()), this.test()]);
		log.info(`build: ${Project.timeElapsedSince(startTime)}`);
	}

	public async clean()
	{
		const startTime = performance.now();
		const typescriptFiles = await this.getTypescriptFiles();
		for (const file of typescriptFiles)
		{
			let basePath = path.posix.basename(file);
			basePath = basePath.substring(0, basePath.lastIndexOf("."));
			if (fs.existsSync(basePath + ".mjs"))
				await fs.promises.unlink(basePath + ".mjs");
			if (fs.existsSync(basePath + ".mjs.map"))
				await fs.promises.unlink(basePath + ".mjs.map");
		}
		log.info(`clean: ${Project.timeElapsedSince(startTime)}`);
	}

	/**
	 * @param paths - the paths to watch
	 * @param callback - the callback to notify after a path is updated.
	 * The callback consumes a list of changed paths and returns a promise for the operation that processes
	 * the changes.
	 */
	private watchFiles(paths: string | string[], callback: (sources: string[]) => Promise<void>)
	{
		const changes: Set<string> = new Set<string>();

		const processUpdate = async () =>
		{
			const filesToProcess = new Set<string>(changes);
			const posixPaths = [];
			for (const changed of filesToProcess)
			{
				changes.delete(changed);
				// Use POSIX paths across all platforms
				const posixPath = changed.split(path.sep).join(path.posix.sep);
				posixPaths.push(posixPath);
			}
			log.info(`Updating: [${Array.from(filesToProcess).join(", ")}]`);
			try
			{
				await callback(posixPaths);
			}
			catch (error)
			{
				console.log(error);
				// Keep on watching the files even if an error occurs
			}
		};

		const queueUpdate = debounce(processUpdate, 500);
		const onUpdate = (changed: string) =>
		{
			changes.add(changed);
			void queueUpdate();
		};
		chokidar.watch(paths, {
			ignored: "",
			awaitWriteFinish: true
		}).on("add", onUpdate).
			on("addDir", onUpdate).
			on("change", onUpdate).
			on("error", error =>
			{
				log.info(`Watch error: ${JSON.stringify(error, null, 2)}`);
			}).
			on("ready", () =>
			{
				log.info("Watch ready...");
			});
	}

	/**
	 * @returns the resources in the project
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
		fs.rmSync(Project.outputDirectory, {
			recursive: true,
			force: true
		});
		this.watchFiles(await glob.glob("src/**/*.mts"), this.bundleForNode.bind(this));
		this.watchFiles(this.getResourceFiles(), this.bundleResources.bind(this));
		log.info("Watching for changes...");

		// Wait forever
		await new Promise<void>(() =>
		{
		});
	}

	public static timeElapsedSince(startTime: number)
	{
		const endTime = performance.now();
		const duration = endTime - startTime;
		const milliseconds = Math.floor((duration % 1000) / 100);
		const seconds = Math.floor((duration / 1000) % 60);
		const minutes = Math.floor((duration / (1000 * 60)) % 60);
		const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
		assert(hours === 0);
		assert(minutes === 0);

		return seconds.toString() + "." + padStart(milliseconds.toString(), 3, "0") + " seconds";
	}
}

enableDiaries("*");
// Use POSIX paths across all platforms
const posixPath = url.fileURLToPath(import.meta.url).split(path.sep).join(path.posix.sep);
const __filename = path.posix.basename(posixPath);
const log = diary(__filename);

const startTime = performance.now();
const project = new Project();
const command = parseArgs(process.argv.slice(2));
switch (command._[0])
{
	case "build":
	{
		await project.build();
		break;
	}
	case "clean":
	{
		await project.clean();
		break;
	}
	case "watch":
	{
		await project.watch();
		break;
	}
	default:
	{
		log.error(`Unknown command: ${command._[0]}`);
		break;
	}
}
log.info(`Time elapsed: ${Project.timeElapsedSince(startTime)}`);