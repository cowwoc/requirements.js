import type {
	ClassValidator,
	Configuration,
	ClassConstructor
} from "./internal.mjs";
import {
	AbstractObjectValidator,
	Objects,
	ValidationFailure
} from "./internal.mjs";

/**
 * Default implementation of <code>ClassValidator</code>.
 */
class ClassValidatorImpl<T> extends AbstractObjectValidator<ClassValidator<T>, ClassConstructor<T>>
	implements ClassValidator<T>
{
	/**
	 * Creates a new ClassValidator.
	 *
	 * @param configuration - the instance configuration
	 * @param actual - the actual value
	 * @param name - the name of the value
	 * @param failures - the list of validation failures
	 * @throws TypeError if <code>configuration</code>, <code>name</code>, <code>isIpV4</code>,
	 *   <code>isIpV6</code>, <code>isHostname</code> are null or undefined
	 * @throws RangeError if <code>name</code> is empty
	 */
	constructor(configuration: Configuration, actual: ClassConstructor<T> | undefined, name: string,
		failures: ValidationFailure[])
	{
		super(configuration, actual, name, failures);
	}

	isSupertypeOf<T2>(type: ClassConstructor<T2>): ClassValidator<T>
	{
		Objects.requireThatValueIsDefinedAndNotNull(type, "type");
		const typeOfType = Objects.getTypeInfo(type);
		let failure;
		if (typeOfType.type === "class")
		{
			const typeOfActual = Objects.getTypeInfo(this.actual);
			if (typeOfActual.type === "class" && Objects.extends(type, this.actual as ClassConstructor<T>))
				return this;
			failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be a super-type of " + typeOfType.toString()).
				addContext("Actual", typeOfActual);
		}
		else
		{
			failure = new ValidationFailure(this.config, TypeError, "type must be a class.").
				addContext("Actual", typeOfType);
		}
		this.failures.push(failure);
		return this;
	}

	isSubtypeOf<T2>(type: ClassConstructor<T2>): ClassValidator<T>
	{
		const typeInfo = Objects.getTypeInfo(type);
		let failure;
		if (typeInfo.type === "class")
		{
			const typeOfActual = Objects.getTypeInfo(this.actual);
			if (typeOfActual.type === "class" && Objects.extends(this.actual as ClassConstructor<T>, type))
				return this;
			failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be a sub-type of " + typeInfo.toString()).
				addContext("Actual", typeOfActual);
		}
		else
		{
			failure = new ValidationFailure(this.config, TypeError, "type must be a class.").
				addContext("Actual", typeInfo);
		}
		this.failures.push(failure);
		return this;
	}
}

export {ClassValidatorImpl};