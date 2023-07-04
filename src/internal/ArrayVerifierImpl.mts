import
{
	AbstractObjectVerifier,
	ArrayValidator,
	ArrayVerifier,
	NumberVerifier,
	Objects,
	SetVerifier,
	SetVerifierImpl,
	NumberVerifierImpl
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
	 * @param {object} validator the validator to delegate to
	 * @throws {TypeError} if <code>validator</code> is null or undefined
	 */
	constructor(validator: ArrayValidator)
	{
		super(validator);
	}

	protected getThis(): ArrayVerifier
	{
		return this;
	}

	isEmpty(): ArrayVerifier
	{
		this.validator.isEmpty();
		return this.validationResult();
	}

	isNotEmpty(): ArrayVerifier
	{
		this.validator.isNotEmpty();
		return this.validationResult();
	}

	contains(element: unknown, name?: string): ArrayVerifier
	{
		this.validator.contains(element, name);
		return this.validationResult();
	}

	containsExactly(expected: unknown[], name?: string): ArrayVerifier
	{
		this.validator.containsExactly(expected, name);
		return this.validationResult();
	}

	containsAny(expected: unknown[], name?: string): ArrayVerifier
	{
		this.validator.containsAny(expected, name);
		return this.validationResult();
	}

	containsAll(expected: unknown[], name?: string): ArrayVerifier
	{
		this.validator.containsAll(expected, name);
		return this.validationResult();
	}

	doesNotContain(element: unknown, name?: string): ArrayVerifier
	{
		this.validator.doesNotContain(element, name);
		return this.validationResult();
	}

	doesNotContainAny(elements: unknown[], name?: string): ArrayVerifier
	{
		this.validator.doesNotContainAny(elements, name);
		return this.validationResult();
	}

	doesNotContainAll(elements: unknown[], name?: string): ArrayVerifier
	{
		this.validator.doesNotContainAll(elements, name);
		return this.validationResult();
	}

	doesNotContainDuplicates(): ArrayVerifier
	{
		this.validator.doesNotContainDuplicates();
		return this.validationResult();
	}

	length(): NumberVerifier
	{
		const newValidator = this.validator.length();
		return this.validationResult(() => new NumberVerifierImpl(newValidator)) as NumberVerifier;
	}

	lengthConsumer(consumer: (actual: NumberVerifier) => void): ArrayVerifier
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.length());
		return this.getThis();
	}

	asSet(): SetVerifier
	{
		const newValidator = this.validator.asSet();
		return this.validationResult(() => new SetVerifierImpl(newValidator)) as SetVerifier;
	}

	asSetConsumer(consumer: (actual: SetVerifier) => void): ArrayVerifier
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asSet());
		return this.getThis();
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