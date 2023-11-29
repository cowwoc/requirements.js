import type {
	ExtensibleObjectVerifier,
	ExtensibleObjectValidator,
	ObjectVerifier,
	ClassConstructor,
	ObjectValidator,
	BooleanVerifier,
	NumberVerifier,
	StringVerifier,
	ElementOf,
	ArrayVerifier,
	SetVerifier,
	MapKey,
	MapVerifier,
	InetAddressVerifier,
	ClassVerifier,
	MapValue
} from "../internal.mjs";
import {
	Objects,
	BooleanVerifierImpl,
	NumberVerifierImpl,
	StringVerifierImpl,
	ArrayVerifierImpl,
	SetVerifierImpl,
	MapVerifierImpl,
	InetAddressVerifierImpl,
	ClassVerifierImpl,
	ObjectVerifierImpl
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
	protected getThis(): S
	{
		return this as unknown as S;
	}

	isPrimitive<T2 extends T = T & (string | number | bigint | boolean | null | undefined | symbol)>(): ObjectVerifier<T2>
	{
		this.validator.isPrimitive();
		return this.validationResult(() => this.getThis()) as unknown as ObjectVerifier<T2>;
	}

	isInstanceOf<T2>(type: ClassConstructor<T2>): ObjectVerifier<T2>
	{
		const typeOfType = Objects.getTypeInfo(type);
		if (typeOfType.type === "class")
		{
			const newValidator = this.validator.isInstanceOf(type);
			const newVerifier = new ObjectVerifierImpl<ObjectValidator<T2>, T2>(newValidator);
			return newVerifier.validationResult(() => this.getThis()) as unknown as ObjectVerifier<T2>;
		}
		else
		{
			throw new TypeError("type must be a class\n" +
				"Actual: " + typeOfType.toString());
		}
	}

	isNull(): ObjectVerifier<null>
	{
		this.validator.isNull();
		return this.validationResult(() => this.getThis()) as unknown as ObjectVerifier<null>;
	}

	isNotNull(): ObjectVerifier<Exclude<T, null>>
	{
		this.validator.isNotNull();
		return this.validationResult(() => this.getThis()) as ObjectVerifier<Exclude<T, null>>;
	}

	isDefined<T2 = Exclude<T, undefined>>(): ObjectVerifier<T2>
	{
		this.validator.isDefined();
		return this.validationResult(() => this.getThis()) as unknown as ObjectVerifier<T2>;
	}

	isUndefined(): ObjectVerifier<undefined>
	{
		this.validator.isUndefined();
		return this.validationResult(() => this.getThis()) as ObjectVerifier<undefined>;
	}

	isDefinedAndNotNull<T2 = Exclude<T, undefined | null>>(): ObjectVerifier<T2>
	{
		this.validator.isDefinedAndNotNull();
		return this.validationResult(() => this.getThis()) as unknown as ObjectVerifier<T2>;
	}

	isUndefinedOrNull<T2 extends T = T & (undefined | null)>(): ObjectVerifier<T2>
	{
		this.validator.isUndefinedOrNull();
		return this.validationResult(() => this.getThis()) as ObjectVerifier<T2>;
	}

	isBoolean(): BooleanVerifier
	{
		const newValidator = this.validator.isBoolean();
		return this.validationResult(() => new BooleanVerifierImpl(newValidator)) as BooleanVerifier;
	}

	isNumber(): NumberVerifier
	{
		const newValidator = this.validator.isNumber();
		return this.validationResult(() => new NumberVerifierImpl(newValidator)) as NumberVerifier;
	}

	isString(): StringVerifier
	{
		const newValidator = this.validator.isString();
		return this.validationResult(() => new StringVerifierImpl(newValidator)) as StringVerifier;
	}

	isArray<E = ElementOf<T>>(): ArrayVerifier<E>
	{
		const newValidator = this.validator.isArray();
		return this.validationResult(() => new ArrayVerifierImpl(newValidator)) as ArrayVerifier<E>;
	}

	isSet<E = ElementOf<T>>(): SetVerifier<E>
	{
		const newValidator = this.validator.isSet();
		return this.validationResult(() => new SetVerifierImpl(newValidator)) as SetVerifier<E>;
	}

	isMap<K = MapKey<T>, V = MapValue<T>>(): MapVerifier<K, V>
	{
		const newValidator = this.validator.isMap();
		return this.validationResult(() => new MapVerifierImpl(newValidator)) as unknown as MapVerifier<K, V>;
	}

	isInetAddress(): InetAddressVerifier
	{
		const newValidator = this.validator.isInetAddress();
		return this.validationResult(() => new InetAddressVerifierImpl(newValidator)) as InetAddressVerifier;
	}

	isClass<T2>(type: ClassConstructor<T2>): ClassVerifier<T2>
	{
		const newValidator = this.validator.isClass(type);
		return this.validationResult(() => new ClassVerifierImpl(newValidator));
	}

	isEqualTo(expected: T, name?: string): S
	{
		this.validator.isEqualTo(expected, name);
		return this.validationResult(() => this.getThis());
	}

	isNotEqualTo(value: T, name?: string): S
	{
		this.validator.isNotEqualTo(value, name);
		return this.validationResult(() => this.getThis());
	}

	isTypeOf(type: string): S
	{
		this.validator.isTypeOf(type);
		return this.validationResult(() => this.getThis());
	}

	validationResult<T2>(result: () => T2): T2
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

	getActual(): T
	{
		// The verifier is guaranteed to throw an exception if validation fails
		return this.validator.getActual() as T;
	}
}

export {AbstractObjectVerifier};