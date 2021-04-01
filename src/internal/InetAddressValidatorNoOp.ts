import {
	AbstractObjectValidatorNoOp,
	InetAddressValidator,
	ValidationFailure
} from "./internal";

/**
 * An implementation of <code>InetAddressValidator</code> that does nothing.
 */
class InetAddressValidatorNoOp extends AbstractObjectValidatorNoOp<InetAddressValidator>
	implements InetAddressValidator
{
	/**
	 * Creates a new InetAddressValidatorNoOp.
	 *
	 * @param {ValidationFailure[]} failures the list of validation failures
	 * @throws {TypeError} if <code>failures</code> is null or undefined
	 */
	constructor(failures: ValidationFailure[])
	{
		super(failures);
	}

	protected getThis(): InetAddressValidator
	{
		return this;
	}

	/**
	 * @return {InetAddressValidator} the updated validator
	 */
	isIpV4(): InetAddressValidator
	{
		return this;
	}

	/**
	 * @return {InetAddressValidator} the updated validator
	 */
	isIpV6(): InetAddressValidator
	{
		return this;
	}

	/**
	 * @return {InetAddressValidator} the updated validator
	 */
	isHostname(): InetAddressValidator
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {InetAddressValidatorNoOp as default};