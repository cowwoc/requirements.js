import type {ExtensibleObjectAsserter} from "./internal/internal.js";

/**
 * Verifies the requirements of an object.
 *
 * Asserters throw the same exceptions as Verifiers if and only if
 * {@link GlobalConfiguration#assertionsAreEnabled assertions are enabled}.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ObjectAsserter extends ExtensibleObjectAsserter<ObjectAsserter>
{
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ObjectAsserter as default};