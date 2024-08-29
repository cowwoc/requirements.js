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
class ClassValidatorImpl<T> extends AbstractValidator<ClassValidator<T>, ClassConstructor<T>>
	implements ClassValidator<T>
{
	isPrimitive(): ClassValidator<T>
	{
		if (this.value.validationFailed(v => Type.of(v).isPrimitive()))
		{
			this.addRangeError(
				classIsPrimitive(this).toString());
		}
		return this.self();
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
			this.addRangeError(
				classIsSupertypeOf(this, type).toString());
		}
		return this.self();
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
			this.addRangeError(
				classIsSubtypeOf(this, type).toString());
		}
		return this.self();
	}
}

export {ClassValidatorImpl};