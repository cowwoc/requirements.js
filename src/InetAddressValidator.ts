import {
	Configuration,
	Objects,
	ObjectValidator,
	ValidationFailure
} from "./internal/internal";

/**
 * Validates the requirements of an IP address or hostname.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class InetAddressValidator extends ObjectValidator
{
	private readonly addressIsIpV4: boolean;
	private readonly addressIsIpV6: boolean;
	private readonly addressIsHostname: boolean;

	/**
	 * Creates a new InetAddressValidator.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {object} actual the actual value
	 * @param {string} name   the name of the value
	 * @param {boolean} isIpV4 true if the actual value is an IP v4 address
	 * @param {boolean} isIpV6 true if the actual value is an IP v6 address
	 * @param {boolean} isHostname true if the actual value is a hostname
	 * @throws {TypeError} if <code>name</code>, <code>config</code>, <code>isIpV4</code>, <code>isIpV6</code>,
	 *   <code>isHostname</code> are null or undefined
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	constructor(configuration: Configuration, actual: string, name: string, isIpV4: boolean, isIpV6: boolean,
		isHostname: boolean)
	{
		super(configuration, actual, name);

		Objects.requireThatIsSet(isIpV4, "isIpV4");
		Objects.requireThatIsSet(isIpV6, "isIpV6");
		Objects.requireThatIsSet(isHostname, "isHostname");
		this.addressIsIpV4 = isIpV4;
		this.addressIsIpV6 = isIpV6;
		this.addressIsHostname = isHostname;
	}

	/**
	 * Ensures that the actual value is an IP v4 address.
	 *
	 * @return {InetAddressValidator} the updated validator
	 */
	isIpV4(): this
	{
		if (!this.addressIsIpV4)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be an IP v4 address.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is an IP v6 address.
	 *
	 * @return {InetAddressValidator} the updated validator
	 */
	isIpV6(): InetAddressValidator
	{
		if (!this.addressIsIpV6)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be an IP v6 address.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is an IP v6 address.
	 *
	 * @return {InetAddressValidator} the updated validator
	 * @see <a href="https://tools.ietf.org/html/rfc3696#section-2">rfc3696</a>
	 */
	isHostname(): this
	{
		if (!this.addressIsHostname)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be a hostname.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	getActual(): string
	{
		return super.getActual() as string;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {InetAddressValidator as default};