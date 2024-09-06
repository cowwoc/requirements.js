import {
	Configuration,
	DiffGenerator,
	DiffResult,
	Type,
	type ApplicationScope,
	EOL_PATTERN,
	assertThatStringIsNotEmpty,
	assert,
	type MessageSection,
	ContextSection,
	StringSection,
	assertThatType,
	isApplicationScope,
	assertThatInstanceOf,
	ValidationTarget,
	AssertionError,
	MessageBuilder
} from "../../internal.mjs";
import isEqual from "lodash.isequal";

/**
 * Returns the difference between two values as an error context.
 */
class ContextGenerator
{
	private readonly scope: ApplicationScope;
	private readonly configuration: Configuration;
	private readonly diffGenerator: DiffGenerator;
	/**
	 * The name of the actual value.
	 */
	private readonly _actualName;
	/**
	 * The actual value.
	 */
	private _actualValue: ValidationTarget<unknown> = ValidationTarget.invalid();
	/**
	 * The name of the expected value.
	 */
	private readonly _expectedName;
	/**
	 * The expected value.
	 */
	private _expectedValue: ValidationTarget<unknown> = ValidationTarget.invalid();
	/**
	 * `true` if error messages may include a diff that compares actual and expected values.
	 */
	private _allowDiff: boolean;
	/**
	 * `true` if the output may include an explanation of the diff format.
	 */
	private _allowLegend = false;

	/**
	 * Creates a ContextGenerator.
	 *
	 * @param scope         - the application configuration
	 * @param configuration - the validator configuration
	 * @param actualName    - the name of the actual value
	 * @param expectedName  - the name of the expected value
	 * @throws AssertionError if:
	 *                        <ul>
	 *                          <li>any of the arguments is null</li>
	 *                          <li>`actualName` or `expectedName` are blank</li>
	 *                          <li>`actualName` or `expectedName` contains a colon</li>
	 *                        </ul>
	 */
	constructor(scope: ApplicationScope, configuration: Configuration, actualName: string, expectedName: string)
	{
		assertThatInstanceOf(configuration, "configuration", Configuration);
		assertThatType(scope, "scope", Type.namedClass("ApplicationScope", () => isApplicationScope(scope)));
		assertThatStringIsNotEmpty(actualName, "actualName");
		assert(!actualName.includes(":"), undefined, `actualName may not contain a colon.
actualName: ${actualName}`);
		assertThatStringIsNotEmpty(expectedName, "expectedName");
		assert(!expectedName.includes(":"), undefined, `expectedName may not contain a colon.
expectedName: ${expectedName}`);

		this.scope = scope;
		this.configuration = configuration;
		this.diffGenerator = new DiffGenerator(scope.getGlobalConfiguration().terminalEncoding());
		this._allowDiff = configuration.allowDiff();
		this._actualName = actualName;
		this._expectedName = expectedName;
	}

	/**
	 * Sets the actual value.
	 *
	 * @param value - the object representation of the actual value
	 * @returns this
	 */
	public actualValue(value: unknown): this
	{
		this._actualValue = ValidationTarget.valid(value);
		return this;
	}

	/**
	 * Sets the expected value.
	 *
	 * @param value - the object representation of the expected value
	 * @returns this
	 */
	public expectedValue(value: unknown): this
	{
		this._expectedValue = ValidationTarget.valid(value);
		return this;
	}

	/**
	 * Overrides the value of {@link Configuration.allowDiff}.
	 *
	 * @param allowDiff - `true` if error messages may include a diff that compares actual and expected
	 * values
	 * @returns this
	 */
	public allowDiff(allowDiff: boolean): this
	{
		this._allowDiff = allowDiff;
		return this;
	}

	/**
	 * Determines if the output may include a legend of the diff format.
	 *
	 * @param allowLegend - `true` if the output may include an explanation of the diff format
	 * return this
	 */
	public allowLegend(allowLegend: boolean)
	{
		this._allowLegend = allowLegend;
		return this;
	}

	/**
	 * @returns the diff to append to the error message
	 */
	public build(): MessageSection[]
	{
		assert(this._actualValue.isValid() || this._expectedValue.isValid(), undefined,
			"actualValue and expectedValue were both invalid");

		if (this._actualValue.map(v => Array.isArray(v)).or(false) &&
			this._expectedValue.map(v => Array.isArray(v)).or(false))
		{
			return this.getContextOfList();
		}
		return this.getContextOfObjects();
	}

	/**
	 * @param actualName    - the name of the actual value
	 * @param actualValue   - the value of the actual value
	 * @param diff          - the difference between the two values (empty if absent)
	 * @param expectedName  - the name of the expected value
	 * @param expectedValue - the value of the expected value
	 * @returns the difference between the expected and actual values
	 */
	private getDiffSection(actualName: string, actualValue: string, diff: string,
	                       expectedName: string, expectedValue: string): MessageSection
	{
		const value = new Map<string, string>();
		value.set(actualName, actualValue);
		if (diff.length !== 0)
			value.set("diff", diff);
		value.set(expectedName, expectedValue);
		return new ContextSection(value);
	}

	/**
	 * Generates a List-specific error context from the actual and expected values.
	 *
	 *  @returns the difference between the expected and actual values
	 *  @throws AssertionError if the actual or expected values do not exist
	 */
	private getContextOfList(): MessageSection[]
	{
		const actualAsArray = this._actualValue.orThrow(
			() => new AssertionError("actualValue was invalid")) as unknown[];
		const expectedAsArray = this._expectedValue.orThrow(
			() => new AssertionError("actualValue was invalid")) as unknown[];
		const actualSize = actualAsArray.length;
		const expectedSize = expectedAsArray.length;
		const maxSize = Math.max(actualSize, expectedSize);

		const components: MessageSection[] = [];
		// Indicates if the previous index was equal
		let skippedEqualElements = false;
		let actualIndex = 0;
		let expectedIndex = 0;
		for (let i = 0; i < maxSize; ++i)
		{
			let elementsAreEqual = true;
			const actualLineExists = i < actualSize;

			let actualNameLine;
			let actualValueLine;
			if (actualLineExists)
			{
				actualNameLine = `${this._actualName}[${actualIndex}]`;
				actualValueLine = ValidationTarget.valid(actualAsArray[i]);
				++actualIndex;
			}
			else
			{
				actualNameLine = this._actualName;
				actualValueLine = ValidationTarget.invalid();
				elementsAreEqual = false;
			}

			const expectedLineExists = i < expectedSize;
			let expectedNameLine;
			let expectedValueLine;
			if (expectedLineExists)
			{
				expectedNameLine = `${this._expectedName}[${expectedIndex}]`;
				expectedValueLine = ValidationTarget.valid(expectedAsArray[i]);
				++expectedIndex;
			}
			else
			{
				expectedNameLine = this._expectedName;
				expectedValueLine = ValidationTarget.invalid();
				elementsAreEqual = false;
			}

			const elementGenerator = new ContextGenerator(this.scope, this.configuration,
				actualNameLine, expectedNameLine).
			allowLegend(false);
			actualValueLine.ifValid(value => elementGenerator.actualValue(value));
			expectedValueLine.ifValid(value => elementGenerator.expectedValue(value));

			elementsAreEqual &&= isEqual(actualValueLine, expectedValueLine);
			if (i !== 0 && i !== maxSize - 1 && elementsAreEqual)
			{
				// Skip identical elements, unless they are the first or last element.
				skippedEqualElements = true;
				continue;
			}
			if (skippedEqualElements)
			{
				skippedEqualElements = false;
				components.push(ContextGenerator.skipEqualLines());
			}
			if (components.length !== 0)
			{
				// Insert an empty line between each diff section
				components.push(new StringSection(""));
			}
			components.push(...elementGenerator.build());
		}
		return components;
	}

	/**
	 * Returns context entries to indicate that duplicate lines were skipped.
	 *
	 * @returns the context entries to append
	 */
	private static skipEqualLines(): MessageSection
	{
		return new StringSection(`
[...]`);
	}

	/**
	 * Generates an error context from the actual and expected values.
	 *
	 * @returns the difference between the expected and actual values
	 */
	private getContextOfObjects(): MessageSection[]
	{
		assert(this._actualValue.isValid() || this._expectedValue.isValid(), undefined,
			"actualValue and expectedValue were both invalid");

		const stringMappers = this.configuration.stringMappers();
		const actualAsString = this._actualValue.map(v => stringMappers.toString(v)).or("");
		const expectedAsString = this._expectedValue.map(v => stringMappers.toString(v)).or("");
		const lines = this.diffGenerator.diff(actualAsString, expectedAsString);
		const diffLinesExist = lines.getDiffLines().length !== 0;

		// When comparing multiline strings, this method is invoked one line at a time. If the actual or expected
		// value is invalid, it indicates that one of the values contains more lines than the other. The value
		// with fewer lines will be considered invalid on a per-line basis.
		const numberOfLines = lines.getActualLines().length;
		// Don't diff boolean values
		if (!this._allowDiff || numberOfLines == 1 ||
			this._actualValue.map(v => v instanceof Boolean).or(false) ||
			this._expectedValue.map(v => v instanceof Boolean).or(false))
		{
			return this.getContextForSingleLine(lines);
		}

		let actualLineNumber = 0;
		let expectedLineNumber = 0;
		const actualLines = lines.getActualLines();
		const expectedLines = lines.getExpectedLines();
		const equalLines = lines.getEqualLines();

		// Indicates if the previous line was equal
		let skippedEqualLines = false;
		const context: MessageSection[] = [];
		for (let i = 0; i < numberOfLines; ++i)
		{
			const valuesAreEqual = equalLines[i];
			if (i !== 0 && i !== numberOfLines - 1 && valuesAreEqual)
			{
				// Skip equal lines, unless they are the first or last line.
				skippedEqualLines = true;
				++actualLineNumber;
				++expectedLineNumber;
				continue;
			}

			const actualValueLine = ContextGenerator.getElementOrEmptyString(actualLines, i);
			let actualNameLine: string;
			if (this.diffGenerator.isEmpty(actualValueLine))
				actualNameLine = this._actualName;
			else
			{
				actualNameLine = `${this._actualName}@${actualLineNumber}`;
				if (EOL_PATTERN.test(actualValueLine))
					++actualLineNumber;
			}

			let diffLine: string;
			if (diffLinesExist && !valuesAreEqual)
				diffLine = lines.getDiffLines()[i];
			else
				diffLine = "";

			const expectedValueLine = ContextGenerator.getElementOrEmptyString(expectedLines, i);
			let expectedNameLine: string;
			if (this.diffGenerator.isEmpty(expectedValueLine))
				expectedNameLine = this._expectedName;
			else
			{
				expectedNameLine = `${this._expectedName}@${expectedLineNumber}`;
				if (EOL_PATTERN.test(expectedValueLine))
					++expectedLineNumber;
			}
			if (skippedEqualLines)
			{
				skippedEqualLines = false;
				context.push(ContextGenerator.skipEqualLines());
			}

			if (context.length !== 0)
				context.push(new StringSection(""));
			const elementGenerator = new ContextGenerator(this.scope, this.configuration,
				actualNameLine, expectedNameLine).
				actualValue(actualValueLine).
				expectedValue(expectedValueLine);
			context.push(elementGenerator.getDiffSection(actualNameLine, actualValueLine, diffLine,
				expectedNameLine, expectedValueLine));
		}
		if (diffLinesExist && this._allowLegend)
			context.push(new StringSection(MessageBuilder.DIFF_LEGEND));
		return context;
	}

	/**
	 * @param list - a list
	 * @param i    - an index
	 * @returns the element at the specified index, or `""` if the index is out of bounds
	 */
	private static getElementOrEmptyString(list: string[], i: number)
	{
		if (list.length > i)
			return list[i];
		return "";
	}

	private getContextForSingleLine(lines: DiffResult): MessageSection[]
	{
		let actualAsString: string;
		let expectedAsString: string;
		if (lines.getActualLines().length > 1 || lines.getExpectedLines().length > 1)
		{
			const stringMappers = this.configuration.stringMappers();
			actualAsString = this._actualValue.map(v => stringMappers.toString(v)).or("");
			expectedAsString = this._expectedValue.map(v => stringMappers.toString(v)).or("");
		}
		else
		{
			actualAsString = lines.getActualLines()[0];
			expectedAsString = lines.getExpectedLines()[0];
		}

		const diffLinesExist = lines.getDiffLines().length !== 0;
		const valuesAreEqual = lines.getEqualLines()[0];

		let diffLine: string;
		if (diffLinesExist && !valuesAreEqual)
			diffLine = lines.getDiffLines()[0];
		else
			diffLine = "";

		const context: MessageSection[] = [];
		context.push(this.getDiffSection(this._actualName, actualAsString, diffLine, this._expectedName,
			expectedAsString));

		if (this._actualValue !== this._expectedValue && this.stringRepresentationsAreEqual(lines))
		{
			// If the String representation of the values is equal, output getClass(), hashCode(),
			// or System.identityHashCode() to figure out why they differ.
			const optionalContext = this.compareTypes();
			if (optionalContext.length !== 0)
			{
				context.push(new StringSection(""));
				context.push(...optionalContext);
			}
		}
		return context;
	}

	/**
	 * @param lines - the result of comparing the actual and expected values
	 * @returns `true` if the string representation of the values is equal
	 */
	private stringRepresentationsAreEqual(lines: DiffResult)
	{
		return lines.getEqualLines().every((value) => value);
	}

	/**
	 * @returns the difference between the expected and actual values
	 * @throws TypeError if `actualName` or `expectedName` are `undefined` or `null`
	 */
	private compareTypes(): MessageSection[]
	{
		assert(this._actualValue.isValid() || this._expectedValue.isValid(), undefined,
			"actualValue and expectedValue were both invalid");

		const actualTypeName = Type.of(this._actualValue);
		const expectedTypeName = Type.of(this._expectedValue);
		if (!isEqual(actualTypeName, expectedTypeName))
		{
			return new ContextGenerator(this.scope, this.configuration, `${this._actualName}.type`,
				`${this._expectedName}.type`).
				actualValue(actualTypeName).
				expectedValue(expectedTypeName).
				allowDiff(false).
				build();
		}
		return [];
	}

	public toString(): string
	{
		const stringMappers = this.configuration.stringMappers();

		let result = `actualName: ${this._actualName}`;
		this._actualValue.ifValid(v => result += `, actualValue: ${stringMappers.toString(v)}`);
		result += `, expectedName: ${this._expectedName}`;
		this._expectedValue.ifValid(v => result += `, expectedValue: ${stringMappers.toString(v)}`);
		return result;
	}
}

export {ContextGenerator};