import type {TerminalEncoding} from "./internal/internal.mjs";

/**
 * The global configuration inherited by all verifiers.
 * <p>
 * <b>Note</b>: Verifiers inherit from the global configuration at instantiation time. Their
 * {@link Configuration | configuration} is not affected by subsequent changes to the global configuration.
 * <p>
 * However, updating settings not found in {@link Configuration} (such as
 * {@link GlobalConfiguration.withTerminalEncoding | withTerminalEncoding(TerminalEncoding)}) will impact the
 * behavior of existing verifiers.
 *
 * By default, {@link GlobalConfiguration.assertionsAreEnabled | assertionsAreEnabled} is <code>false</code>
 * and {@link GlobalConfiguration.isDiffEnabled | isDiffEnabled} is <code>true</code>.
 */
interface GlobalConfiguration
{
	/**
	 * Indicates whether <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 *
	 * @returns true if <code>assertThat()</code> should delegate to <code>requireThat()</code>; false
	 *   if it shouldn't do anything
	 */
	assertionsAreEnabled(): boolean;

	/**
	 * Indicates that <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 *
	 * @returns this
	 */
	withAssertionsEnabled(): GlobalConfiguration;

	/**
	 * Indicates that <code>assertThat()</code> shouldn't do anything.
	 *
	 * @returns this
	 */
	withAssertionsDisabled(): GlobalConfiguration;

	/**
	 * Indicates if exceptions should show the difference between the actual and expected values.
	 *
	 * @returns <code>true</code> by default
	 * @see #withDiff()
	 * @see #withoutDiff()
	 */
	isDiffEnabled(): boolean;

	/**
	 * Indicates that exceptions should show the difference between the actual and expected values.
	 *
	 * @returns this
	 * @see #isDiffEnabled()
	 */
	withDiff(): GlobalConfiguration;

	/**
	 * Indicates that exceptions should not show the difference between the actual and expected values.
	 *
	 * @returns this
	 * @see #isDiffEnabled()
	 */
	withoutDiff(): GlobalConfiguration;

	/**
	 * Returns the color encodings supported by the terminal.
	 *
	 * @returns the encodings supported by the terminal (defaults to the auto-detected encoding)
	 * @see #withTerminalEncoding(TerminalEncoding)
	 * @see #withDefaultTerminalEncoding()
	 */
	listTerminalEncodings(): TerminalEncoding[];

	/**
	 * Returns the current terminal encoding.
	 *
	 * @returns the current terminal encoding (defaults to the auto-detected encoding)
	 */
	getTerminalEncoding(): TerminalEncoding;

	/**
	 * Indicates that the terminal encoding should be auto-detected.
	 *
	 * @returns this
	 * @see #.withTerminalEncoding
	 */
	withDefaultTerminalEncoding(): GlobalConfiguration;

	/**
	 * Indicates the type of encoding that the terminal supports.
	 * <p>
	 * This feature can be used to force the use of colors even when their support is not detected.
	 *
	 * @param encoding - the type of encoding that the terminal supports
	 * @returns this
	 * @throws TypeError if <code>encoding</code> is null
	 * @see #.withDefaultTerminalEncoding
	 */
	withTerminalEncoding(encoding: TerminalEncoding): GlobalConfiguration;

	/**
	 * Returns the current terminal width.
	 *
	 * @returns the terminal width in characters (defaults to the auto-detected width)
	 */
	getTerminalWidth(): number;

	/**
	 * Indicates that the terminal width should be auto-detected.
	 *
	 * @returns this
	 * @see #.withTerminalWidth
	 */
	withDefaultTerminalWidth(): GlobalConfiguration;

	/**
	 * Indicates the width that the terminal should use.
	 * <p>
	 * This feature can be used to override the default terminal width when it cannot be auto-detected.
	 *
	 * @param width - the terminal width in characters
	 * @returns this
	 * @throws TypeError if <code>width</code> is null
	 * @throws RangeError if <code>width</code> is zero or negative
	 * @see #.withDefaultTerminalWidth
	 */
	withTerminalWidth(width: number): GlobalConfiguration;
}

export {type GlobalConfiguration};