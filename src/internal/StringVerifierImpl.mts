import type {
	NumberVerifier,
	StringValidator,
	StringVerifier
} from "./internal.mjs";
import {
	AbstractObjectVerifier,
	NumberVerifierImpl,
	Objects
} from "./internal.mjs";

/**
 * Default implementation of <code>StringVerifier</code>.
 */
class StringVerifierImpl extends AbstractObjectVerifier<StringVerifier, StringValidator, string>
	implements StringVerifier
{
	/**
	 * Creates a new StringVerifierImpl.
	 *
	 * @param validator - the validator to delegate to
	 * @throws TypeError if <code>validator</code> is null or undefined
	 */
	constructor(validator: StringValidator)
	{
		super(validator);
	}

	startsWith(prefix: string): StringVerifier
	{
		this.validator.startsWith(prefix);
		return this.validationResult(() => this.getThis());
	}

	doesNotStartWith(prefix: string): StringVerifier
	{
		this.validator.doesNotStartWith(prefix);
		return this.validationResult(() => this.getThis());
	}

	contains(expected: string): StringVerifier
	{
		this.validator.contains(expected);
		return this.validationResult(() => this.getThis());
	}

	doesNotContain(value: string): StringVerifier
	{
		this.validator.doesNotContain(value);
		return this.validationResult(() => this.getThis());
	}

	endsWith(suffix: string): StringVerifier
	{
		this.validator.endsWith(suffix);
		return this.validationResult(() => this.getThis());
	}

	doesNotEndWith(suffix: string): StringVerifier
	{
		this.validator.doesNotEndWith(suffix);
		return this.validationResult(() => this.getThis());
	}

	isEmpty(): StringVerifier
	{
		this.validator.isEmpty();
		return this.validationResult(() => this.getThis());
	}

	isNotEmpty(): StringVerifier
	{
		this.validator.isNotEmpty();
		return this.validationResult(() => this.getThis());
	}

	isTrimmed(): StringVerifier
	{
		this.validator.isTrimmed();
		return this.validationResult(() => this.getThis());
	}

	length(): NumberVerifier
	{
		const newValidator = this.validator.length();
		return this.validationResult(() => new NumberVerifierImpl(newValidator)) as NumberVerifier;
	}

	lengthConsumer(consumer: (actual: NumberVerifier) => void): StringVerifier
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.length());
		return this;
	}
}

export {StringVerifierImpl};