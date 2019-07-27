import Configuration from "./Configuration.js";
import ObjectValidator from "./internal/circular_dependency/ObjectValidatorBase.js";
import ValidationFailure from "./ValidationFailure.js";
import Objects from "./internal/Objects.js";
import InetAddressValidatorNoOp from "./internal/InetAddressValidatorNoOp.js";

/**
 * Validates the requirements of an IP address or hostname.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class InetAddressValidator extends ObjectValidator
{
	/**
	 * Creates a new InetAddressValidator.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {string} actual the actual value
	 * @param {string} name   the name of the value
	 * @param {boolean} isIpV4 true if the actual value is an IP v4 address
	 * @param {boolean} isIpV6 true if the actual value is an IP v6 address
	 * @param {boolean} isHostname true if the actual value is a hostname
	 * @throws {TypeError} if <code>name</code>, <code>config</code>, <code>isIpV4</code>, <code>isIpV6</code>,
	 *   <code>isHostname</code> are null or undefined
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	constructor(configuration, actual, name, isIpV4, isIpV6, isHostname)
	{
		super(configuration, actual, name);

		Objects.requireThatIsSet(isIpV4, "isIpV4");
		Objects.requireThatIsSet(isIpV6, "isIpV6");
		Objects.requireThatIsSet(isHostname, "isHostname");

		/**
		 * Ensures that the actual value is an IP v4 address.
		 *
		 * @return {InetAddressValidator|InetAddressValidatorNoOp} the updated validator
		 */
		this.isIpV4 = function()
		{
			const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
			if (failureMessage !== null)
			{
				const failure = new ValidationFailure(this.config, TypeError.prototype, failureMessage);
				this.failures.push(failure);
				return new InetAddressValidatorNoOp(this.failures);
			}
			if (!isIpV4)
			{
				const failure = new ValidationFailure(this.config, RangeError.prototype,
					this.name + " must be an IP v4 address.").
					addContext("Actual", this.actual);
				this.failures.push(failure);
			}
			return this;
		};

		/**
		 * Ensures that the actual value is an IP v6 address.
		 *
		 * @return {InetAddressValidator|InetAddressValidatorNoOp} the updated validator
		 */
		this.isIpV6 = function()
		{
			const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
			if (failureMessage !== null)
			{
				const failure = new ValidationFailure(this.config, TypeError.prototype, failureMessage);
				this.failures.push(failure);
				return new InetAddressValidatorNoOp(this.failures);
			}
			if (!isIpV6)
			{
				const failure = new ValidationFailure(this.config, RangeError.prototype,
					this.name + " must be an IP v6 address.").
					addContext("Actual", this.actual);
				this.failures.push(failure);
			}
			return this;
		};

		/**
		 * Ensures that the actual value is an IP v6 address.
		 *
		 * @return {InetAddressValidator|InetAddressValidatorNoOp} the updated validator
		 * @see <a href="https://tools.ietf.org/html/rfc3696#section-2">rfc3696</a>
		 */
		this.isHostname = function()
		{
			const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
			if (failureMessage !== null)
			{
				const failure = new ValidationFailure(this.config, TypeError.prototype, failureMessage);
				this.failures.push(failure);
				return new InetAddressValidatorNoOp(this.failures);
			}
			if (!isHostname)
			{
				const failure = new ValidationFailure(this.config, RangeError.prototype,
					this.name + " must be a hostname.").
					addContext("Actual", this.actual);
				this.failures.push(failure);
			}
			return this;
		};
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {InetAddressValidator as default};