import
{
	AbstractObjectVerifier,
	Objects,
	StringValidator,
	StringVerifier,
	NumberVerifier,
	NumberVerifierImpl
} from "./internal.js";

/**
 * Default implementation of <code>StringVerifier</code>.
 */
class StringVerifierImpl extends AbstractObjectVerifier<StringVerifier, StringValidator>
	implements StringVerifier
{
	/**
	 * Creates a new StringVerifierImpl.
	 *
	 * @param {object} validator the validator to delegate to
	 * @throws {TypeError} if <code>validator</code> is null or undefined
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
		return this.validationResult();
	}

	doesNotStartWith(prefix: string): StringVerifier
	{
		this.validator.doesNotStartWith(prefix);
		return this.validationResult();
	}

	contains(expected: string): StringVerifier
	{
		this.validator.contains(expected);
		return this.validationResult();
	}

	doesNotContain(value: string): StringVerifier
	{
		this.validator.doesNotContain(value);
		return this.validationResult();
	}

	endsWith(suffix: string): StringVerifier
	{
		this.validator.endsWith(suffix);
		return this.validationResult();
	}

	doesNotEndWith(suffix: string): StringVerifier
	{
		this.validator.doesNotEndWith(suffix);
		return this.validationResult();
	}

	isEmpty(): StringVerifier
	{
		this.validator.isEmpty();
		return this.validationResult();
	}

	isNotEmpty(): StringVerifier
	{
		this.validator.isNotEmpty();
		return this.validationResult();
	}

	trim(): StringVerifier
	{
		this.validator.trim();
		return this;
	}

	trimConsumer(consumer: (actual: StringVerifier) => void): StringVerifier
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.trim());
		return this;
	}

	isTrimmed(): StringVerifier
	{
		this.validator.isTrimmed();
		return this.validationResult();
	}

	length(): NumberVerifier
	{
		const newValidator = this.validator.length();
		return this.validationResult(() => new NumberVerifierImpl(newValidator)) as NumberVerifier;
	}

	lengthConsumer(consumer: (actual: NumberVerifier) => void): StringVerifier
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.length());
		return this;
	}

	asString(): StringVerifier
	{
		return this;
	}

	asStringConsumer(consumer: (actual: StringVerifier) => void): StringVerifier
	{
		Objects.requireThatIsSet(consumer, "consumer");
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