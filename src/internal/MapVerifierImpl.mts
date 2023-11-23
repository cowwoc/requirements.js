import type {
	ArrayVerifier,
	MapValidator,
	MapVerifier,
	NumberVerifier
} from "./internal.mjs";
import {
	AbstractObjectVerifier,
	ArrayVerifierImpl,
	NumberVerifierImpl,
	Objects
} from "./internal.mjs";

/**
 * Default implementation of <code>MapVerifier</code>.
 *
 * @typeParam K - the type the map's keys
 * @typeParam V - the type the map's values
 */
class MapVerifierImpl<K, V> extends AbstractObjectVerifier<MapVerifier<K, V>, MapValidator<K, V>, Map<K, V>>
	implements MapVerifier<K, V>
{
	/**
	 * Creates a new MapVerifierImpl.
	 *
	 * @param validator - the validator to delegate to
	 * @throws TypeError if <code>validator</code> is null or undefined
	 */
	constructor(validator: MapValidator<K, V>)
	{
		super(validator);
	}

	protected getThis()
	{
		return this;
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

	keys()
	{
		const newValidator = this.validator.keys();
		return this.validationResult(() => new ArrayVerifierImpl(newValidator)) as ArrayVerifier<K>;
	}

	keysConsumer(consumer: (actual: ArrayVerifier<K>) => void)
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.keys());
		return this;
	}

	values()
	{
		const newValidator = this.validator.values();
		return this.validationResult(() => new ArrayVerifierImpl(newValidator)) as ArrayVerifier<V>;
	}

	valuesConsumer(consumer: (actual: ArrayVerifier<V>) => void)
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.values());
		return this;
	}

	entries()
	{
		const newValidator = this.validator.entries();
		return this.validationResult(() => new ArrayVerifierImpl(newValidator)) as ArrayVerifier<[K, V]>;
	}

	entriesConsumer(consumer: (actual: ArrayVerifier<[K, V]>) => void)
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.entries());
		return this;
	}

	size()
	{
		const newValidator = this.validator.size();
		return this.validationResult(() => new NumberVerifierImpl(newValidator)) as NumberVerifier;
	}

	sizeConsumer(consumer: (actual: NumberVerifier) => void): MapVerifier<K, V>
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.size());
		return this;
	}
}

export {MapVerifierImpl};