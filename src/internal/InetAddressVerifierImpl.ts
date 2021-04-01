import {
	AbstractObjectVerifier,
	InetAddressValidator,
	InetAddressVerifier
} from "./internal";

/**
 * Default implementation of <code>InetAddressVerifier</code>.
 */
class InetAddressVerifierImpl extends AbstractObjectVerifier<InetAddressVerifier, InetAddressValidator>
	implements InetAddressVerifier
{
	/**
	 * Creates a new InetAddressVerifierImpl.
	 *
	 * @param {object} validator the validator to delegate to
	 * @throws {TypeError} if <code>validator</code> is null or undefined
	 */
	constructor(validator: InetAddressValidator)
	{
		super(validator);
	}

	protected getThis(): InetAddressVerifier
	{
		return this;
	}

	isIpV4(): InetAddressVerifier
	{
		this.validator.isIpV4();
		return this.validationResult();
	}

	isIpV6(): InetAddressVerifier
	{
		this.validator.isIpV6();
		return this.validationResult();
	}

	isHostname(): InetAddressVerifier
	{
		this.validator.isHostname();
		return this.validationResult();
	}

	getActual(): string
	{
		return super.getActual() as string;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {InetAddressVerifierImpl as default};