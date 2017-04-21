import ArrayVerifier from "./ArrayVerifier";
import ExceptionBuilder from "./ExceptionBuilder";
import NumberVerifier from "./NumberVerifier";
import ObjectVerifier from "./internal/ObjectVerifier";
import Pluralizer from "./Pluralizer";

/**
 * Verifies a <code>Map</code>.
 *
 * @class
 * @author Gili Tzabari
 */
class MapVerifier extends ObjectVerifier {
	/**
	 * Ensures that value does not contain any entries
	 *
	 * @return {MapVerifier} this
	 * @throws {TypeError} if the value contains any entries
	 */
	isEmpty()
	{
		if (this.actual.size === 0)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be empty.").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that value contains at least one entry.
	 *
	 * @return {MapVerifier} this
	 * @throws {TypeError} if the value does not contain any entries
	 */
	isNotEmpty()
	{
		if (this.actual.size !== 0)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not be empty").
			build();
	}

	/**
	 * @return {ArrayVerifier} a verifier for the Map's keys
	 */
	keys()
	{
		return new ArrayVerifier(this.config, Array.from(this.actual.keys()), this.name + ".keys()", Pluralizer.KEY);
	}

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayVerifier} for the Map's keys
	 * @return {MapVerifier} this
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	keysConsumer(consumer)
	{
		this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
		consumer(this.keys());
		return this;
	}

	/**
	 * @return {ArrayVerifier} a verifier for the Map's values
	 */
	values()
	{
		return new ArrayVerifier(this.config, Array.from(this.actual.values()), this.name + ".values()", Pluralizer.VALUE);
	}

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayVerifier} for the Map's values
	 * @return {MapVerifier} this
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	valuesConsumer(consumer)
	{
		this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
		consumer(this.values());
		return this;
	}

	/**
	 * @return {ArrayVerifier} a verifier for the Map's entries (an array of <code>[key, value]</code> for each element
	 *   in the Map)
	 */
	entries()
	{
		return new ArrayVerifier(this.config, Array.from(this.actual.entries()), this.name + ".entries()",
			Pluralizer.ENTRY);
	}

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayVerifier} for the Map's entries (an array of
	 *   <code>[key, value]</code> for each element in the Map)
	 * @return {MapVerifier} this
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	entriesConsumer(consumer)
	{
		this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
		consumer(this.entries());
		return this;
	}

	/**
	 * @return {NumberVerifier} a verifier for the number of entries this Map contains
	 */
	size()
	{
		return new NumberVerifier(this.config, this.actual.size, this.name + ".size");
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link NumberVerifier} for the number of entries this Map
	 *   contains
	 * @return {MapVerifier} this
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	sizeConsumer(consumer)
	{
		this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
		consumer(this.size());
		return this;
	}
}

export default MapVerifier;