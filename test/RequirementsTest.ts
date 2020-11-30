import test from "tape-catch";
import {Requirements} from "../src/index";
import {
	Configuration,
	TerminalEncoding,
	TestGlobalConfiguration
} from "../src/internal/internal";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

test("Verifiers.assertThatString", function(t)
{
	const actual = "actual";
	requirements.assertThat(actual, "actual").isEqualTo("expected");
	t.end();
});

test("Verifiers.assertThatArray", function(t)
{
	const actual = [1, 2, 3];
	requirements.assertThat(actual, "actual").isEqualTo("expected");
	t.end();
});

test("Verifiers.assertThatNumber", function(t)
{
	const actual = 5;
	requirements.assertThat(actual, "actual").isEqualTo("expected");
	t.end();
});

test("Verifiers.assertThatSet", function(t)
{
	const actual = new Set([1, 2, 3]);
	requirements.assertThat(actual, "actual").isEqualTo("expected");
	t.end();
});

test("Verifiers.assertThatMap", function(t)
{
	const actual = new Map([[1, 2], [2, 3]]);
	requirements.assertThat(actual, "actual").isEqualTo("expected");
	t.end();
});

test("Verifiers.assertThatUrl", function(t)
{
	const actual = new URL("http://www.google.com/");
	requirements.assertThat(actual, "actual").isEqualTo("expected");
	t.end();
});

test("Verifiers.withAssertionsEnabled.assertThatObject", function(t)
{
	t.throws(function()
	{
		const actual = {};
		requirements.withAssertionsEnabled().assertThat(actual, "actual").isEqualTo("expected");
	}, RangeError);
	t.end();
});

test("Verifiers.withAssertionsDisabled", function(t)
{
	const actual = {};
	requirements.withAssertionsEnabled().withAssertionsDisabled().assertThat(actual, "actual").
		isEqualTo("expected");
	t.end();
});

test("Verifiers.withAssertionsEnabled.withAssertionsEnabled", function(t)
{
	const verifiers = requirements.withAssertionsEnabled();
	t.equals(verifiers.withAssertionsEnabled(), verifiers);
	t.end();
});

test("Verifiers.withAssertionsDisabled.withAssertionsDisabled", function(t)
{
	const verifiers = requirements.withAssertionsDisabled();
	t.equals(verifiers.withAssertionsDisabled(), verifiers);
	t.end();
});

test("Verifiers.withAssertionsEnabled.isActualAvailable", function(t)
{
	const input = 12345;
	const verifier = requirements.withAssertionsEnabled().assertThat(input, "input");
	t.equals(verifier.isActualAvailable(), true);
	t.equals(verifier.getActual(), input);
	t.end();
});

test("Verifiers.withAssertionsDisabled.isActualAvailable", function(t)
{
	const input = 12345;
	let expected;
	const verifier = requirements.withAssertionsDisabled().assertThat(input, "input");
	t.equals(verifier.isActualAvailable(), false);
	// noinspection JSUnusedAssignment
	t.equals(verifier.getActual(), expected);
	t.end();
});

test("Verifiers.assertionsAreEnabled", function(t)
{
	t.equals(requirements.assertionsAreEnabled(), false);
	t.end();
});

test("Verifiers.putContext", function(t)
{
	const verifiers = requirements.putContext("key", "value");
	t.deepEquals(verifiers.getContext(), new Map([["key", "value"]]));
	t.end();
});
