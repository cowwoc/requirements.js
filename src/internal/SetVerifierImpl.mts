import type {
	NumberVerifier,
	SetValidator,
	SetVerifier
} from "./internal.mjs";
import {
	AbstractObjectVerifier,
	NumberVerifierImpl,
	Objects
} from "./internal.mjs";

/**
 * Default implementation of <code>SetVerifier</code>.
 *
 * @typeParam E - the type the array elements
 */
class SetVerifierImpl<E> extends AbstractObjectVerifier<SetVerifier<E>, SetValidator<E>, Set<E>>
	implements SetVerifier<E>
{
	/**
	 * Creates a new SetVerifierImpl.
	 *
	 * @param validator - the validator to delegate to
	 * @throws TypeError if <code>validator</code> is null or undefined
	 */
	constructor(validator: SetValidator<E>)
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

	contains(expected: E, name?: string)
	{
		this.validator.contains(expected, name);
		return this.validationResult(() => this.getThis());
	}

	containsExactly(expected: E[] | Set<E>, name?: string)
	{
		this.validator.containsExactly(expected, name);
		return this.validationResult(() => this.getThis());
	}

	containsAny(expected: E[] | Set<E>, name?: string)
	{
		this.validator.containsAny(expected, name);
		return this.validationResult(() => this.getThis());
	}

	containsAll(expected: E[] | Set<E>, name?: string)
	{
		this.validator.containsAll(expected, name);
		return this.validationResult(() => this.getThis());
	}

	doesNotContain(entry: E, name?: string)
	{
		this.validator.doesNotContain(entry, name);
		return this.validationResult(() => this.getThis());
	}

	doesNotContainAny(elements: E[] | Set<E>, name?: string): SetVerifier<E>
	{
		this.validator.doesNotContainAny(elements, name);
		return this.validationResult(() => this.getThis());
	}

	doesNotContainAll(elements: E[] | Set<E>, name?: string): SetVerifier<E>
	{
		this.validator.doesNotContainAll(elements, name);
		return this.validationResult(() => this.getThis());
	}

	size(): NumberVerifier
	{
		const newValidator = this.validator.size();
		return this.validationResult(() => new NumberVerifierImpl(newValidator)) as NumberVerifier;
	}

	sizeConsumer(consumer: (actual: NumberVerifier) => void): SetVerifier<E>
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.size());
		return this;
	}
}

export {SetVerifierImpl};