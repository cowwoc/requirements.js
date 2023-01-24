import
{
	AbstractObjectVerifier,
	ClassValidator,
	ClassVerifier
} from "./internal.js";

/**
 * Default implementation of <code>ClassVerifier</code>.
 */
class ClassVerifierImpl extends AbstractObjectVerifier<ClassVerifier, ClassValidator>
	implements ClassVerifier
{
	/**
	 * Creates a new ClassVerifierImpl.
	 *
	 * @param {object} validator the validator to delegate to
	 * @throws {TypeError} if <code>validator</code> is null or undefined
	 */
	constructor(validator: ClassValidator)
	{
		super(validator);
	}

	protected getThis(): ClassVerifier
	{
		return this;
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	isSupertypeOf(type: Function): ClassVerifier
	{
		this.validator.isSupertypeOf(type);
		return this.validationResult();
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	isSubtypeOf(type: Function): ClassVerifier
	{
		this.validator.isSubtypeOf(type);
		return this.validationResult();
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	getActual(): Function
	{
		// eslint-disable-next-line @typescript-eslint/ban-types
		return super.getActual() as Function;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ClassVerifierImpl as default};