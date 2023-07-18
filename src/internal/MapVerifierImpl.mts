import {
	AbstractObjectVerifier,
	type ArrayVerifier,
	ArrayVerifierImpl,
	type MapValidator,
	type MapVerifier,
	type NumberVerifier,
	NumberVerifierImpl,
	Objects
} from "./internal.mjs";

/**
 * Default implementation of <code>MapVerifier</code>.
 */
class MapVerifierImpl extends AbstractObjectVerifier<MapVerifier, MapValidator>
	implements MapVerifier
{
	/**
	 * Creates a new MapVerifierImpl.
	 *
	 * @param validator - the validator to delegate to
	 * @throws TypeError if <code>validator</code> is null or undefined
	 */
	constructor(validator: MapValidator)
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
		return this.validationResult(() => new ArrayVerifierImpl(newValidator)) as ArrayVerifier;
	}

	keysConsumer(consumer: (actual: ArrayVerifier) => void)
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.keys());
		return this;
	}

	values()
	{
		const newValidator = this.validator.values();
		return this.validationResult(() => new ArrayVerifierImpl(newValidator)) as ArrayVerifier;
	}

	valuesConsumer(consumer: (actual: ArrayVerifier) => void)
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.values());
		return this;
	}

	entries()
	{
		const newValidator = this.validator.entries();
		return this.validationResult(() => new ArrayVerifierImpl(newValidator)) as ArrayVerifier;
	}

	entriesConsumer(consumer: (actual: ArrayVerifier) => void)
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

	sizeConsumer(consumer: (actual: NumberVerifier) => void): MapVerifier
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.size());
		return this;
	}

	getActual(): Map<unknown, unknown>
	{
		return super.getActual() as Map<unknown, unknown>;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {MapVerifierImpl as default};