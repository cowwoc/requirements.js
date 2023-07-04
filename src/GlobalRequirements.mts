/** @module GlobalRequirements */
import
{
	MainGlobalConfiguration,
	TerminalEncoding
} from "./internal/internal.mjs";

const delegate = MainGlobalConfiguration.INSTANCE;

/**
 * The configuration shared by all verifiers.
 */
class GlobalRequirements
{
	/**
	 * Returns the encodings supported by the terminal.
	 *
	 * @return {TerminalEncoding[]} the encodings supported by the terminal (defaults to the auto-detected
	 *   encoding)
	 */
	static listTerminalEncodings(): TerminalEncoding[]
	{
		return delegate.listTerminalEncodings();
	}

	/**
	 * Returns the current terminal encoding
	 *
	 * @return {TerminalEncoding} the current terminal encoding (defaults to the auto-detected encoding)
	 */
	static getTerminalEncoding(): TerminalEncoding
	{
		return delegate.getTerminalEncoding();
	}

	/**
	 * Indicates that the terminal encoding should be auto-detected.
	 *
	 * @return {GlobalRequirements} this
	 * @see #.withTerminalEncoding
	 */
	static withDefaultTerminalEncoding(): GlobalRequirements
	{
		delegate.withDefaultTerminalEncoding();
		return this;
	}

	/**
	 * Indicates the type of encoding that the terminal supports.
	 * <p>
	 * This feature can be used to force the use of colors even when their support is not detected.
	 *
	 * @param {TerminalEncoding} encoding the type of encoding that the terminal supports
	 * @return {GlobalRequirements} this
	 * @throws TypeError if <code>encoding</code> is null
	 * @see #.withDefaultTerminalEncoding
	 */
	static withTerminalEncoding(encoding: TerminalEncoding): GlobalRequirements
	{
		delegate.withTerminalEncoding(encoding);
		return this;
	}

	/**
	 * Indicates if exceptions should show the difference between the actual and expected values.
	 *
	 * @return {boolean} <code>true</code> by default
	 * @see #.withDiff
	 * @see #.withoutDiff
	 */
	static isDiffEnabled(): boolean
	{
		return delegate.isDiffEnabled();
	}

	/**
	 * Indicates that exceptions should show the difference between the actual and expected values.
	 *
	 * @return {GlobalRequirements} this
	 * @see #.isDiffEnabled
	 */
	static withDiff(): GlobalRequirements
	{
		delegate.withDiff();
		return this;
	}

	/**
	 * Indicates that exceptions should not show the difference between the actual and expected values.
	 *
	 * @return {GlobalRequirements} this
	 * @see #.isDiffEnabled
	 */
	static withoutDiff(): GlobalRequirements
	{
		delegate.withoutDiff();
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {GlobalRequirements as default};