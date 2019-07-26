import test from "tape-catch";
import {requireThat} from "../src/DefaultRequirements.js";

test("referenceMethodThatGetsAddedLater", function(t)
{
	const value = 123;
	const valueAsString = requireThat(value, "value").asNumber().asString().getActual();
	t.equals(valueAsString, "123");
	t.end();
});