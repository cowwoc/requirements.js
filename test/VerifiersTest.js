import test from "tape-catch";
import Verifiers from "../node/Verifiers";

class IllegalArgumentException extends Error {
}

test("Verifiers.withException()", function(t)
{
	t.throws(function()
	{
		const actual = null;
		new Verifiers().withException(IllegalArgumentException).requireThat(actual, "actual").isNotNull();
	}, IllegalArgumentException);
	t.end();
});

test("Verifiers.withAssertionsDisabled().assertThat", function(t)
{
	const actual = {};
	new Verifiers().assertThat(actual, "actual").isEqualTo("expected");
	t.end();
});

test("Verifiers.withAssertionsEnabled().assertThat", function(t)
{
	t.throws(function()
	{
		const actual = {};
		new Verifiers().withAssertionsEnabled().assertThat(actual, "actual").isEqualTo("expected");
	}, RangeError);
	t.end();
});