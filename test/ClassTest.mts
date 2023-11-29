import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import {
	Configuration,
	TerminalEncoding,
	Requirements
} from "../src/index.mjs";
import {TestGlobalConfiguration} from "./TestGlobalConfiguration.mjs";
import type {ClassVerifier} from "../src/ClassVerifier.mjs";
import type {ObjectVerifier} from "../src/ObjectVerifier.mjs";
import type {ClassConstructor} from "../src/internal/internal.mjs";


const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

class MyClass
{
}

suite("ClassTest", () =>
{
	test("any matches ObjectVerifier", () =>
	{
		const myClassAsClass: ClassVerifier<MyClass> = requirements.requireThat(MyClass, "actual");
		const numberAsClass: ClassVerifier<Number> = requirements.requireThat(Number, "actual");
		const anyAsObject: ObjectVerifier<unknown> = requirements.requireThat(Number as unknown, "actual");
		const objectAsClass: ClassVerifier<Object> = requirements.requireThat(Object, "actual");
	});

	test("isClass", () =>
	{
		const actual = Number;
		const expected: ClassConstructor<Number> = requirements.requireThat(actual as unknown, "actual").
			isClass(Number).getActual();
	});

	test("isSupertypeOf", () =>
	{
		requirements.requireThat(Object, "actual").isSupertypeOf(Number);
	});

	test("isSupertypeOf_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(String, "actual").isSupertypeOf(Number);
		}, RangeError);
	});

	test("isSupertypeOf_expectedIsNull", () =>
	{
		assert.throws(function()
		{
			const actual = Number;
			requirements.requireThat(actual, "actual").isSupertypeOf(null as unknown as
				new (...args: any[]) => any);
		}, TypeError);
	});

	test("isSubtypeOf", () =>
	{
		requirements.requireThat(Number, "actual").isSubtypeOf(Object);
	});

	test("isSubtypeOf_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(Number, "actual").isSubtypeOf(String);
		}, RangeError);
	});

	test("isSubtypeOf_expectedIsNull", () =>
	{
		assert.throws(function()
		{
			const actual = Number;
			requirements.requireThat(actual, "actual").isSubtypeOf(null as unknown as ClassConstructor<unknown>);
		}, TypeError);
	});
});