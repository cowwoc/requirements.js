import {
	AbstractObjectValidator,
	ClassValidator,
	ClassValidatorNoOp,
	Configuration,
	Objects,
	ValidationFailure
} from "./internal";

/**
 * Default implementation of <code>ClassValidator</code>.
 */
class ClassValidatorImpl extends AbstractObjectValidator<ClassValidator>
	implements ClassValidator
{
	protected getThis(): ClassValidator
	{
		return this;
	}

	protected getNoOp(): ClassValidator
	{
		return new ClassValidatorNoOp(this.failures);
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	private readonly actualClass: Function;

	constructor(configuration: Configuration, actual: unknown, name: string)
	{
		super(configuration, actual, name);

		// eslint-disable-next-line @typescript-eslint/ban-types
		this.actualClass = actual as Function;
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	isSupertypeOf(type: Function): ClassValidator
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		const typeOfType = Objects.getTypeOf(type);
		if (typeOfType === "Function")
		{
			if (Objects.extends(type, this.actualClass))
				return this.getThis();
		}
		const failure = new ValidationFailure(this.config, RangeError,
			this.name + " must be a super-type of " + typeOfType).
			addContext("Actual", typeOfType);
		this.failures.push(failure);
		return this.getThis();
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	isSubtypeOf(type: Function): ClassValidator
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		const typeOfType = Objects.getTypeOf(type);
		if (typeOfType === "Function")
		{
			if (Objects.extends(this.actualClass, type))
				return this.getThis();
		}
		const failure = new ValidationFailure(this.config, RangeError,
			this.name + " must be a sub-type of " + typeOfType).
			addContext("Actual", Objects.getTypeOf(this.actual));
		this.failures.push(failure);
		return this.getThis();
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	getActual(): Function
	{
		return this.actualClass;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ClassValidatorImpl as default};