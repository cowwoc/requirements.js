import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import {
	JavascriptValidatorsImpl,
	Type
} from "../src/internal/internal.mjs";
import {
	TerminalEncoding,
	Configuration
} from "../src/index.mjs";
import {TestApplicationScope} from "./TestApplicationScope.mjs";


const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
	Configuration.DEFAULT);

suite("StringTest", () =>
{
	test("isEmpty", () =>
	{
		validators.requireThatString("", "actual").isEmpty();
	});

	test("isEmpty_False", () =>
	{
		assert.throws(function()
		{
			validators.requireThatString("   ", "actual").isEmpty();
		}, RangeError);
	});

	test("isTrimmed", () =>
	{
		validators.requireThatString("", "actual").isTrimmed();
	});

	test("isTrimmed_LeftSpace", () =>
	{
		assert.throws(function()
		{
			validators.requireThatString("  value", "actual").isTrimmed();
		}, RangeError);
	});

	test("isTrimmed_RightSpace", () =>
	{
		assert.throws(function()
		{
			validators.requireThatString("value  ", "actual").isTrimmed();
		}, RangeError);
	});

	test("isNotEmpty", () =>
	{
		validators.requireThatString("   ", "actual").isNotEmpty();
	});

	test("isNotEmpty_False", () =>
	{
		assert.throws(function()
		{
			validators.requireThatString("", "actual").isNotEmpty();
		}, RangeError);
	});

	test("startsWith", () =>
	{
		const prefix = "home";
		const actual = prefix + "1234";
		validators.requireThatString(actual, "actual").startsWith(prefix);
	});

	test("startsWith_False", () =>
	{
		assert.throws(function()
		{
			const prefix = "home";
			const actual = "1234" + prefix;
			validators.requireThatString(actual, "actual").startsWith(prefix);
		}, RangeError);
	});

	test("doesNotStartWith", () =>
	{
		const prefix = "home";
		const actual = "1234" + prefix;
		validators.requireThatString(actual, "actual").doesNotStartWith(prefix);
	});

	test("doesNotStartWith_False", () =>
	{
		assert.throws(function()
		{
			const prefix = "home";
			const actual = prefix + "1234";
			validators.requireThatString(actual, "actual").doesNotStartWith(prefix);
		}, RangeError);
	});

	test("contains", () =>
	{
		const expected = "cat";
		const actual = "my " + expected + " is the best";
		validators.requireThatString(actual, "actual").contains(expected);
	});

	test("contains_False", () =>
	{
		assert.throws(function()
		{
			const expected = "cat";
			const actual = "my dog is the best";
			validators.requireThatString(actual, "actual").contains(expected);
		}, RangeError);
	});

	test("doesNotContain", () =>
	{
		const value = "cat";
		const actual = "my dog is the best";
		validators.requireThatString(actual, "actual").doesNotContain(value);
	});

	test("doesNotContain_False", () =>
	{
		assert.throws(function()
		{
			const value = "cat";
			const actual = "my " + value + " is the best";
			validators.requireThatString(actual, "actual").doesNotContain(value);
		}, RangeError);
	});

	test("doesNotContainWhitespace", () =>
	{
		const actual = "mydogisthebest";
		validators.requireThatString(actual, "actual").doesNotContainWhitespace();
	});

	test("doesNotContainWhitespace_False", () =>
	{
		assert.throws(function()
		{
			const actual = "my dog is the best";
			validators.requireThatString(actual, "actual").doesNotContainWhitespace();
		}, RangeError);
	});

	test("endsWith", () =>
	{
		const suffix = "home";
		const actual = "1234" + suffix;
		validators.requireThatString(actual, "actual").endsWith(suffix);
	});

	test("endsWith_False", () =>
	{
		assert.throws(function()
		{
			const suffix = "home";
			const actual = suffix + "1234";
			validators.requireThatString(actual, "actual").endsWith(suffix);
		}, RangeError);
	});

	test("doesNotEndWith", () =>
	{
		const suffix = "home";
		const actual = suffix + "1234";
		validators.requireThatString(actual, "actual").doesNotEndWith(suffix);
	});

	test("doesNotEndWith_False", () =>
	{
		assert.throws(function()
		{
			const suffix = "home";
			const actual = "1234" + suffix;
			validators.requireThatString(actual, "actual").doesNotEndWith(suffix);
		}, RangeError);
	});

	test("lengthIsEqualTo", () =>
	{
		const actual = "value";
		validators.requireThatString(actual, "actual").length().isEqualTo(actual.length);
	});

	test("lengthIsEqualTo_False", () =>
	{
		const actual = "value";
		assert.throws(function()
		{
			validators.requireThatString(actual, "actual").length().isEqualTo(1);
		}, RangeError);
		assert.throws(function()
		{
			validators.requireThatString(actual, "actual").length().isEqualTo(actual.length + 1);
		}, RangeError);
	});

	test("lengthIsNotEqualTo", () =>
	{
		const actual = "value";
		validators.requireThatString(actual, "actual").length().isNotEqualTo(actual.length + 1);
	});

	test("lengthIsNotEqualTo_False", () =>
	{
		assert.throws(function()
		{
			const actual = "value";
			validators.requireThatString(actual, "actual").length().isNotEqualTo(actual.length);
		}, RangeError);
	});

	test("length", () =>
	{
		const actual = " value ";
		assert.throws(function()
		{
			validators.requireThatString(actual, "actual").length().isEqualTo(actual.length + 1);
		}, RangeError);
	});

	test("isTypeString", () =>
	{
		const actual = "value";
		validators.requireThatString(actual as unknown as string, "actual").isType(Type.STRING).isEqualTo(actual).
			getValue();
	});

	test("getActual", () =>
	{
		const input = "value";
		const output = validators.requireThatString(input, "input").getValue();
		assert.strictEqual(output, input);
	});

	test("checkIfNullAsString", () =>
	{
		const actual = null;
		const expected = "not-null";
		const expectedMessages = [`\
"actual" must be a string.
actual: null`,
			`"actual" must be equal to "${expected}".
actual: null`];

		const actualFailures = validators.checkIfString(actual, "actual").isType(Type.STRING).isEqualTo(expected).
			elseGetFailures();
		const actualMessages = actualFailures.getFailures().map(failure => failure.getMessage());
		validators.requireThatArray(actualMessages, "actualMessages").
			isEqualTo(expectedMessages, "expectedMessages");
	});
});