import type {
	ObjectValidator,
	ObjectVerifier,
	StringVerifier,
	ArrayVerifier,
	BooleanVerifier,
	NumberVerifier,
	SetVerifier,
	MapVerifier,
	InetAddressVerifier,
	ClassVerifier
} from "./internal.mjs";
import {
	Objects,
	StringVerifierImpl,
	ArrayVerifierImpl,
	BooleanVerifierImpl,
	NumberVerifierImpl,
	SetVerifierImpl,
	MapVerifierImpl,
	InetAddressVerifierImpl,
	ClassVerifierImpl
} from "./internal.mjs";

/**
 * Default implementation of <code>ObjectVerifier</code>.
 *
 * @typeParam T - the type the actual value
 */
class ObjectVerifierImpl<V extends ObjectValidator<T>, T> implements ObjectVerifier<T>
{
	protected readonly validator: V;

	/**
	 * Creates a new ObjectVerifier.
	 *
	 * @param validator - the validator to delegate to
	 * @throws TypeError if <code>validator</code> is null or undefined
	 */
	constructor(validator: V)
	{
		Objects.requireThatValueIsDefinedAndNotNull(validator, "validator");
		this.validator = validator;
	}

	protected getThis()
	{
		return this;
	}

	isEqualTo(expected: T, name?: string)
	{
		this.validator.isEqualTo(expected, name);
		return this.validationResult(() => this.getThis());
	}

	/**
	 * Throws an exception if the validation failed.
	 *
	 * @param result - (optional) a no-arg function that returns the value to return on success
	 * @returns the updated verifier
	 * @throws RangeError if the validation failed
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

	isNotEqualTo(value: T, name?: string): ObjectVerifier<T>
	{
		this.validator.isNotEqualTo(value, name);
		return this.validationResult(() => this.getThis());
	}

	isPrimitive(): ObjectVerifier<T>
	{
		this.validator.isPrimitive();
		return this.validationResult(() => this.getThis());
	}

	isTypeOf(type: string): ObjectVerifier<T>
	{
		this.validator.isTypeOf(type);
		return this.validationResult(() => this.getThis());
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	isInstanceOf(type: Function): ObjectVerifier<T>
	{
		this.validator.isInstanceOf(type);
		return this.validationResult(() => this.getThis());
	}

	isNull(): ObjectVerifier<null>
	{
		this.validator.isNull();
		return this.validationResult(() => this.getThis()) as unknown as ObjectVerifier<null>;
	}

	isNotNull(): ObjectVerifier<NonNullable<T>>
	{
		this.validator.isNotNull();
		return this.validationResult(() => this.getThis()) as ObjectVerifier<NonNullable<T>>;
	}

	isDefined(): ObjectVerifier<T>
	{
		this.validator.isDefined();
		return this.validationResult(() => this.getThis());
	}

	isNotDefined(): ObjectVerifier<T>
	{
		this.validator.isNotDefined();
		return this.validationResult(() => this.getThis());
	}

	isSet(): ObjectVerifier<T>
	{
		this.validator.isSet();
		return this.validationResult(() => this.getThis());
	}

	isNotSet(): ObjectVerifier<T>
	{
		this.validator.isNotSet();
		return this.validationResult(() => this.getThis());
	}

	getActual(): T
	{
		// The verifier is guaranteed to throw an exception if validation fails
		return this.validator.getActual() as T;
	}

	asString(): StringVerifier
	{
		const newValidator = this.validator.asString();
		return this.validationResult(() => new StringVerifierImpl(newValidator)) as StringVerifier;
	}

	asStringConsumer(consumer: (actual: StringVerifier) => void): ObjectVerifier<T>
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.asString());
		return this;
	}

	asArray<E>(): ArrayVerifier<E>
	{
		const newValidator = this.validator.asArray();
		return this.validationResult(() => new ArrayVerifierImpl(newValidator)) as ArrayVerifier<E>;
	}

	asArrayConsumer<E>(consumer: (actual: ArrayVerifier<E>) => void): ObjectVerifier<T>
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.asArray());
		return this;
	}

	asBoolean(): BooleanVerifier
	{
		const newValidator = this.validator.asBoolean();
		return this.validationResult(() => new BooleanVerifierImpl(newValidator)) as BooleanVerifier;
	}

	asBooleanConsumer(consumer: (actual: BooleanVerifier) => void): ObjectVerifier<T>
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.asBoolean());
		return this;
	}

	asNumber(): NumberVerifier
	{
		const newValidator = this.validator.asNumber();
		return this.validationResult(() => new NumberVerifierImpl(newValidator)) as NumberVerifier;
	}

	asNumberConsumer(consumer: (actual: NumberVerifier) => void): ObjectVerifier<T>
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.asNumber());
		return this;
	}

	asSet<E>(): SetVerifier<E>
	{
		const newValidator = this.validator.asSet();
		return this.validationResult(() => new SetVerifierImpl(newValidator)) as SetVerifier<E>;
	}

	asSetConsumer<E>(consumer: (actual: SetVerifier<E>) => void): ObjectVerifier<T>
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.asSet());
		return this;
	}

	asMap<K, V>(): MapVerifier<K, V>
	{
		const newValidator = this.validator.asMap();
		return this.validationResult(() => new MapVerifierImpl(newValidator)) as MapVerifier<K, V>;
	}

	asMapConsumer<K, V>(consumer: (actual: MapVerifier<K, V>) => void): ObjectVerifier<T>
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.asMap());
		return this;
	}

	asInetAddress(): InetAddressVerifier
	{
		const newValidator = this.validator.asInetAddress();
		return this.validationResult(() => new InetAddressVerifierImpl(newValidator)) as InetAddressVerifier;
	}

	asInetAddressConsumer(consumer: (input: InetAddressVerifier) => void): ObjectVerifier<T>
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.asInetAddress());
		return this;
	}

	asClass(): ClassVerifier
	{
		const newValidator = this.validator.asClass();
		return this.validationResult(() => new ClassVerifierImpl(newValidator)) as ClassVerifier;
	}

	asClassConsumer(consumer: (actual: ClassVerifier) => void): ObjectVerifier<T>
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.asClass());
		return this;
	}
}

export {ObjectVerifierImpl};