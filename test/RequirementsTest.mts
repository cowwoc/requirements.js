import {
	Requirements,
	Configuration,
	TerminalEncoding
} from "../src/index.mjs";
import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import {TestGlobalConfiguration} from "./TestGlobalConfiguration.mjs";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

suite("RequirementsTest", () =>
{
	test("assertThatString", () =>
	{
		const actual = "actual";
		requirements.assertThat(r => r.requireThat(actual, "actual").isEqualTo("expected"));
	});

	test("assertThatArray", () =>
	{
		const actual = [1, 2, 3];
		requirements.assertThat(r => r.requireThat(actual, "actual").isEqualTo(actual, "expected"));
	});

	test("assertThatNumber", () =>
	{
		const actual = 5;
		requirements.assertThat(r => r.requireThat(actual, "actual").isEqualTo(actual, "expected"));
	});

	test("assertThatSet", () =>
	{
		const actual = new Set([1, 2, 3]);
		requirements.assertThat(r => r.requireThat(actual, "actual").isEqualTo(actual, "expected"));
	});

	test("assertThatMap", () =>
	{
		const actual = new Map([[1, 2], [2, 3]]);
		requirements.assertThat(r => r.requireThat(actual, "actual").isEqualTo(actual, "expected"));
	});

	test("assertThatUrl", () =>
	{
		const actual = new URL("http://www.google.com/");
		requirements.assertThat(r => r.requireThat(actual, "actual").isEqualTo(actual, "expected"));
	});

	test("withAssertionsEnabled.assertThatObject", () =>
	{
		assert.throws(function()
		{
			const actual = {};
			requirements.withAssertionsEnabled().assertThat(r => r.requireThat(actual, "actual").
				isEqualTo("expected"));
		}, RangeError);
	});

	test("withAssertionsDisabled", () =>
	{
		const actual = {};
		requirements.withAssertionsEnabled().withAssertionsDisabled().assertThat(r =>
			r.requireThat(actual, "actual").isEqualTo("expected"));
	});

	test("withAssertionsEnabled.withAssertionsEnabled", () =>
	{
		assert.equal(requirements, requirements.withAssertionsEnabled());
	});

	test("withAssertionsDisabled.withAssertionsDisabled", () =>
	{
		assert.equal(requirements, requirements.withAssertionsDisabled());
	});

	test("requireThat.getActual", () =>
	{
		const input = 12345;
		const output = requirements.requireThat(input, "input").getActual();
		assert.equal(output, input);
	});

	test("assertThat_assertionsEnabled", () =>
	{
		const actual = 12345;
		const expected = 54321;
		assert.throws(() =>
		{
			requirements.copy().withAssertionsEnabled().assertThat(r =>
				r.requireThat(actual, "actual").isEqualTo(expected, "expected"));
		}, RangeError);
	});

	test("assertThat_assertionsDisabled", () =>
	{
		const actual = 12345;
		const expected = 54321;
		requirements.copy().withAssertionsDisabled().assertThat(r =>
			r.requireThat(actual, "actual").isEqualTo(expected, "expected"));
	});

	test("assertThat.getActual_assertionsEnabled", () =>
	{
		const actual = 12345;
		const getActual = requirements.copy().withAssertionsEnabled().assertThatAndReturn(r =>
			r.requireThat(actual, "actual").getActual());
		requirements.requireThat(actual, "actual").isEqualTo(getActual as number, "getActual()");
	});

	test("assertThat.getActual_assertionsDisabled", () =>
	{
		const actual = 12345;
		const getActual = requirements.copy().withAssertionsDisabled().assertThatAndReturn(r =>
			r.requireThat(actual, "actual").getActual());
		requirements.requireThat(actual, "actual").isNotEqualTo(getActual as number, "getActual()");
		requirements.requireThat(getActual, "getActual").isUndefined();
	});

	test("assertionsAreEnabled", () =>
	{
		assert.equal(requirements.assertionsAreEnabled(), false);
	});

	test("putContext", () =>
	{
		const verifiers = requirements.putContext("key", "value");
		assert.deepEqual(verifiers.getContext(), new Map([["key", "value"]]));
	});
});