import {
	TerminalEncoding,
	Configuration,
	AssertionError
} from "../src/index.mjs";
import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import {JavascriptValidatorsImpl} from "../src/internal/internal.mjs";
import {TestApplicationScope} from "./TestApplicationScope.mjs";


const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
	Configuration.DEFAULT);

suite("RequirementsTest", () =>
{
	test("assertThatString", () =>
	{
		assert.throws(function()
		{
			const actual = "actual";
			validators.assertThatString(actual, "actual").isEqualTo("expected");
		}, AssertionError);
	});

	test("assertThatArray", () =>
	{
		const actual = [1, 2, 3];
		validators.assertThatArray(actual, "actual").isEqualTo(actual, "expected");
	});

	test("assertThatNumber", () =>
	{
		const actual = 5;
		validators.assertThatNumber(actual, "actual").isEqualTo(actual, "expected");
	});

	test("assertThatSet", () =>
	{
		const actual = new Set([1, 2, 3]);
		validators.assertThatSet(actual, "actual").isEqualTo(actual, "expected");
	});

	test("assertThatMap", () =>
	{
		const actual = new Map([[1, 2], [2, 3]]);
		validators.assertThatMap(actual, "actual").isEqualTo(actual, "expected");
	});

	test("assertThatUrl", () =>
	{
		const actual = new URL("http://www.google.com/");
		validators.assertThatObject(actual, "actual").isEqualTo(actual, "expected");
	});

	test("assertThatObject", () =>
	{
		assert.throws(function()
		{
			const localValidators = validators.copy();

			const actual = {};
			localValidators.assertThatObject(actual, "actual").isEqualTo("expected");
		}, AssertionError);
	});

	test("requireThat.getActual", () =>
	{
		const input = 12345;
		const output = validators.requireThatNumber(input, "input").getValue();
		assert.strictEqual(output, input);
	});

	test("assertThat.getActual", () =>
	{
		const localValidators = validators.copy();

		const actual = 12345;
		const getActual = localValidators.assertThatNumber(actual, "actual").getValue();
		validators.requireThatNumber(actual, "actual").isEqualTo(getActual as number, "getActual()");
	});

	test("putContext", () =>
	{
		const verifiers = validators.withContext("value", "key");
		assert.deepEqual(verifiers.getContext(), new Map([["key", "value"]]));
	});
});