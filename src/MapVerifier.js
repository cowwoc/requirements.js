import ArrayVerifier from "./ArrayVerifier.js";
import NumberVerifier from "./NumberVerifier.js";
import ObjectVerifier from "./internal/circular_dependency/ObjectVerifierBase.js";
import Objects from "./internal/Objects.js";

/**
 * Verifies the requirements of a <code>Map</code>.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class MapVerifier extends ObjectVerifier
{
	/**
	 * Ensures that value does not contain any entries
	 *
	 * @return {MapVerifier} the updated verifier
	 * @throws {TypeError} if the value contains any entries
	 */
	isEmpty()
	{
		this.validator.isEmpty();
		return this.validationResult();
	}

	/**
	 * Ensures that value contains at least one entry.
	 *
	 * @return {MapVerifier} the updated verifier
	 * @throws {TypeError} if the value does not contain any entries
	 */
	isNotEmpty()
	{
		this.validator.isNotEmpty();
		return this.validationResult();
	}

	/**
	 * @return {ArrayVerifier} a verifier for the Map's keys
	 */
	keys()
	{
		const newValidator = this.validator.keys();
		return this.validationResult(() => new ArrayVerifier(newValidator));
	}

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayVerifier} for the Map's keys
	 * @return {MapVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	keysConsumer(consumer)
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.keys());
		return this;
	}

	/**
	 * @return {ArrayVerifier} a verifier for the Map's values
	 */
	values()
	{
		const newValidator = this.validator.values();
		return this.validationResult(() => new ArrayVerifier(newValidator));
	}

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayVerifier} for the Map's values
	 * @return {MapVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	valuesConsumer(consumer)
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.values());
		return this;
	}

	/**
	 * @return {ArrayVerifier} a verifier for the Map's entries (an array of <code>[key, value]</code> for each
	 *   element in the Map)
	 */
	entries()
	{
		const newValidator = this.validator.entries();
		return this.validationResult(() => new ArrayVerifier(newValidator));
	}

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayVerifier} for the Map's entries (an
	 *   array of <code>[key, value]</code> for each element in the Map)
	 * @return {MapVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	entriesConsumer(consumer)
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.entries());
		return this;
	}

	/**
	 * @return {NumberVerifier} a verifier for the number of entries this Map contains
	 */
	size()
	{
		const newValidator = this.validator.size();
		return this.validationResult(() => new NumberVerifier(newValidator));
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link NumberVerifier} for the number of entries
	 *   this Map contains
	 * @return {MapVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	sizeConsumer(consumer)
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.size());
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {MapVerifier as default};