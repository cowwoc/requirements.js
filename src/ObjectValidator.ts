import type {ExtensibleObjectValidator} from "./internal/internal";

/**
 * Validates the requirements of an object.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ObjectValidator extends ExtensibleObjectValidator<ObjectValidator>
{
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ObjectValidator as default};