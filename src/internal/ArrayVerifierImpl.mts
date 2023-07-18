import {
	AbstractObjectVerifier,
	type ArrayValidator,
	type ArrayVerifier,
	type NumberVerifier,
	NumberVerifierImpl,
	Objects,
	type SetVerifier,
	SetVerifierImpl
} from "./internal.mjs";

/**
 * Default implementation of <code>ArrayVerifier</code>.
 */
class ArrayVerifierImpl extends AbstractObjectVerifier<ArrayVerifier, ArrayValidator>
	implements ArrayVerifier
{
	/**
	 * Creates a new ArrayVerifierImpl.
	 *
	 * @param validator - the validator to delegate to
	 * @throws TypeError if <code>validator</code> is null or undefined
	 */
	constructor(validator: ArrayValidator)
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

	contains(element: unknown, name?: string)
	{
		this.validator.contains(element, name);
		return this.validationResult(() => this.getThis());
	}

	containsExactly(expected: unknown[], name?: string)
	{
		this.validator.containsExactly(expected, name);
		return this.validationResult(() => this.getThis());
	}

	containsAny(expected: unknown[], name?: string)
	{
		this.validator.containsAny(expected, name);
		return this.validationResult(() => this.getThis());
	}

	containsAll(expected: unknown[], name?: string)
	{
		this.validator.containsAll(expected, name);
		return this.validationResult(() => this.getThis());
	}

	doesNotContain(element: unknown, name?: string)
	{
		this.validator.doesNotContain(element, name);
		return this.validationResult(() => this.getThis());
	}

	doesNotContainAny(elements: unknown[], name?: string): ArrayVerifier
	{
		this.validator.doesNotContainAny(elements, name);
		return this.validationResult(() => this.getThis());
	}

	doesNotContainAll(elements: unknown[], name?: string): ArrayVerifier
	{
		this.validator.doesNotContainAll(elements, name);
		return this.validationResult(() => this.getThis());
	}

	doesNotContainDuplicates(): ArrayVerifier
	{
		this.validator.doesNotContainDuplicates();
		return this.validationResult(() => this.getThis());
	}

	length(): NumberVerifier
	{
		const newValidator = this.validator.length();
		return this.validationResult(() => new NumberVerifierImpl(newValidator)) as NumberVerifier;
	}

	lengthConsumer(consumer: (actual: NumberVerifier) => void): ArrayVerifier
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.length());
		return this;
	}

	asSet(): SetVerifier
	{
		const newValidator = this.validator.asSet();
		return this.validationResult(() => new SetVerifierImpl(newValidator)) as SetVerifier;
	}

	asSetConsumer(consumer: (actual: SetVerifier) => void): ArrayVerifier
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.asSet());
		return this;
	}

	getActual(): unknown[]
	{
		return super.getActual() as unknown[];
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ArrayVerifierImpl as default};