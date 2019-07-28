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
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {AbstractGlobalConfiguration as default};