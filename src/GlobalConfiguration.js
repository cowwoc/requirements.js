/**
 * The configuration shared by all verifiers.
 */
class GlobalConfiguration
{
}

/**
 * Indicates the assertions state that new verifiers will inherit. By default, this property is false.
 * You must updated this property before the first invocation of <code>requireThat()</code> or
 * <code>assertThat()</code> in order to impact <code>assertThat()</code>'s behavior.
 *
 * @property {boolean} assertionsAreEnabled true if new verifiers should start with assertions enabled
 * @see assertThat()
 */
GlobalConfiguration.assertionsAreEnabled = false;

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {GlobalConfiguration as default};