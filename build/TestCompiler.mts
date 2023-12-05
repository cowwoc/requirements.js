import ts, {type CompilerHost} from "typescript";
import * as path from "path";

/**
 * Tests whether a code snippet contains compilation errors.
 */
class TestCompiler
{
	// The root directory relative to which external files will be interpreted
	private static readonly rootDir: string = path.resolve(".");
	// We have to include at least one existing file to avoid CompilerHost complaining that it couldn't find any
	// input files
	private static readonly existingFileToSuppressError = "build/Project.mts";
	private static readonly snippetFilename = "test.mts";
	private static readonly config = TestCompiler.createParsedCommandLine();
	private static readonly defaultCompilerHost = ts.createCompilerHost(TestCompiler.config.options);

	private static createParsedCommandLine()
	{
		// Example of compiling using API: https://gist.github.com/jeremyben/4de4fdc40175d0f76892209e00ece98f
		const configFile = ts.findConfigFile(TestCompiler.rootDir, ts.sys.fileExists, "tsconfig.json");
		if (!configFile)
			throw Error("tsconfig.json not found");
		const {config} = ts.readConfigFile(configFile, ts.sys.readFile);

		config.include = [TestCompiler.snippetFilename, TestCompiler.existingFileToSuppressError];
		config.exclude = [];

		return ts.parseJsonConfigFileContent(config, ts.sys, TestCompiler.rootDir);
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
				if (fileName === TestCompiler.snippetFilename)
					return snippet;
				if (fileName === TestCompiler.existingFileToSuppressError)
					return undefined;
				return TestCompiler.defaultCompilerHost.readFile(fileName);
			},
			writeFile: () =>
			{
				// Avoid writing anything to disk
			},
			getSourceFile: (fileName, languageVersion, onError, shouldCreateNewSourceFile) =>
			{
				if (fileName === TestCompiler.snippetFilename)
					return ts.createSourceFile(fileName, snippet, languageVersion);
				if (fileName === TestCompiler.existingFileToSuppressError)
					return undefined;
				return TestCompiler.defaultCompilerHost.getSourceFile(fileName, languageVersion, onError,
					shouldCreateNewSourceFile);
			},
			getCanonicalFileName: fileName =>
			{
				if (fileName === TestCompiler.snippetFilename)
					return TestCompiler.snippetFilename;
				return TestCompiler.defaultCompilerHost.getCanonicalFileName(fileName);
			},
			getDefaultLibFileName: (options) =>
				TestCompiler.defaultCompilerHost.getDefaultLibFileName(options),
			getCurrentDirectory: TestCompiler.defaultCompilerHost.getCurrentDirectory,
			useCaseSensitiveFileNames: TestCompiler.defaultCompilerHost.useCaseSensitiveFileNames,
			getNewLine: TestCompiler.defaultCompilerHost.getNewLine
		};

		const errors = TestCompiler.config.errors;
		const program = ts.createProgram({
			options: TestCompiler.config.options,
			rootNames: [TestCompiler.snippetFilename],
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

export {TestCompiler};