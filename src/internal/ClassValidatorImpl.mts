import {
	AbstractObjectValidator,
	type ClassValidator,
	Configuration,
	Objects,
	ValidationFailure
} from "./internal.mjs";

/**
 * Default implementation of <code>ClassValidator</code>.
 */
class ClassValidatorImpl extends AbstractObjectValidator<ClassValidator>
	implements ClassValidator
{
	protected getThis()
	{
		return this;
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	private readonly actualClass: Function;

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
	constructor(configuration: Configuration, actual: unknown, name: string, failures: ValidationFailure[])
	{
		super(configuration, actual, name, failures);

		// eslint-disable-next-line @typescript-eslint/ban-types
		this.actualClass = actual as Function;
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	isSupertypeOf(type: Function)
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;


		const typeInfo = Objects.getTypeInfo(type);
		let failure;
		switch (typeInfo.type)
		{
			case "function":
			case "class":
			{
				if (Objects.extends(type, this.actualClass))
					return this;
				const actualInfo = Objects.getTypeInfo(this.actualClass);
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must be a super-type of " + typeInfo.toString()).
					addContext("Actual", actualInfo);
				break;
			}
			default:
			{
				failure = new ValidationFailure(this.config, TypeError, "type must be a function or class.").
					addContext("Actual", typeInfo);
				break;
			}
		}
		this.failures.push(failure);
		return this;
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	isSubtypeOf(type: Function)
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		const typeInfo = Objects.getTypeInfo(type);
		let failure;
		switch (typeInfo.type)
		{
			case "function":
			case "class":
			{
				if (Objects.extends(this.actualClass, type))
					return this;
				const actualInfo = Objects.getTypeInfo(this.actualClass);
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must be a sub-type of " + typeInfo.toString()).
					addContext("Actual", actualInfo);
				break;
			}
			default:
			{
				failure = new ValidationFailure(this.config, TypeError, "type must be a function or class.").
					addContext("Actual", typeInfo);
				break;
			}
		}
		this.failures.push(failure);
		return this;
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	getActual(): void | Function
	{
		return this.actualClass;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ClassValidatorImpl as default};