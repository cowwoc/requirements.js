import test from "tape-catch";
import URI from "urijs";
import Verifiers from "../node/Verifiers";

class IllegalArgumentException extends Error {
}

test("Verifiers.withException", function(t)
{
	t.throws(function()
	{
		const actual = null;
		new Verifiers().withException(IllegalArgumentException).requireThat(actual, "actual").isNotNull();
	}, IllegalArgumentException);
	t.end();
});

test("Verifiers.assertThatString", function(t)
{
	const actual = "actual";
	new Verifiers().assertThat(actual, "actual").isEqualTo("expected");
	t.end();
});

test("Verifiers.assertThatArray", function(t)
{
	const actual = [1, 2, 3];
	new Verifiers().assertThat(actual, "actual").isEqualTo("expected");
	t.end();
});

test("Verifiers.assertThatNumber", function(t)
{
	const actual = 5;
	new Verifiers().assertThat(actual, "actual").isEqualTo("expected");
	t.end();
});

test("Verifiers.assertThatSet", function(t)
{
	const actual = new Set([1, 2, 3]);
	new Verifiers().assertThat(actual, "actual").isEqualTo("expected");
	t.end();
});

test("Verifiers.assertThatMap", function(t)
{
	const actual = new Map([[1, 2], [2, 3]]);
	new Verifiers().assertThat(actual, "actual").isEqualTo("expected");
	t.end();
});

test("Verifiers.assertThatUri", function(t)
{
	const actual = new URI("http://www.google.com/");
	new Verifiers().assertThat(actual, "actual").isEqualTo("expected");
	t.end();
});

test("Verifiers.withAssertionsEnabled.assertThatObject", function(t)
{
	t.throws(function()
	{
		const actual = {};
		new Verifiers().withAssertionsEnabled().assertThat(actual, "actual").isEqualTo("expected");
	}, RangeError);
	t.end();
});

test("Verifiers.withAssertionsDisabled", function(t)
{
	const actual = {};
	new Verifiers().withAssertionsEnabled().withAssertionsDisabled().assertThat(actual, "actual").isEqualTo("expected");
	t.end();
});

test("Verifiers.withAssertionsEnabled.withAssertionsEnabled", function(t)
{
	const verifiers = new Verifiers().withAssertionsEnabled();
	t.equals(verifiers.withAssertionsEnabled(), verifiers);
	t.end();
});

test("Verifiers.withAssertionsEnabled.withAssertionsEnabled", function(t)
{
	const verifiers = new Verifiers().withAssertionsEnabled().withAssertionsDisabled();
	t.equals(verifiers.withAssertionsDisabled(), verifiers);
	t.end();
});

test("Verifiers.assertionsAreEnabled", function(t)
{
	t.equals(new Verifiers().assertionsAreEnabled(), false);
	t.end();
});

test("Verifiers.withException", function(t)
{
	const verifiers = new Verifiers().withException(IllegalArgumentException);
	const verifiers2 = verifiers.withException(IllegalArgumentException);
	t.equals(verifiers, verifiers2);
	t.equals(verifiers.getException(), IllegalArgumentException);
	t.end();
});

test("Verifiers.withDefaultException", function(t)
{
	const verifiers = new Verifiers().withException(IllegalArgumentException).withDefaultException();
	const verifiers2 = verifiers.withDefaultException();
	t.equals(verifiers, verifiers2);
	t.equals(verifiers.getException(), null);
	t.end();
});

test("Verifiers.addContext", function(t)
{
	const verifiers = new Verifiers().addContext("key", "value");
	t.deepEquals(verifiers.getContext(), [["key", "value"]]);
	t.end();
});
