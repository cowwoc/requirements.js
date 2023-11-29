import type {
	ExtensibleNumberValidator,
	ExtensibleObjectValidator
} from "./internal/internal.mjs";

const typedocWorkaround: null | ExtensibleObjectValidator<void, void> = null;
// noinspection PointlessBooleanExpressionJS
if (typedocWorkaround !== null)
	console.log("WORKAROUND: https://github.com/microsoft/tsdoc/issues/348");

/**
 * Validates the requirements of a <code>number</code>.
 *
 * Verifier and Validator methods are equivalent.
 * Validators return validation failures through the
 * {@link ExtensibleObjectValidator.getFailures | getFailures()} method, while Verifiers throw them as
 * exceptions.
 *
 * All methods (except those found in {@link ObjectValidator}) assume that the actual value is not null.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NumberValidator extends ExtensibleNumberValidator<NumberValidator>
{
}

export {type NumberValidator};