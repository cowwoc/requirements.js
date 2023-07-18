import {Requirements} from "./internal/internal.mjs";

const delegate = new Requirements();

/**
 * Verifies the requirements of an object.
 *
 * @param actual - the actual value
 * @param name - the name of the value
 * @returns a verifier
 * @throws TypeError  if <code>name</code> is null
 * @throws RangeError if <code>name</code> is empty
 */
function requireThat(actual: unknown, name: string)
{
	return delegate.requireThat(actual, name);
}

/**
 * Verifies requirements only if assertions are enabled.
 *
 * By default, assertions are disabled.
 * See {@link GlobalConfiguration.assertionsAreEnabled | GlobalConfiguration.assertionsAreEnabled} to change
 * the default.
 *
 * @param requirements - the requirements to verify
 * @throws TypeError  if <code>name</code> is null
 * @throws RangeError if <code>name</code> is empty
 * @see {@link GlobalConfiguration.assertionsAreEnabled | GlobalConfiguration.assertionsAreEnabled}
 */
function assertThat(requirements: (requirements: Requirements) => void)
{
	delegate.assertThat(requirements);
}

/**
 * Verifies requirements only if assertions are enabled.
 *
 * By default, assertions are disabled.
 * See {@link GlobalConfiguration.assertionsAreEnabled | GlobalConfiguration.assertionsAreEnabled} to change
 * the default.
 *
 * @param requirements - the requirements to verify
 * @returns the value returned by <code>requirements</code>
 * @throws TypeError  if <code>name</code> is null
 * @throws RangeError if <code>name</code> is empty
 * @see {@link GlobalConfiguration.assertionsAreEnabled | GlobalConfiguration.assertionsAreEnabled}
 */
function assertThatAndReturn(requirements: (requirements: Requirements) => void)
{
	return delegate.assertThatAndReturn(requirements);
}

/**
 * Validates the requirements of an object.
 *
 * @param actual - the actual value
 * @param name - the name of the value
 * @returns a validator
 * @throws TypeError  if <code>name</code> is null
 * @throws RangeError if <code>name</code> is empty
 * @see {@link GlobalConfiguration.assertionsAreEnabled | GlobalConfiguration.assertionsAreEnabled}
 */
function validateThat(actual: unknown, name: string)
{
	return delegate.validateThat(actual, name);
}

export
{
	requireThat,
	assertThat,
	assertThatAndReturn,
	validateThat
};