import {
	AbstractObjectVerifier,
	type NumberVerifier,
	NumberVerifierImpl,
	Objects,
	type StringValidator,
	type StringVerifier
} from "./internal.mjs";

/**
 * Default implementation of <code>StringVerifier</code>.
 */
class StringVerifierImpl extends AbstractObjectVerifier<StringVerifier, StringValidator>
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

	protected getThis(): StringVerifier
	{
		return this;
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

	trim(): StringVerifier
	{
		this.validator.trim();
		return this;
	}

	trimConsumer(consumer: (actual: StringVerifier) => void): StringVerifier
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.trim());
		return this;
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

	asString(): StringVerifier
	{
		return this;
	}

	asStringConsumer(consumer: (actual: StringVerifier) => void): StringVerifier
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this);
		return this;
	}

	getActual(): string
	{
		return super.getActual() as string;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {StringVerifierImpl as default};