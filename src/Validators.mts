import type {
	ValidatorComponent,
	GlobalConfiguration
} from "./internal/internal.mjs";

/* eslint-disable @typescript-eslint/no-unnecessary-condition */
const typedocWorkaround: null | ValidatorComponent<unknown> = null;
// noinspection PointlessBooleanExpressionJS
if (typedocWorkaround !== null)
	console.log("WORKAROUND: https://github.com/microsoft/tsdoc/issues/348");
/* eslint-enable @typescript-eslint/no-unnecessary-condition */

/**
 * A factory that creates different types of validators.
 * <p>
 * There are three kinds of validators:
 * <ul>
 *   <li>`requireThat()` for method preconditions.</li>
 *   <li>`assertThat()` for class invariants, and method postconditions.</li>
 *   <li>`checkIf()` for returning multiple validation failures.</li>
 * </ul>
 *
 * @typeParam S - the type of the validator factory
 */
interface Validators<S>
{
	/**
	 * Returns a new factory instance with an independent configuration. This method is commonly used to inherit
	 * and update contextual information from the original factory before passing it into a nested operation.
	 * For example,
	 *
	 * ```console
	 * JavascriptValidators copy = validators.copy();
	 * copy.getContext().put(json.toString(), "json");
	 * nestedOperation(copy);
	 * ```
	 *
	 * @returns a copy of this factory
	 */
	copy(): S;

	/**
	 * Returns the contextual information inherited by validators created out by this factory. The contextual
	 * information is a map of key-value pairs that can provide more details about validation failures. For
	 * example, if the message is "Password may not be empty" and the map contains the key-value pair
	 * `{"username": "john.smith"}`, the error message would be:
	 *
	 * ```console
	 * Password may not be empty
	 * username: john.smith
	 * ```
	 *
	 * @returns an unmodifiable map from each entry's name to its value
	 */
	getContext(): Map<string, unknown>;

	/**
	 * Sets the contextual information for validators created by this factory.
	 * <p>
	 * This method adds contextual information to error messages. The contextual information is stored as
	 * key-value pairs in a map. Values set by this method may be overridden by
	 * {@link ValidatorComponent.withContext}.
	 *
	 * @param value - the value of the entry
	 * @param name  - the name of an entry
	 * @returns this
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if:
	 *                    <ul>
	 *                      <li>`name` is empty</li>
	 *                      <li>`name` contains whitespace</li>
	 *                      <li>`name` is already in use by the value being validated or
	 *                      the validator context</li>
	 *                    </ul>
	 */
	withContext(value: unknown, name: string): this;

	/**
	 * Removes the contextual information of validators created by this factory.
	 *
	 * @param name - the parameter name
	 * @returns this
	 * @throws TypeError     if `name` is `undefined` or `null`
	 * @throws RangeError if `name`:
	 *                    <ul>
	 *                      <li>contains whitespace</li>
	 *                      <li>is empty</li>
	 *                    </ul>
	 */
	removeContext(name: string): this;

	/**
	 * Returns the global configuration shared by all validators.
	 * <p>
	 * <b>NOTE</b>: Updating this configuration affects existing and new validators.
	 *
	 * @returns the global configuration updater
	 */
	getGlobalConfiguration(): GlobalConfiguration;
}

export type {Validators};