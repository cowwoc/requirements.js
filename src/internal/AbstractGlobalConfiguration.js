import TerminalEncoding from "../TerminalEncoding.js";

/**
 * The global configuration inherited by all verifiers.
 * <p>
 * <b>Note</b>: Verifiers inherit from the global configuration at instantiation time. Their
 * {@link Configuration configuration} is not affected by subsequent changes to the global configuration.
 * <p>
 * However, updating settings not found in {@link Configuration} (such as
 * {@link #withTerminalEncoding(TerminalEncoding)}) will impact the behavior of existing verifiers.
 *
 * By default, {@link #assertionsAreEnabled} is <code>false</code> and {@link #isDiffEnabled} is
 * <code>true</code>.
 */
class AbstractGlobalConfiguration
{
	constructor()
	{
		Object.defineProperty(this, "assertionsEnabled",
			{
				value: false
			});
		Object.defineProperty(this, "diffEnabled",
			{
				value: true
			});
	}

	/**
	 * Indicates whether <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 *
	 * @return {boolean} true if <code>assertThat()</code> should delegate to <code>requireThat()</code>; false
	 *   if it shouldn't do anything
	 */
	assertionsAreEnabled()
	{
		return this.assertionsEnabled;
	}

	/**
	 * Indicates that <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 *
	 * @return {AbstractGlobalConfiguration} this
	 */
	withAssertionsEnabled()
	{
		this.assertionsEnabled = true;
		return this;
	}

	/**
	 * Indicates that <code>assertThat()</code> shouldn't do anything.
	 *
	 * @return {AbstractGlobalConfiguration} this
	 */
	withAssertionsDisabled()
	{
		this.assertionsEnabled = false;
		return this;
	}

	/**
	 * Indicates if exceptions should show the difference between the actual and expected values.
	 *
	 * @return {boolean} <code>true</code> by default
	 * @see #withDiff()
	 * @see #withoutDiff()
	 */
	isDiffEnabled()
	{
		return this.diffEnabled;
	}

	/**
	 * Indicates that exceptions should show the difference between the actual and expected values.
	 *
	 * @return {AbstractGlobalConfiguration} this
	 * @see #isDiffEnabled()
	 */
	withDiff()
	{
		this.diffEnabled = true;
		return this;
	}

	/**
	 * Indicates that exceptions should not show the difference between the actual and expected values.
	 *
	 * @return {AbstractGlobalConfiguration} this
	 * @see #isDiffEnabled()
	 */
	withoutDiff()
	{
		this.diffEnabled = false;
		return this;
	}

	/* eslint-disable jsdoc/require-returns-check */
	/* eslint-disable no-unused-vars */
	/**
	 * Returns the encodings supported by the terminal.
	 *
	 * @return {Array<TerminalEncoding>} the encodings supported by the terminal (defaults to the auto-detected
	 *   encoding)
	 * @see #withTerminalEncoding(TerminalEncoding)
	 * @see #withDefaultTerminalEncoding()
	 */
	listTerminalEncodings()
	{
		throw new Error("Method must be overridden by subclasses");
	}

	/**
	 * Returns the current terminal encoding.
	 *
	 * @return {TerminalEncoding} the current terminal encoding (defaults to the auto-detected encoding)
	 */
	getTerminalEncoding()
	{
		throw new Error("Method must be overridden by subclasses");
	}

	/**
	 * Indicates that the terminal encoding should be auto-detected.
	 *
	 * @return {AbstractGlobalConfiguration} this
	 * @see #.withTerminalEncoding
	 */
	withDefaultTerminalEncoding()
	{
		throw new Error("Method must be overridden by subclasses");
	}

	/**
	 * Indicates the type of encoding that the terminal supports.
	 * <p>
	 * This feature can be used to force the use of colors even when their support is not detected.
	 *
	 * @param {TerminalEncoding} encoding the type of encoding that the terminal supports
	 * @return {AbstractGlobalConfiguration} this
	 * @throws TypeError if <code>encoding</code> is null
	 * @see #.withDefaultTerminalEncoding
	 */
	withTerminalEncoding(encoding)
	{
		throw new Error("Method must be overridden by subclasses");
	}

	/**
	 * Returns the current terminal width.
	 *
	 * @return {number} the terminal width in characters (defaults to the auto-detected width)
	 */
	getTerminalWidth()
	{
		throw new Error("Method must be overridden by subclasses");
	}

	/**
	 * Indicates that the terminal width should be auto-detected.
	 *
	 * @return {AbstractGlobalConfiguration} this
	 * @see #.withTerminalWidth
	 */
	withDefaultTerminalWidth()
	{
		throw new Error("Method must be overridden by subclasses");
	}

	/**
	 * Indicates the width that the terminal should use.
	 * <p>
	 * This feature can be used to override the default terminal width when it cannot be auto-detected.
	 *
	 * @param {number} width the terminal width in characters
	 * @return {AbstractGlobalConfiguration} this
	 * @throws TypeError if <code>width</code> is null
	 * @throws RangeError if <code>width</code> is zero or negative
	 * @see #.withDefaultTerminalWidth
	 */
	withTerminalWidth(width)
	{
		throw new Error("Method must be overridden by subclasses");
	}

	/* eslint-enable no-unused-vars */
	/* eslint-enable jsdoc/require-returns-check */
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {AbstractGlobalConfiguration as default};