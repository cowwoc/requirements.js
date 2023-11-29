import type {
	InetAddressValidator,
	InetAddressVerifier
} from "./internal.mjs";
import {AbstractObjectVerifier} from "./internal.mjs";

/**
 * Default implementation of <code>InetAddressVerifier</code>.
 */
class InetAddressVerifierImpl extends AbstractObjectVerifier<InetAddressVerifier, InetAddressValidator, string>
	implements InetAddressVerifier
{
	/**
	 * Creates a new InetAddressVerifierImpl.
	 *
	 * @param validator - the validator to delegate to
	 * @throws TypeError if <code>validator</code> is null or undefined
	 */
	constructor(validator: InetAddressValidator)
	{
		super(validator);
	}

	isIpV4(): InetAddressVerifier
	{
		this.validator.isIpV4();
		return this.validationResult(() => this.getThis());
	}

	isIpV6(): InetAddressVerifier
	{
		this.validator.isIpV6();
		return this.validationResult(() => this.getThis());
	}

	isHostname(): InetAddressVerifier
	{
		this.validator.isHostname();
		return this.validationResult(() => this.getThis());
	}
}

export {InetAddressVerifierImpl};