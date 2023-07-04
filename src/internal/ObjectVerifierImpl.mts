import
{
	ArrayVerifier,
	ArrayVerifierImpl,
	BooleanVerifier,
	BooleanVerifierImpl,
	ClassVerifier,
	ClassVerifierImpl,
	InetAddressVerifier,
	InetAddressVerifierImpl,
	MapVerifier,
	MapVerifierImpl,
	NumberVerifier,
	NumberVerifierImpl,
	Objects,
	ObjectValidator,
	ObjectVerifier,
	SetVerifier,
	SetVerifierImpl,
	StringVerifier,
	StringVerifierImpl
} from "./internal.mjs";

/**
 * Default implementation of <code>ObjectVerifier</code>.
 */
class ObjectVerifierImpl<V extends ObjectValidator> implements ObjectVerifier
{
	protected readonly validator: V;

	/**
	 * Creates a new ObjectVerifier.
	 *
	 * @param {object} validator the validator to delegate to
	 * @throws {TypeError} if <code>validator</code> is null or undefined
	 */
	constructor(validator: V)
	{
		Objects.requireThatIsSet(validator, "validator");
		this.validator = validator;
	}

	/**
	 * Ensures that the actual value is equal to a value.
	 *
	 * @param {object} expected the expected value
	 * @param {string} [name] the name of the expected value
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty. If the actual value is not equal to value.
	 */
	isEqualTo(expected: unknown, name?: string): ObjectVerifier
	{
		this.validator.isEqualTo(expected, name);
		return this.validationResult();
	}

	/**
	 * Throws an exception if the validation failed.
	 *
	 * @param {Function} [result] a no-arg function that returns the value to return on success. By default,
	 *   this function returns "this".
	 * @return {object} the updated verifier
	 * @throws {RangeError} if the validation failed
	 */
	validationResult<R>(result: () => R | this = () => this): R | this
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

	/**
	 * Ensures that the actual value is not equal to a value.
	 *
	 * @param {object} value the value to compare to
	 * @param {string} [name] the name of the expected value
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty. If the actual value is equal to <code>value</code>.
	 */
	isNotEqualTo(value: unknown, name?: string): ObjectVerifier
	{
		this.validator.isNotEqualTo(value, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is a primitive. To check if the actual value is an object, use
	 * <code>isInstanceOf(Object)</code>.
	 *
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not a <code>string</code>, <code>number</code>,
	 *   <code>bigint</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>, or
	 *   <code>symbol</code>)
	 */
	isPrimitive(): ObjectVerifier
	{
		this.validator.isPrimitive();
		return this.validationResult();
	}

	/**
	 * Ensures that <code>typeof(actual)</code> is equal to <code>type</code>.
	 *
	 * @param {string} type the expected
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a>
	 * of the actual value
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {RangeError} if the <code>typeof(actual)</code> is not equal to <code>type</code>
	 */
	isTypeOf(type: string): ObjectVerifier
	{
		this.validator.isTypeOf(type);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is an object that is an instance of the specified type.
	 *
	 * @param {Function} type the type to compare to
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {TypeError}  if <code>type</code> is undefined, null, anonymous function or an arrow function
	 * @throws {RangeError} if the actual value is not an instance of <code>type</code>
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	isInstanceOf(type: Function): ObjectVerifier
	{
		this.validator.isInstanceOf(type);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is null.
	 *
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not null
	 */
	isNull(): ObjectVerifier
	{
		this.validator.isNull();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is not null.
	 *
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is null
	 */
	isNotNull(): ObjectVerifier
	{
		this.validator.isNotNull();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is defined.
	 *
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is undefined
	 */
	isDefined(): ObjectVerifier
	{
		this.validator.isDefined();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is undefined.
	 *
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not undefined
	 */
	isNotDefined(): ObjectVerifier
	{
		this.validator.isNotDefined();
		return this.validationResult();
	}

	/**
	 * Ensures that value is not undefined or null.
	 *
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {TypeError} if the value is undefined or null
	 */
	isSet(): ObjectVerifier
	{
		this.validator.isSet();
		return this.validationResult();
	}

	/**
	 * Ensures that value is not undefined or null.
	 *
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {TypeError} if the value is not undefined or null
	 */
	isNotSet(): ObjectVerifier
	{
		this.validator.isNotSet();
		return this.validationResult();
	}

	/**
	 * Indicates if the actual value is available.
	 *
	 * @return {boolean} <code>true</code>
	 */
	isActualAvailable(): boolean
	{
		return true;
	}

	/**
	 * Returns the actual value. The return value is undefined if {@link #isActualAvailable()} is
	 * <code>false</code>.
	 *
	 * @return {object} the actual value
	 */
	getActual(): unknown
	{
		return this.validator.getActual();
	}

	/**
	 * @return {StringVerifier} a verifier for the object's string representation
	 */
	asString(): StringVerifier
	{
		const newValidator = this.validator.asString();
		return this.validationResult(() => new StringVerifierImpl(newValidator)) as StringVerifier;
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link StringVerifier} for the string
	 *   representation of the actual value
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asStringConsumer(consumer: (actual: StringVerifier) => void): ObjectVerifier
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asString());
		return this;
	}

	/**
	 * @return {ArrayVerifier} a verifier for the <code>Array</code>
	 * @throws {TypeError} if the actual value is not an <code>Array</code>
	 */
	asArray(): ArrayVerifier
	{
		const newValidator = this.validator.asArray();
		return this.validationResult(() => new ArrayVerifierImpl(newValidator)) as ArrayVerifier;
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link ArrayVerifier} for the actual value
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set. If the actual value is not an
	 * <code>Array</code>.
	 */
	asArrayConsumer(consumer: (actual: ArrayVerifier) => void): ObjectVerifier
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asArray());
		return this;
	}

	/**
	 * @return {BooleanVerifier} a verifier for the <code>boolean</code>
	 * @throws {TypeError} if the actual value is not a <code>boolean</code>
	 */
	asBoolean(): BooleanVerifier
	{
		const newValidator = this.validator.asBoolean();
		return this.validationResult(() => new BooleanVerifierImpl(newValidator)) as BooleanVerifier;
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link BooleanVerifier} for the actual value
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set. If the actual value is not a
	 * <code>boolean</code>.
	 */
	asBooleanConsumer(consumer: (actual: BooleanVerifier) => void): ObjectVerifier
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asBoolean());
		return this;
	}

	/**
	 * @return {NumberVerifier} a verifier for the <code>number</code>
	 * @throws {TypeError} if the actual value is not a <code>number</code>
	 */
	asNumber(): NumberVerifier
	{
		const newValidator = this.validator.asNumber();
		return this.validationResult(() => new NumberVerifierImpl(newValidator)) as NumberVerifier;
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link NumberVerifier} for the actual value
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set. If the actual value is not a
	 * <code>number</code>.
	 */
	asNumberConsumer(consumer: (actual: NumberVerifier) => void): ObjectVerifier
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asNumber());
		return this;
	}

	/**
	 * @return {SetVerifier} a verifier for the <code>Set</code>
	 * @throws {TypeError} if the actual value is not a <code>Set</code>
	 */
	asSet(): SetVerifier
	{
		const newValidator = this.validator.asSet();
		return this.validationResult(() => new SetVerifierImpl(newValidator)) as SetVerifier;
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link SetVerifier} for the actual value
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set. If the actual value is not a <code>Set</code>.
	 */
	asSetConsumer(consumer: (actual: SetVerifier) => void): ObjectVerifier
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asSet());
		return this;
	}

	/**
	 * @return {MapVerifier} a verifier for the <code>Map</code>
	 * @throws {TypeError} if the actual value is not a <code>Map</code>
	 */
	asMap(): MapVerifier
	{
		const newValidator = this.validator.asMap();
		return this.validationResult(() => new MapVerifierImpl(newValidator)) as MapVerifier;
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link MapVerifier} for the actual value
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set. If the actual value is not a <code>Map</code>.
	 */
	asMapConsumer(consumer: (actual: MapVerifier) => void): ObjectVerifier
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asMap());
		return this;
	}

	/**
	 * @return {InetAddressVerifier} a verifier for the value's Internet address representation
	 * @throws {RangeError} if the actual value does not contain a valid Internet address format
	 */
	asInetAddress(): InetAddressVerifier
	{
		const newValidator = this.validator.asInetAddress();
		return this.validationResult(() => new InetAddressVerifierImpl(newValidator)) as InetAddressVerifier;
	}

	/**
	 * @param {Function} consumer a function that accepts an {@link InetAddressVerifier} for the value's
	 *   Internet address representation
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 * @throws {RangeError} if the actual value does not contain a valid Internet address format
	 */
	asInetAddressConsumer(consumer: (input: InetAddressVerifier) => void): ObjectVerifier
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asInetAddress());
		return this;
	}

	/**
	 * @return {ClassVerifier} a verifier for the object's class representation
	 * @throws {TypeError} if the actual value is not a <code>Function</code>
	 */
	asClass(): ClassVerifier
	{
		const newValidator = this.validator.asClass();
		return this.validationResult(() => new ClassVerifierImpl(newValidator)) as ClassVerifier;
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link ClassVerifier} for the class representation
	 *   of the actual value
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asClassConsumer(consumer: (actual: ClassVerifier) => void): ObjectVerifier
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asClass());
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ObjectVerifierImpl as default};