/**
 * The configuration shared by all verifiers.
 *
 * @author Gili Tzabari
 */
class GlobalConfiguration {
}

/**
 * Indicates the assertions state that new verifiers will inherit. By default, this property is false.
 * You must updated this property before the first invocation of <code>requireThat()</code> or
 * <code>assertThat()</code> in order to impact <code>assertThat()</code>'s behavior.
 *
 * @property {Boolean} assertionsAreEnabled true if new verifiers should start with assertions enabled
 * @see assertThat()
 */
GlobalConfiguration.assertionsAreEnabled = false;

export default GlobalConfiguration;