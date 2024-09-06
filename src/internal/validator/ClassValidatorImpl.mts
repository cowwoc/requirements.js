import {
	type ClassConstructor,
	type ClassValidator,
	AbstractValidator,
	classIsSupertypeOf,
	classIsSubtypeOf,
	classIsPrimitive,
	Type
} from "../internal.mjs";

/**
 * Default implementation of <code>ClassValidator</code>.
 */
class ClassValidatorImpl<T> extends AbstractValidator<ClassConstructor<T>>
	implements ClassValidator<T>
{
	isPrimitive(): ClassValidator<T>
	{
		if (this.value.validationFailed(v => Type.of(v).isPrimitive()))
		{
			this.addRangeError(
				classIsPrimitive(this).toString());
		}
		return this;
	}

	isSupertypeOf<U>(type: ClassConstructor<U>): ClassValidator<U>
	{
		if (this.value.validationFailed(v =>
		{
			const child = Type.of(v);
			const parent = Type.of(type);
			return child.isSubtypeOf(parent);
		}))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				classIsSupertypeOf(this, type).toString());
		}
		return this as unknown as ClassValidator<U>;
	}

	isSubtypeOf<U>(type: ClassConstructor<U>): ClassValidator<U>
	{
		if (this.value.validationFailed(v =>
		{
			const child = Type.of(type);
			const parent = Type.of(v);
			return child.isSubtypeOf(parent);
		}))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				classIsSubtypeOf(this, type).toString());
		}
		return this as unknown as ClassValidator<U>;
	}
}

export {ClassValidatorImpl};