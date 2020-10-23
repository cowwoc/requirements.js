import {TerminalEncoding} from "./internal/internal";

/**
 * The global configuration inherited by all verifiers.
 * <p>
 * <b>Note</b>: Verifiers inherit from the global configuration at instantiation time. Their
 * {@link Configuration configuration} is not affected by subsequent changes to the global configuration.
 * <p>
 * However, updating settings not found in {@link Configuration} (such as
 * {@link GlobalConfiguration#withTerminalEncoding withTerminalEncoding(TerminalEncoding)}) will impact the
 * behavior of existing verifiers.
 *
 * By default, {@link GlobalConfiguration#assertionsAreEnabled assertionsAreEnabled} is <code>false</code>
 * and {@link GlobalConfiguration#isDiffEnabled isDiffEnabled} is <code>true</code>.
 */
interface GlobalConfiguration
{
	/**
	 * Indicates whether <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 *
	 * @return true if <code>assertThat()</code> should delegate to <code>requireThat()</code>; false
	 *   if it shouldn't do anything
	 */
	assertionsAreEnabled(): boolean;

	/**
	 * Indicates that <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 *
	 * @return this
	 */
	withAssertionsEnabled(): GlobalConfiguration;

	/**
	 * Indicates that <code>assertThat()</code> shouldn't do anything.
	 *
	 * @return this
	 */
	withAssertionsDisabled(): GlobalConfiguration;

	/**
	 * Indicates if exceptions should show the difference between the actual and expected values.
	 *
	 * @return <code>true</code> by default
	 * @see #withDiff()
	 * @see #withoutDiff()
	 */
	isDiffEnabled(): boolean;

	/**
	 * Indicates that exceptions should show the difference between the actual and expected values.
	 *
	 * @return this
	 * @see #isDiffEnabled()
	 */
	withDiff(): GlobalConfiguration;

	/**
	 * Indicates that exceptions should not show the difference between the actual and expected values.
	 *
	 * @return this
	 * @see #isDiffEnabled()
	 */
	withoutDiff(): GlobalConfiguration;

	/**
	 * Returns the encodings supported by the terminal.
	 *
	 * @return the encodings supported by the terminal (defaults to the auto-detected encoding)
	 * @see #withTerminalEncoding(TerminalEncoding)
	 * @see #withDefaultTerminalEncoding()
	 */
	listTerminalEncodings(): TerminalEncoding[];

	/**
	 * Returns the current terminal encoding.
	 *
	 * @return the current terminal encoding (defaults to the auto-detected encoding)
	 */
	getTerminalEncoding(): TerminalEncoding;

	/**
	 * Indicates that the terminal encoding should be auto-detected.
	 *
	 * @return this
	 * @see #.withTerminalEncoding
	 */
	withDefaultTerminalEncoding(): GlobalConfiguration;

	/**
	 * Indicates the type of encoding that the terminal supports.
	 * <p>
	 * This feature can be used to force the use of colors even when their support is not detected.
	 *
	 * @param  encoding the type of encoding that the terminal supports
	 * @return this
	 * @throws {TypeError} if <code>encoding</code> is null
	 * @see #.withDefaultTerminalEncoding
	 */
	withTerminalEncoding(encoding: TerminalEncoding): GlobalConfiguration;

	/**
	 * Returns the current terminal width.
	 *
	 * @return the terminal width in characters (defaults to the auto-detected width)
	 */
	getTerminalWidth(): number;

	/**
	 * Indicates that the terminal width should be auto-detected.
	 *
	 * @return this
	 * @see #.withTerminalWidth
	 */
	withDefaultTerminalWidth(): GlobalConfiguration;

	/**
	 * Indicates the width that the terminal should use.
	 * <p>
	 * This feature can be used to override the default terminal width when it cannot be auto-detected.
	 *
	 * @param width the terminal width in characters
	 * @return this
	 * @throws {TypeError} if <code>width</code> is null
	 * @throws {RangeError} if <code>width</code> is zero or negative
	 * @see #.withDefaultTerminalWidth
	 */
	withTerminalWidth(width: number): GlobalConfiguration;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {GlobalConfiguration as default};