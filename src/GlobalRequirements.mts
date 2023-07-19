import type {TerminalEncoding} from "./internal/internal.mjs";
import {MainGlobalConfiguration} from "./internal/internal.mjs";

const delegate = MainGlobalConfiguration.INSTANCE;

/**
 * The configuration shared by all verifiers.
 */
class GlobalRequirements
{
	/**
	 * Indicates whether <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 *
	 * @returns true if <code>assertThat()</code> should delegate to <code>requireThat()</code>; false
	 *   if it shouldn't do anything
	 */
	static assertionsAreEnabled()
	{
		return delegate.assertionsAreEnabled();
	}

	/**
	 * Indicates that <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 */
	static withAssertionsEnabled()
	{
		delegate.withAssertionsEnabled();
	}

	/**
	 * Indicates that <code>assertThat()</code> shouldn't do anything.
	 */
	static withAssertionsDisabled()
	{
		delegate.withAssertionsDisabled();
	}

	/**
	 * Indicates if exceptions should show the difference between the actual and expected values.
	 *
	 * @returns <code>true</code> by default
	 * @see #withDiff()
	 * @see #withoutDiff()
	 */
	static isDiffEnabled()
	{
		return delegate.isDiffEnabled();
	}

	/**
	 * Indicates that exceptions should show the difference between the actual and expected values.
	 *
	 * @see #isDiffEnabled()
	 */
	static withDiff()
	{
		delegate.withDiff();
	}

	/**
	 * Indicates that exceptions should not show the difference between the actual and expected values.
	 *
	 * @see #isDiffEnabled()
	 */
	static withoutDiff()
	{
		delegate.withoutDiff();
	}

	/**
	 * Returns the color encodings supported by the terminal.
	 *
	 * @returns the encodings supported by the terminal (defaults to the auto-detected
	 *   encoding)
	 * @see #withTerminalEncoding(TerminalEncoding)
	 * @see #withDefaultTerminalEncoding()
	 */
	static listTerminalEncodings()
	{
		return delegate.listTerminalEncodings();
	}

	/**
	 * Returns the current terminal encoding.
	 *
	 * @returns the current terminal encoding (defaults to the auto-detected encoding)
	 */
	static getTerminalEncoding()
	{
		return delegate.getTerminalEncoding();
	}

	/**
	 * Indicates that the terminal encoding should be auto-detected.
	 *
	 * @see #.withTerminalEncoding
	 */
	static withDefaultTerminalEncoding()
	{
		delegate.withDefaultTerminalWidth();
	}

	/**
	 * Indicates the type of encoding that the terminal supports.
	 * <p>
	 * This feature can be used to force the use of colors even when their support is not detected.
	 *
	 * @param encoding - the type of encoding that the terminal supports
	 * @throws TypeError if <code>encoding</code> is null
	 * @see #.withDefaultTerminalEncoding
	 */
	static withTerminalEncoding(encoding: TerminalEncoding)
	{
		delegate.withTerminalEncoding(encoding);
	}

	/**
	 * Returns the current terminal width.
	 *
	 * @returns the terminal width in characters (defaults to the auto-detected width)
	 */
	static getTerminalWidth()
	{
		return delegate.getTerminalWidth();
	}

	/**
	 * Indicates that the terminal width should be auto-detected.
	 *
	 * @see #.withTerminalWidth
	 */
	static withDefaultTerminalWidth()
	{
		delegate.withDefaultTerminalWidth();
	}

	/**
	 * Indicates the width that the terminal should use.
	 * <p>
	 * This feature can be used to override the default terminal width when it cannot be auto-detected.
	 *
	 * @param width - the terminal width in characters
	 * @throws TypeError if <code>width</code> is null
	 * @throws RangeError if <code>width</code> is zero or negative
	 * @see #.withDefaultTerminalWidth
	 */
	withTerminalWidth(width: number)
	{
		delegate.withTerminalWidth(width);
	}
}

export {GlobalRequirements};