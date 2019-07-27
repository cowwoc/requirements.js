import ArrayValidator from "./ArrayValidator.js";
import ArrayValidatorNoOp from "./internal/ArrayValidatorNoOp.js";
import SizeValidator from "./SizeValidator.js";
import ObjectValidator from "./internal/circular_dependency/ObjectValidatorBase.js";
import Pluralizer from "./Pluralizer.js";
import Objects from "./internal/Objects.js";
import ValidationFailure from "./ValidationFailure.js";
import MapValidatorNoOp from "./internal/MapValidatorNoOp.js";
import SizeValidatorNoOp from "./internal/SizeValidatorNoOp.js";

/**
 * Validates the requirements of a <code>Map</code>.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class MapValidator extends ObjectValidator
{
	/**
	 * Ensures that value does not contain any entries
	 *
	 * @return {MapValidator|MapValidatorNoOp} the updated validator
	 */
	isEmpty()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new MapValidatorNoOp(this.failures);
		}
		if (this.actual.size !== 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be empty.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that value contains at least one entry.
	 *
	 * @return {MapValidator|MapValidatorNoOp} the updated validator
	 */
	isNotEmpty()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new MapValidatorNoOp(this.failures);
		}
		if (this.actual.size === 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be empty");
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * @return {ArrayValidator|ArrayValidatorNoOp} a validator for the Map's keys
	 */
	keys()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new ArrayValidatorNoOp(this.failures);
		}
		return new ArrayValidator(this.config, Array.from(this.actual.keys()), this.name + ".keys()",
			Pluralizer.KEY);
	}

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayValidator} for the Map's keys
	 * @return {MapValidator|MapValidatorNoOp} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	keysConsumer(consumer)
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.keys());
		return this;
	}

	/**
	 * @return {ArrayValidator|ArrayValidatorNoOp} a validator for the Map's values
	 */
	values()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new ArrayValidatorNoOp(this.failures);
		}
		return new ArrayValidator(this.config, Array.from(this.actual.values()), this.name + ".values()",
			Pluralizer.VALUE);
	}

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayValidator} for the Map's values
	 * @return {MapValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	valuesConsumer(consumer)
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.values());
		return this;
	}

	/**
	 * @return {ArrayValidator|ArrayValidatorNoOp} a validator for the Map's entries (an array of <code>[key,
	 *   value]</code> for each element in the Map)
	 */
	entries()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new ArrayValidatorNoOp(this.failures);
		}
		return new ArrayValidator(this.config, Array.from(this.actual.entries()), this.name + ".entries()",
			Pluralizer.ENTRY);
	}

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayValidator} for the Map's entries (an
	 *   array of <code>[key, value]</code> for each element in the Map)
	 * @return {MapValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	entriesConsumer(consumer)
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.entries());
		return this;
	}

	/**
	 * @return {SizeValidator|SizeValidatorNoOp} a validator for the number of entries this Map contains
	 */
	size()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new SizeValidatorNoOp(this.failures);
		}
		return new SizeValidator(this.config, this.actual, this.name, this.actual.size, this.name + ".size",
			Pluralizer.ENTRY);
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link NumberValidator} for the number of entries
	 *   this Map contains
	 * @return {MapValidator} the updated validator
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
export {MapValidator as default};