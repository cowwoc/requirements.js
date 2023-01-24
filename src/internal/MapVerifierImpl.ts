import
{
	AbstractObjectVerifier,
	ArrayVerifier,
	ArrayVerifierImpl,
	MapValidator,
	MapVerifier,
	NumberVerifier,
	NumberVerifierImpl,
	Objects
} from "./internal.js";

/**
 * Default implementation of <code>MapVerifier</code>.
 */
class MapVerifierImpl extends AbstractObjectVerifier<MapVerifier, MapValidator>
	implements MapVerifier
{
	/**
	 * Creates a new MapVerifierImpl.
	 *
	 * @param {object} validator the validator to delegate to
	 * @throws {TypeError} if <code>validator</code> is null or undefined
	 */
	constructor(validator: MapValidator)
	{
		super(validator);
	}

	protected getThis(): MapVerifier
	{
		return this;
	}

	isEmpty(): MapVerifier
	{
		this.validator.isEmpty();
		return this.validationResult();
	}

	isNotEmpty(): MapVerifier
	{
		this.validator.isNotEmpty();
		return this.validationResult();
	}

	keys(): ArrayVerifier
	{
		const newValidator = this.validator.keys();
		return this.validationResult(() => new ArrayVerifierImpl(newValidator)) as ArrayVerifier;
	}

	keysConsumer(consumer: (actual: ArrayVerifier) => void): MapVerifier
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.keys());
		return this;
	}

	values(): ArrayVerifier
	{
		const newValidator = this.validator.values();
		return this.validationResult(() => new ArrayVerifierImpl(newValidator)) as ArrayVerifier;
	}

	valuesConsumer(consumer: (actual: ArrayVerifier) => void): MapVerifier
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.values());
		return this;
	}

	entries(): ArrayVerifier
	{
		const newValidator = this.validator.entries();
		return this.validationResult(() => new ArrayVerifierImpl(newValidator)) as ArrayVerifier;
	}

	entriesConsumer(consumer: (actual: ArrayVerifier) => void): MapVerifier
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.entries());
		return this;
	}

	size(): NumberVerifier
	{
		const newValidator = this.validator.size();
		return this.validationResult(() => new NumberVerifierImpl(newValidator)) as NumberVerifier;
	}

	sizeConsumer(consumer: (actual: NumberVerifier) => void): MapVerifier
	{
		Objects.requireThatIsSet(consumer, "consumer");
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