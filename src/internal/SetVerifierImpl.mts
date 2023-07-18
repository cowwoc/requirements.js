import {
	AbstractObjectVerifier,
	type ArrayVerifier,
	ArrayVerifierImpl,
	type NumberVerifier,
	NumberVerifierImpl,
	Objects,
	type SetValidator,
	type SetVerifier
} from "./internal.mjs";

/**
 * Default implementation of <code>SetVerifier</code>.
 */
class SetVerifierImpl extends AbstractObjectVerifier<SetVerifier, SetValidator>
	implements SetVerifier
{
	/**
	 * Creates a new SetVerifierImpl.
	 *
	 * @param validator - the validator to delegate to
	 * @throws TypeError if <code>validator</code> is null or undefined
	 */
	constructor(validator: SetValidator)
	{
		super(validator);
	}

	protected getThis()
	{
		return this;
	}

	isEmpty()
	{
		this.validator.isEmpty();
		return this.validationResult(() => this.getThis());
	}

	isNotEmpty()
	{
		this.validator.isNotEmpty();
		return this.validationResult(() => this.getThis());
	}

	contains(expected: unknown, name?: string)
	{
		this.validator.contains(expected, name);
		return this.validationResult(() => this.getThis());
	}

	containsExactly(expected: unknown[] | Set<unknown>, name?: string)
	{
		this.validator.containsExactly(expected, name);
		return this.validationResult(() => this.getThis());
	}

	containsAny(expected: unknown[] | Set<unknown>, name?: string)
	{
		this.validator.containsAny(expected, name);
		return this.validationResult(() => this.getThis());
	}

	containsAll(expected: unknown[] | Set<unknown>, name?: string)
	{
		this.validator.containsAll(expected, name);
		return this.validationResult(() => this.getThis());
	}

	doesNotContain(entry: unknown, name?: string)
	{
		this.validator.doesNotContain(entry, name);
		return this.validationResult(() => this.getThis());
	}

	doesNotContainAny(elements: unknown[] | Set<unknown>, name?: string): SetVerifier
	{
		this.validator.doesNotContainAny(elements, name);
		return this.validationResult(() => this.getThis());
	}

	doesNotContainAll(elements: unknown[] | Set<unknown>, name?: string): SetVerifier
	{
		this.validator.doesNotContainAll(elements, name);
		return this.validationResult(() => this.getThis());
	}

	size(): NumberVerifier
	{
		const newValidator = this.validator.size();
		return this.validationResult(() => new NumberVerifierImpl(newValidator)) as NumberVerifier;
	}

	sizeConsumer(consumer: (actual: NumberVerifier) => void): SetVerifier
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
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
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
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