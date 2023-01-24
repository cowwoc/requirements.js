import
{
	Configuration,
	TerminalEncoding,
	TestGlobalConfiguration
} from "../src/internal/internal.js";
import {Requirements} from "../src/index.js";
import
{
	suite,
	test
} from "mocha";
import {assert} from "chai";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

suite("RequirementsTest", () =>
{
	test("assertThatString", () =>
	{
		const actual = "actual";
		requirements.assertThat(actual, "actual").isEqualTo("expected");
	});

	test("assertThatArray", () =>
	{
		const actual = [1, 2, 3];
		requirements.assertThat(actual, "actual").isEqualTo("expected");
	});

	test("assertThatNumber", () =>
	{
		const actual = 5;
		requirements.assertThat(actual, "actual").isEqualTo("expected");
	});

	test("assertThatSet", () =>
	{
		const actual = new Set([1, 2, 3]);
		requirements.assertThat(actual, "actual").isEqualTo("expected");
	});

	test("assertThatMap", () =>
	{
		const actual = new Map([[1, 2], [2, 3]]);
		requirements.assertThat(actual, "actual").isEqualTo("expected");
	});

	test("assertThatUrl", () =>
	{
		const actual = new URL("http://www.google.com/");
		requirements.assertThat(actual, "actual").isEqualTo("expected");
	});

	test("withAssertionsEnabled.assertThatObject", () =>
	{
		assert.throws(function()
		{
			const actual = {};
			requirements.withAssertionsEnabled().assertThat(actual, "actual").isEqualTo("expected");
		}, RangeError);
	});

	test("withAssertionsDisabled", () =>
	{
		const actual = {};
		requirements.withAssertionsEnabled().withAssertionsDisabled().assertThat(actual, "actual").
			isEqualTo("expected");
	});

	test("withAssertionsEnabled.withAssertionsEnabled", () =>
	{
		const verifiers = requirements.withAssertionsEnabled();
		assert.equal(verifiers.withAssertionsEnabled(), verifiers);
	});

	test("withAssertionsDisabled.withAssertionsDisabled", () =>
	{
		const verifiers = requirements.withAssertionsDisabled();
		assert.equal(verifiers.withAssertionsDisabled(), verifiers);
	});

	test("withAssertionsEnabled.isActualAvailable", () =>
	{
		const input = 12345;
		const verifier = requirements.withAssertionsEnabled().assertThat(input, "input");
		assert.equal(verifier.isActualAvailable(), true);
		assert.equal(verifier.getActual(), input);
	});

	test("withAssertionsDisabled.isActualAvailable", () =>
	{
		const input = 12345;
		let expected;
		const verifier = requirements.withAssertionsDisabled().assertThat(input, "input");
		assert.equal(verifier.isActualAvailable(), false);
		// noinspection JSUnusedAssignment
		assert.equal(verifier.getActual(), expected);
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