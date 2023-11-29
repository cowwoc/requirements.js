import type {
	Configuration,
	InetAddressValidator
} from "./internal.mjs";
import {
	AbstractObjectValidator,
	Objects,
	ValidationFailure
} from "./internal.mjs";

/**
 * Default implementation of <code>InetAddressValidator</code>.
 */
class InetAddressValidatorImpl extends AbstractObjectValidator<InetAddressValidator, string>
	implements InetAddressValidator
{
	private readonly addressIsIpV4: boolean;
	private readonly addressIsIpV6: boolean;
	private readonly addressIsHostname: boolean;

	/**
	 * Creates a new InetAddressValidator.
	 *
	 * @param configuration - the instance configuration
	 * @param actual - the actual value
	 * @param name - the name of the value
	 * @param isIpV4 - true if the actual value is an IP v4 address
	 * @param isIpV6 - true if the actual value is an IP v6 address
	 * @param isHostname - true if the actual value is a hostname
	 * @param failures - the list of validation failures
	 * @throws TypeError if <code>configuration</code>, <code>name</code>, <code>isIpV4</code>,
	 *   <code>isIpV6</code>, <code>isHostname</code> are null or undefined
	 * @throws RangeError if <code>name</code> is empty
	 */
	constructor(configuration: Configuration, actual: string | undefined, name: string, isIpV4: boolean, isIpV6: boolean,
		isHostname: boolean, failures: ValidationFailure[])
	{
		super(configuration, actual, name, failures);

		Objects.requireThatValueIsDefinedAndNotNull(isIpV4, "isIpV4");
		Objects.requireThatValueIsDefinedAndNotNull(isIpV6, "isIpV6");
		Objects.requireThatValueIsDefinedAndNotNull(isHostname, "isHostname");
		this.addressIsIpV4 = isIpV4;
		this.addressIsIpV6 = isIpV6;
		this.addressIsHostname = isHostname;
	}

	isIpV4(): InetAddressValidator
	{
		if (this.actual === undefined || !this.addressIsIpV4)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be an IP v4 address.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	isIpV6(): InetAddressValidator
	{
		if (this.actual === undefined || !this.addressIsIpV6)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be an IP v6 address.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	isHostname(): InetAddressValidator
	{
		if (this.actual === undefined || !this.addressIsHostname)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be a hostname.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}
}

export {InetAddressValidatorImpl};