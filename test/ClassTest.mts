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

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

suite("ClassTest", () =>
{
	test("isSupertypeOf", () =>
	{
		requirements.requireThat(Object, "actual").asClass().isSupertypeOf(Number);
	});

	test("isSupertypeOf_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(String, "actual").asClass().isSupertypeOf(Number);
		}, RangeError);
	});

	test("isSupertypeOf_expectedIsNull", () =>
	{
		assert.throws(function()
		{
			const actual = ["element"];
			// eslint-disable-next-line @typescript-eslint/ban-types
			requirements.requireThat(actual, "actual").asClass().isSupertypeOf(null as unknown as Function);
		}, TypeError);
	});

	test("isSupertypeOf_actualIsNull", () =>
	{
		assert.throws(function()
		{
			const actual = null;
			requirements.requireThat(actual, "actual").asClass().isSupertypeOf(Object);
		}, TypeError);
	});

	test("isSubtypeOf", () =>
	{
		requirements.requireThat(Number, "actual").asClass().isSubtypeOf(Object);
	});

	test("isSubtypeOf_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(Number, "actual").asClass().isSubtypeOf(String);
		}, RangeError);
	});

	test("isSubtypeOf_expectedIsNull", () =>
	{
		assert.throws(function()
		{
			const actual = ["element"];
			// eslint-disable-next-line @typescript-eslint/ban-types
			requirements.requireThat(actual, "actual").asClass().isSubtypeOf(null as unknown as Function);
		}, TypeError);
	});

	test("isSubtypeOf_actualIsNull", () =>
	{
		assert.throws(function()
		{
			const actual = null;
			requirements.requireThat(actual, "actual").asClass().isSubtypeOf(Object);
		}, TypeError);
	});

	test("validateThatNullAsClass", () =>
	{
		const actual = null;
		const expectedMessages = ["actual must contain a class.\n" +
		"Actual: null\n" +
		"Type  : null"];
		const actualFailures = requirements.validateThat(actual, "actual").asClass().isSubtypeOf(Object).
			getFailures();
		const actualMessages = actualFailures.map(failure => failure.getMessage());
		requirements.requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages);
	});
});