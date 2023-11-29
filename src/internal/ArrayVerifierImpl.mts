import type {
	ArrayValidator,
	ArrayVerifier,
	NumberVerifier
} from "./internal.mjs";
import {
	AbstractObjectVerifier,
	NumberVerifierImpl,
	Objects
} from "./internal.mjs";

/**
 * Default implementation of <code>ArrayVerifier</code>.
 *
 * @typeParam E - the type the array elements
 */
class ArrayVerifierImpl<E> extends AbstractObjectVerifier<ArrayVerifier<E>, ArrayValidator<E>, E[]>
	implements ArrayVerifier<E>
{
	/**
	 * Creates a new ArrayVerifierImpl.
	 *
	 * @param validator - the validator to delegate to
	 * @throws TypeError if <code>validator</code> is null or undefined
	 */
	constructor(validator: ArrayValidator<E>)
	{
		super(validator);
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

	contains(element: E, name?: string)
	{
		this.validator.contains(element, name);
		return this.validationResult(() => this.getThis());
	}

	containsExactly(expected: E[], name?: string)
	{
		this.validator.containsExactly(expected, name);
		return this.validationResult(() => this.getThis());
	}

	containsAny(expected: E[], name?: string)
	{
		this.validator.containsAny(expected, name);
		return this.validationResult(() => this.getThis());
	}

	containsAll(expected: E[], name?: string)
	{
		this.validator.containsAll(expected, name);
		return this.validationResult(() => this.getThis());
	}

	doesNotContain(element: E, name?: string)
	{
		this.validator.doesNotContain(element, name);
		return this.validationResult(() => this.getThis());
	}

	doesNotContainAny(elements: E[], name?: string): ArrayVerifier<E>
	{
		this.validator.doesNotContainAny(elements, name);
		return this.validationResult(() => this.getThis());
	}

	doesNotContainAll(elements: E[], name?: string): ArrayVerifier<E>
	{
		this.validator.doesNotContainAll(elements, name);
		return this.validationResult(() => this.getThis());
	}

	doesNotContainDuplicates(): ArrayVerifier<E>
	{
		this.validator.doesNotContainDuplicates();
		return this.validationResult(() => this.getThis());
	}

	length(): NumberVerifier
	{
		const newValidator = this.validator.length();
		return this.validationResult(() => new NumberVerifierImpl(newValidator)) as NumberVerifier;
	}

	lengthConsumer(consumer: (actual: NumberVerifier) => void): ArrayVerifier<E>
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.length());
		return this;
	}
}

export {ArrayVerifierImpl};