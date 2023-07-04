import
{
	ArrayVerifier,
	ArrayVerifierImpl,
	BooleanVerifier,
	BooleanVerifierImpl,
	ClassVerifier,
	ClassVerifierImpl,
	ExtensibleObjectValidator,
	ExtensibleObjectVerifier,
	InetAddressVerifier,
	InetAddressVerifierImpl,
	MapVerifier,
	MapVerifierImpl,
	NumberVerifier,
	NumberVerifierImpl,
	Objects,
	SetVerifier,
	SetVerifierImpl,
	StringVerifier,
	StringVerifierImpl
} from "../internal.mjs";

/**
 * Extensible implementation of <code>ExtensibleObjectVerifier</code>.
 */
abstract class AbstractObjectVerifier<S, V extends ExtensibleObjectValidator<V>>
	implements ExtensibleObjectVerifier<S>
{
	protected readonly validator: V;

	/**
	 * Creates a new AbstractObjectVerifier.
	 *
	 * @param {object} validator the validator to delegate to
	 * @throws {TypeError} if <code>validator</code> is null or undefined
	 */
	protected constructor(validator: V)
	{
		Objects.requireThatIsSet(validator, "validator");
		this.validator = validator;
	}

	/**
	 * @return {ExtensibleObjectVerifier} this
	 * @protected
	 */
	protected abstract getThis(): S;

	isEqualTo(expected: unknown, name?: string): S
	{
		this.validator.isEqualTo(expected, name);
		return this.validationResult();
	}

	validationResult<R>(result: () => R | S = () => this.getThis()): R | S
	{
		if (result === null)
			throw new TypeError("result may not be null");

		const failures = this.validator.getFailures();
		if (failures.length === 0)
		{
			// eslint-disable-next-line no-undefined
			return result.apply(undefined);
		}
		const failure = failures[0];
		throw failure.createException();
	}

	isNotEqualTo(value: unknown, name?: string): S
	{
		this.validator.isNotEqualTo(value, name);
		return this.validationResult();
	}

	isPrimitive(): S
	{
		this.validator.isPrimitive();
		return this.validationResult();
	}

	isTypeOf(type: string): S
	{
		this.validator.isTypeOf(type);
		return this.validationResult();
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	isInstanceOf(type: Function): S
	{
		this.validator.isInstanceOf(type);
		return this.validationResult();
	}

	isNull(): S
	{
		this.validator.isNull();
		return this.validationResult();
	}

	isNotNull(): S
	{
		this.validator.isNotNull();
		return this.validationResult();
	}

	isDefined(): S
	{
		this.validator.isDefined();
		return this.validationResult();
	}

	isNotDefined(): S
	{
		this.validator.isNotDefined();
		return this.validationResult();
	}

	isSet(): S
	{
		this.validator.isSet();
		return this.validationResult();
	}

	isNotSet(): S
	{
		this.validator.isNotSet();
		return this.validationResult();
	}

	isActualAvailable(): boolean
	{
		return true;
	}

	getActual(): unknown
	{
		return this.validator.getActual();
	}

	asString(): StringVerifier
	{
		const newValidator = this.validator.asString();
		return this.validationResult(() => new StringVerifierImpl(newValidator)) as StringVerifier;
	}

	asStringConsumer(consumer: (actual: StringVerifier) => void): S
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asString());
		return this.getThis();
	}

	asArray(): ArrayVerifier
	{
		const newValidator = this.validator.asArray();
		return this.validationResult(() => new ArrayVerifierImpl(newValidator)) as ArrayVerifier;
	}

	asArrayConsumer(consumer: (actual: ArrayVerifier) => void): S
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asArray());
		return this.getThis();
	}

	asBoolean(): BooleanVerifier
	{
		const newValidator = this.validator.asBoolean();
		return this.validationResult(() => new BooleanVerifierImpl(newValidator)) as BooleanVerifier;
	}

	asBooleanConsumer(consumer: (actual: BooleanVerifier) => void): S
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asBoolean());
		return this.getThis();
	}

	asNumber(): NumberVerifier
	{
		const newValidator = this.validator.asNumber();
		return this.validationResult(() => new NumberVerifierImpl(newValidator)) as NumberVerifier;
	}

	asNumberConsumer(consumer: (actual: NumberVerifier) => void): S
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asNumber());
		return this.getThis();
	}

	asSet(): SetVerifier
	{
		const newValidator = this.validator.asSet();
		return this.validationResult(() => new SetVerifierImpl(newValidator)) as SetVerifier;
	}

	asSetConsumer(consumer: (actual: SetVerifier) => void): S
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asSet());
		return this.getThis();
	}

	asMap(): MapVerifier
	{
		const newValidator = this.validator.asMap();
		return this.validationResult(() => new MapVerifierImpl(newValidator)) as MapVerifier;
	}

	asMapConsumer(consumer: (actual: MapVerifier) => void): S
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asMap());
		return this.getThis();
	}

	asInetAddress(): InetAddressVerifier
	{
		const newValidator = this.validator.asInetAddress();
		return this.validationResult(() => new InetAddressVerifierImpl(newValidator)) as InetAddressVerifier;
	}

	asInetAddressConsumer(consumer: (input: InetAddressVerifier) => void): S
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asInetAddress());
		return this.getThis();
	}

	asClass(): ClassVerifier
	{
		const newValidator = this.validator.asClass();
		return this.validationResult(() => new ClassVerifierImpl(newValidator)) as ClassVerifier;
	}

	asClassConsumer(consumer: (actual: ClassVerifier) => void): S
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asClass());
		return this.getThis();
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {AbstractObjectVerifier as default};