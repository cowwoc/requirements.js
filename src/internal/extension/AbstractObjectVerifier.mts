import type {
	ExtensibleObjectValidator,
	ExtensibleObjectVerifier,
	StringVerifier,
	ArrayVerifier,
	BooleanVerifier,
	NumberVerifier,
	SetVerifier,
	MapVerifier,
	InetAddressVerifier,
	ClassVerifier,
	ObjectVerifier
} from "../internal.mjs";
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
} from "../internal.mjs";

/**
 * Extensible implementation of <code>ExtensibleObjectVerifier</code>.
 *
 * @typeParam S - the type of validator returned by the methods
 * @typeParam T - the type the actual value
 */
abstract class AbstractObjectVerifier<S, V extends ExtensibleObjectValidator<V, T>, T>
	implements ExtensibleObjectVerifier<S, T>
{
	protected readonly validator: V;

	/**
	 * Creates a new AbstractObjectVerifier.
	 *
	 * @param validator - the validator to delegate to
	 * @throws TypeError if <code>validator</code> is null or undefined
	 */
	protected constructor(validator: V)
	{
		Objects.requireThatValueIsDefinedAndNotNull(validator, "validator");
		this.validator = validator;
	}

	/**
	 * @returns this
	 */
	protected abstract getThis(): S;

	isEqualTo(expected: T, name?: string): S
	{
		this.validator.isEqualTo(expected, name);
		return this.validationResult(() => this.getThis());
	}

	validationResult<R>(result: () => R): R
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

	isNotEqualTo(value: T, name?: string): S
	{
		this.validator.isNotEqualTo(value, name);
		return this.validationResult(() => this.getThis());
	}

	isPrimitive(): S
	{
		this.validator.isPrimitive();
		return this.validationResult(() => this.getThis());
	}

	isTypeOf(type: string): S
	{
		this.validator.isTypeOf(type);
		return this.validationResult(() => this.getThis());
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	isInstanceOf(type: Function): S
	{
		this.validator.isInstanceOf(type);
		return this.validationResult(() => this.getThis());
	}

	isNull(): ObjectVerifier<null>
	{
		this.validator.isNull();
		return this.validationResult(() => this.getThis()) as ObjectVerifier<null>;
	}

	isNotNull(): S
	{
		this.validator.isNotNull();
		return this.validationResult(() => this.getThis());
	}

	isDefined(): S
	{
		this.validator.isDefined();
		return this.validationResult(() => this.getThis());
	}

	isNotDefined(): S
	{
		this.validator.isNotDefined();
		return this.validationResult(() => this.getThis());
	}

	isSet(): S
	{
		this.validator.isSet();
		return this.validationResult(() => this.getThis());
	}

	isNotSet(): S
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

	asStringConsumer(consumer: (actual: StringVerifier) => void): S
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.asString());
		return this.getThis();
	}

	asArray<E>(): ArrayVerifier<E>
	{
		const newValidator = this.validator.asArray();
		return this.validationResult(() => new ArrayVerifierImpl(newValidator)) as ArrayVerifier<E>;
	}

	asArrayConsumer<E>(consumer: (actual: ArrayVerifier<E>) => void): S
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
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
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
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
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.asNumber());
		return this.getThis();
	}

	asSet<E>(): SetVerifier<E>
	{
		const newValidator = this.validator.asSet();
		return this.validationResult(() => new SetVerifierImpl(newValidator)) as SetVerifier<E>;
	}

	asSetConsumer<E>(consumer: (actual: SetVerifier<E>) => void): S
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.asSet());
		return this.getThis();
	}

	asMap<K, V>(): MapVerifier<K, V>
	{
		const newValidator = this.validator.asMap();
		return this.validationResult(() => new MapVerifierImpl(newValidator)) as MapVerifier<K, V>;
	}

	asMapConsumer<K, V>(consumer: (actual: MapVerifier<K, V>) => void): S
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
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
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
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
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.asClass());
		return this.getThis();
	}
}

export {AbstractObjectVerifier};