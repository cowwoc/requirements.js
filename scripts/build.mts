import * as url from "url";
import path from "path";
import {ESLint} from "eslint";
// @ts-ignore
import eslintConfig from "../.eslintrc.mjs";
import TypeDoc from "typedoc";
import fs from "fs";
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
import {
	createLogger,
	format,
	Logger,
	transports
} from "winston";
import {mode} from "./mode.mjs";

class Build
{
	private readonly mode: string;

	constructor(mode: string)
	{
		this.mode = mode;
	}

	public async lint()
	{
		log.info("lint()");
		const eslint = new ESLint({
			baseConfig: eslintConfig,
			cache: true,
			"overrideConfig": {
				parserOptions: {
					debugLevel: false
				}
			}
		});
		try
		{
			const results = await eslint.lintFiles(["src/**/*.mts"]);
			const formatter = await eslint.loadFormatter("stylish");
			const resultText = formatter.format(results);
			console.log(resultText);

			let buildFailed = false;
			for (const result of results)
			{
				if (result.errorCount > 0)
				{
					buildFailed = true;
					break;
				}
			}
			if (buildFailed)
				process.exit(1);
		}
		catch (error)
		{
			log.error(error);
			process.exit(1);
		}
	}

	public async compileForNode()
	{
		log.info("compileForNode()");
		// Example of compiling using API: https://gist.github.com/jeremyben/4de4fdc40175d0f76892209e00ece98f
		const cwd = process.cwd();
		const configFile = ts.findConfigFile(cwd, ts.sys.fileExists, "tsconfig.json");
		if (!configFile)
			throw Error("tsconfig.json not found");
		const {config} = ts.readConfigFile(configFile, ts.sys.readFile);

		// tsconfig.json references the tests to suppress an ESLint warning, but we don't actually want to publish
		// them.
		config.include = config.include.filter((element: string) =>
		{
			return element !== "build.mts" && !element.startsWith("test/");
		});
		config.compilerOptions.outDir = "target/publish/node/";
		config.compilerOptions.declaration = true;

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
			log.warn(message);
		}
		if (emitSkipped)
			process.exit(1);
	}

	public async compileForBrowser()
	{
		log.info("compileForBrowser()");

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

	/**
	 * Minify the source-code.
	 *
	 * @private
	 */
	private async minifyBrowserSources()
	{
		log.info("minifyBrowserSources()");
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
	}

	public async generateDocumentation()
	{
		log.info("generateDocumentation()");
		const targetDirectory = "target/apidocs/";

		const app = await TypeDoc.Application.bootstrapWithPlugins({}, [
			new TypeDoc.TypeDocReader(),
			new TypeDoc.TSConfigReader()
		]);

		const project = await app.convert();
		if (!project)
			process.exit(1);
		app.validate(project);
		if (app.logger.hasErrors())
			process.exit(1);
		await app.generateDocs(project, targetDirectory);
		if (app.logger.hasErrors())
			process.exit(1);
	}

	public async copyResources()
	{
		log.info("copyResources()");
		const targetDirectory = "target/publish/";
		if (!fs.existsSync(targetDirectory))
			fs.mkdirSync(targetDirectory, {recursive: true});
		let promises: Promise<void>[] = [];

		const sources = [
			"license.md",
			"package.json",
			"README.md"
		];
		for (const source of sources)
		{
			const target = targetDirectory + source;
			promises.concat(fs.promises.copyFile(source, target));
		}
		return Promise.all(promises);
	}

	public async test()
	{
		log.info("test()");
		const binPath = path.resolve("./node_modules/.bin");
		const c8Path = path.resolve(binPath + "/c8");
		const mochaPath = path.resolve(binPath + "/mocha");

		// https://stackoverflow.com/a/53204227/14731
		return new Promise(function(resolve, reject)
		{
			// https://stackoverflow.com/a/14231570/14731
			const process = spawn(c8Path, [mochaPath, "./test/**/*.mts", "--mode=" + mode],
				{
					shell: true,
					stdio: "inherit"
				});
			process.on("error", function(err)
			{
				throw err;
			});
			process.on("close", function(code)
			{
				if (code === 0)
					resolve("success");
				else
					throw new Error(`Exit code: ${code}`);
			});
			return process;
		});
	}
}

// https://stackoverflow.com/a/63486530/14731
const Reset = "\x1b[0m";
const FgWhite = "\x1b[37m";
const BgRed = "\x1b[41m";

class LogFactory
{
	/**
	 * @param name the name of the logger
	 * @param mode the operational mode ("DEBUG" or "RELEASE")
	 */
	public static getLogger(name: string, mode: string): Logger
	{
		let messageFormat;
		if (mode === "DEBUG")
			messageFormat = format.prettyPrint();
		else
			messageFormat = format.simple();
		return createLogger({
			transports: [new transports.Console()],
			format: format.combine(
				format(info =>
				{
					// https://github.com/winstonjs/winston/issues/1345#issuecomment-393853665
					info.level = info.level.toUpperCase();
					return info;
				})(),
				format.errors({stack: true}),
				messageFormat,
				format.colorize(),
				format.timestamp({format: "YYYY-MM-DD HH:mm:ss.SSS"}),
				format.printf(({
					timestamp,
					level,
					message,
					stack
				}) =>
				{
					if (stack)
					{
						return `${timestamp} ${level} ${FgWhite + BgRed + name + Reset} - ${message}\n${stack}`;
					}
					return `${timestamp} ${level} ${FgWhite + BgRed + name + Reset} - ${message}`;
				})
			)
		});
	}
}

console.time("Time elapsed");

const __filename = path.basename(url.fileURLToPath(import.meta.url));
const log = LogFactory.getLogger(__filename, mode);
log.info(mode + " mode detected");

const build = new Build(mode);
await Promise.all([build.lint(), build.compileForNode(), build.compileForBrowser(),
	build.generateDocumentation(), build.copyResources()]);
await build.test();

// REMINDER: If the tests return "ERROR: null" it means that the test files could not be compiled, or two
// tests had the same name.
console.timeEnd("Time elapsed");