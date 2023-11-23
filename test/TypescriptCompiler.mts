import ts, {type CompilerHost} from "typescript";
import * as path from "path";

/**
 * Detects whether a code snippet contains compilation errors.
 */
class TypeScriptCompiler
{
	// The root directory relative to which external files will be interpreted
	private static readonly rootDir: string = path.resolve(".");
	private static readonly fileToExclude = "build.mts";
	private static readonly snippetFilename = "test.mts";
	private static readonly config = TypeScriptCompiler.createParsedCommandLine();
	private static readonly defaultCompilerHost = ts.createCompilerHost(TypeScriptCompiler.config.options);

	private static createParsedCommandLine()
	{
		// Example of compiling using API: https://gist.github.com/jeremyben/4de4fdc40175d0f76892209e00ece98f
		const configFile = ts.findConfigFile(TypeScriptCompiler.rootDir, ts.sys.fileExists, "tsconfig.json");
		if (!configFile)
			throw Error("tsconfig.json not found");
		const {config} = ts.readConfigFile(configFile, ts.sys.readFile);

		// We have to include at least one existing file to avoid CompilerHost throwing an exception
		config.include = [TypeScriptCompiler.snippetFilename, TypeScriptCompiler.fileToExclude];
		config.exclude.concat(["src/**", "test/**"]);

		return ts.parseJsonConfigFileContent(config, ts.sys, TypeScriptCompiler.rootDir);
	}

	/**
	 * Compiles a code snippet.
	 *
	 * @param snippet - the code to compile
	 * @return the compiler warnings and errors
	 */
	public compile(snippet: string)
	{
		const compilerHost: CompilerHost = {
			fileExists: ts.sys.fileExists,
			readFile: fileName =>
			{
				if (fileName === TypeScriptCompiler.snippetFilename)
					return snippet;
				if (fileName === TypeScriptCompiler.fileToExclude)
					return undefined;
				return TypeScriptCompiler.defaultCompilerHost.readFile(fileName);
			},
			writeFile: () =>
			{
				// Avoid writing anything to disk
			},
			getSourceFile: (fileName, languageVersion, onError, shouldCreateNewSourceFile) =>
			{
				if (fileName === TypeScriptCompiler.snippetFilename)
					return ts.createSourceFile(fileName, snippet, languageVersion);
				if (fileName === TypeScriptCompiler.fileToExclude)
					return undefined;
				return TypeScriptCompiler.defaultCompilerHost.getSourceFile(fileName, languageVersion, onError,
					shouldCreateNewSourceFile);
			},
			getCanonicalFileName: fileName =>
			{
				if (fileName === TypeScriptCompiler.snippetFilename)
					return TypeScriptCompiler.snippetFilename;
				return TypeScriptCompiler.defaultCompilerHost.getCanonicalFileName(fileName);
			},
			getDefaultLibFileName: (options) =>
				TypeScriptCompiler.defaultCompilerHost.getDefaultLibFileName(options),
			getCurrentDirectory: TypeScriptCompiler.defaultCompilerHost.getCurrentDirectory,
			useCaseSensitiveFileNames: TypeScriptCompiler.defaultCompilerHost.useCaseSensitiveFileNames,
			getNewLine: TypeScriptCompiler.defaultCompilerHost.getNewLine
		};

		const errors = TypeScriptCompiler.config.errors;
		const program = ts.createProgram({
			options: TypeScriptCompiler.config.options,
			rootNames: [TypeScriptCompiler.snippetFilename],
			configFileParsingDiagnostics: errors,
			host: compilerHost
		});

		const {diagnostics} = program.emit();

		const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(diagnostics, errors);
		if (allDiagnostics.length)
		{
			const formatHost: ts.FormatDiagnosticsHost = {
				getCanonicalFileName: (path) => path,
				getCurrentDirectory: ts.sys.getCurrentDirectory,
				getNewLine: () => ts.sys.newLine
			};
			return ts.formatDiagnostics(allDiagnostics, formatHost);
		}
		return "";
	}
}

export {TypeScriptCompiler};