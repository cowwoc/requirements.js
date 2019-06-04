/** @module */

import TerminalEncoding from "./TerminalEncoding.js";
import Terminal from "./internal/Terminal.js";

/**
 * The configuration shared by all verifiers.
 */
class GlobalRequirements
{
}

/**
 * Indicates the assertions state that new verifiers will inherit. By default, this property is false.
 * You must updated this property before the first invocation of <code>requireThat()</code> or
 * <code>assertThat()</code> in order to impact <code>assertThat()</code>'s behavior.
 *
 * @property {boolean} assertionsAreEnabled=true true if new verifiers should start with assertions enabled
 * @see assertThat()
 */
GlobalRequirements.assertionsAreEnabled = false;
/**
 * Internal property that should not be accessed by users.
 */
GlobalRequirements.terminal = new Terminal();

/**
 * Returns the encodings supported by the terminal.
 *
 * @return {Array<TerminalEncoding>} the encodings supported by the terminal (defaults to the auto-detected encoding)
 */
GlobalRequirements.getTerminalEncoding = function()
{
	return GlobalRequirements.terminal.getTerminalEncoding();
};

/**
 * Returns the current terminal encoding
 *
 * @return {TerminalEncoding} the current terminal encoding (defaults to the auto-detected encoding)
 */
GlobalRequirements.getTerminalEncoding = function()
{
	return GlobalRequirements.terminal.getEncoding();
};

/**
 * Indicates that the terminal encoding should be auto-detected.
 *
 * @return {GlobalRequirements} this
 * @see #withTerminalEncoding(TerminalEncoding)
 */
GlobalRequirements.withDefaultTerminalEncoding = function()
{
	GlobalRequirements.terminal.useBestEncoding();
	return this;
};

/**
 * Indicates the type of encoding that the terminal supports.
 * <p>
 * This feature can be used to force the use of colors even when their support is not detected.
 *
 * @param {TerminalEncoding} encoding the type of encoding that the terminal supports
 * @return {GlobalRequirements} this
 * @throws NullPointerException if <code>encoding</code> is null
 * @see #withDefaultTerminalEncoding()
 */
GlobalRequirements.withTerminalEncoding = function(encoding)
{
	GlobalRequirements.terminal.setEncoding(encoding);
	return this;
};

/**
 * Indicates if exceptions should show the difference between the actual and expected values.
 *
 * @return {boolean} <code>true</code> by default
 * @see #withDiff()
 * @see #withoutDiff()
 */
GlobalRequirements.isDiffEnabled = function()
{
	return this.diffEnabled;
};

/**
 * Indicates that exceptions should show the difference between the actual and expected values.
 *
 * @return {GlobalRequirements} this
 * @see #isDiffEnabled()
 */
GlobalRequirements.withDiff = function()
{
	this.diffEnabled = true;
	return this;
};

/**
 * Indicates that exceptions should not show the difference between the actual and expected values.
 *
 * @return {GlobalRequirements} this
 * @see #isDiffEnabled()
 */
GlobalRequirements.withoutDiff = function()
{
	this.diffEnabled = false;
	return this;
};

// Initialize the default values
GlobalRequirements.withDefaultTerminalEncoding();
GlobalRequirements.diffEnabled = true;

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {GlobalRequirements as default};