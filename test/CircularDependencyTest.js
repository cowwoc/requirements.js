import test from "tape-catch";
import TestGlobalConfiguration from "../src/internal/TestGlobalConfiguration";
import TerminalEncoding from "../src/TerminalEncoding";
import Configuration from "../src/Configuration";
import Requirements from "../src/Requirements";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

test("referenceMethodThatGetsAddedLater", function(t)
{
	const value = 123;
	const valueAsString = requirements.requireThat(value, "value").asNumber().asString().getActual();
	t.equals(valueAsString, "123");
	t.end();
});