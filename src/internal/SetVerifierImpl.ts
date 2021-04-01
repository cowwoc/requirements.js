import {
	AbstractObjectVerifier,
	ArrayVerifier,
	ArrayVerifierImpl,
	NumberVerifier,
	NumberVerifierImpl,
	Objects,
	SetValidator,
	SetVerifier
} from "./internal";

/**
 * Default implementation of <code>SetVerifier</code>.
 */
class SetVerifierImpl extends AbstractObjectVerifier<SetVerifier, SetValidator>
	implements SetVerifier
{
	/**
	 * Creates a new SetVerifierImpl.
	 *
	 * @param {object} validator the validator to delegate to
	 * @throws {TypeError} if <code>validator</code> is null or undefined
	 */
	constructor(validator: SetValidator)
	{
		super(validator);
	}

	protected getThis(): SetVerifier
	{
		return this;
	}

	isEmpty(): SetVerifier
	{
		this.validator.isEmpty();
		return this.validationResult();
	}

	isNotEmpty(): SetVerifier
	{
		this.validator.isNotEmpty();
		return this.validationResult();
	}

	contains(expected: unknown, name?: string): SetVerifier
	{
		this.validator.contains(expected, name);
		return this.validationResult();
	}

	containsExactly(expected: unknown[] | Set<unknown>, name?: string): SetVerifier
	{
		this.validator.containsExactly(expected, name);
		return this.validationResult();
	}

	containsAny(expected: unknown[] | Set<unknown>, name?: string): SetVerifier
	{
		this.validator.containsAny(expected, name);
		return this.validationResult();
	}

	containsAll(expected: unknown[] | Set<unknown>, name?: string): SetVerifier
	{
		this.validator.containsAll(expected, name);
		return this.validationResult();
	}

	doesNotContain(entry: unknown, name?: string): SetVerifier
	{
		this.validator.doesNotContain(entry, name);
		return this.validationResult();
	}

	doesNotContainAny(elements: unknown[] | Set<unknown>, name?: string): SetVerifier
	{
		this.validator.doesNotContainAny(elements, name);
		return this.validationResult();
	}

	doesNotContainAll(elements: unknown[] | Set<unknown>, name?: string): SetVerifier
	{
		this.validator.doesNotContainAll(elements, name);
		return this.validationResult();
	}

	size(): NumberVerifier
	{
		const newValidator = this.validator.size();
		return this.validationResult(() => new NumberVerifierImpl(newValidator)) as NumberVerifier;
	}

	sizeConsumer(consumer: (actual: NumberVerifier) => void): SetVerifier
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.size());
		return this;
	}

	asArray(): ArrayVerifier
	{
		const newValidator = this.validator.asArray();
		return this.validationResult(() => new ArrayVerifierImpl(newValidator)) as ArrayVerifier;
	}

	asArrayConsumer(consumer: (actual: ArrayVerifier) => void): SetVerifier
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asArray());
		return this;
	}

	getActual(): Set<unknown>
	{
		return super.getActual() as Set<unknown>;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SetVerifierImpl as default};