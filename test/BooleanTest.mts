import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import {
	Configuration,
	TerminalEncoding,
	Requirements,
	requireThat
} from "../src/index.mjs";
import {TestGlobalConfiguration} from "./TestGlobalConfiguration.mjs";
import {TestCompiler} from "./TestCompiler.mjs";
import os from "os";
import parseArgs from "minimist";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

const env = parseArgs(process.argv.slice(2));
let mode = env.mode;
if (typeof (mode) === "undefined")
	mode = "DEBUG";
let compiler: TestCompiler | undefined;
if (mode === "DEBUG")
	compiler = undefined;
else
	compiler = new TestCompiler();

suite("BooleanTest", () =>
{
	test("isTrue", () =>
	{
		requirements.requireThat(true, "actual").isTrue();
	});

	test("isTrue_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(false, "actual").isTrue();
		}, RangeError);
	});

	test("isFalse", () =>
	{
		requirements.requireThat(false, "actual").isFalse();
	});

	test("isFalse_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(true, "actual").isFalse();
		}, RangeError);
	});

	test("undefinedAsBoolean", () =>
	{
		assert.throws(function()
		{
			let actual;
			requireThat(actual, "actual").isBoolean();
		}, RangeError);
	});

	test("nullAsBoolean", () =>
	{
		if (!compiler)
			return;
		const code =
			`import {requireThat} from "./target/publish/node/index.mjs";
			
			const actual = null;
			requireThat(actual, "actual").isFalse();`;
		const messages = compiler.compile(code);
		assert.equal(messages, "test.mts(4,34): error TS2339: Property 'isFalse' does not exist on " +
			"type 'ObjectVerifier<null>'." + os.EOL);
	}).timeout(5000);

	test("zeroNumberAsBoolean", () =>
	{
		if (!compiler)
			return;
		const code =
			`import {requireThat} from "./target/publish/node/index.mjs";
			
			const actual = 0;
			requireThat(actual, "actual").isFalse();`;
		const messages = compiler.compile(code);
		assert.equal(messages, "test.mts(4,34): error TS2339: Property 'isFalse' does not exist on " +
			"type 'NumberVerifier'." + os.EOL);
	}).timeout(5000);

	test("nonZeroNumberAsBoolean", () =>
	{
		if (!compiler)
			return;
		const code =
			`import {requireThat} from "./target/publish/node/index.mjs";
			
			const actual = 1;
			requireThat(actual, "actual").isFalse();`;
		const messages = compiler.compile(code);
		assert.equal(messages, "test.mts(4,34): error TS2339: Property 'isFalse' does not exist on " +
			"type 'NumberVerifier'." + os.EOL);
	}).timeout(5000);

	test("zeroStringAsBoolean", () =>
	{
		if (!compiler)
			return;
		const code =
			`import {requireThat} from "./target/publish/node/index.mjs";
			
			const actual = "0";
			requireThat(actual, "actual").isFalse();`;
		const messages = compiler.compile(code);
		assert.equal(messages, "test.mts(4,34): error TS2339: Property 'isFalse' does not exist on " +
			"type 'StringVerifier'." + os.EOL);
	}).timeout(5000);

	test("nonZeroStringAsBoolean", () =>
	{
		if (!compiler)
			return;
		const code =
			`import {requireThat} from "./target/publish/node/index.mjs";
			
			const actual = "1";
			requireThat(actual, "actual").isTrue();`;
		const messages = compiler.compile(code);
		assert.equal(messages, "test.mts(4,34): error TS2339: Property 'isTrue' does not exist on " +
			"type 'StringVerifier'." + os.EOL);
	}).timeout(5000);

	test("trueStringAsBoolean", () =>
	{
		if (!compiler)
			return;
		const code =
			`import {requireThat} from "./target/publish/node/index.mjs";
			
			const actual = "true";
			requireThat(actual, "actual").isTrue();`;
		const messages = compiler.compile(code);
		assert.equal(messages, "test.mts(4,34): error TS2339: Property 'isTrue' does not exist on " +
			"type 'StringVerifier'." + os.EOL);
	}).timeout(5000);

	test("emptyStringAsBoolean", () =>
	{
		if (!compiler)
			return;
		const code =
			`import {requireThat} from "./target/publish/node/index.mjs";
			
			const actual = "";
			requireThat(actual, "actual").isFalse();`;
		const messages = compiler.compile(code);
		assert.equal(messages, "test.mts(4,34): error TS2339: Property 'isFalse' does not exist on " +
			"type 'StringVerifier'." + os.EOL);
	}).timeout(5000);

	test("falseStringAsBoolean", () =>
	{
		if (!compiler)
			return;
		const code =
			`import {requireThat} from "./target/publish/node/index.mjs";
			
			const actual = "false";
			requireThat(actual, "actual").isFalse();`;
		const messages = compiler.compile(code);
		assert.equal(messages, "test.mts(4,34): error TS2339: Property 'isFalse' does not exist on " +
			"type 'StringVerifier'." + os.EOL);
	}).timeout(5000);

	test("getActual", () =>
	{
		const input = true;
		const output = requirements.requireThat(input, "input").getActual();
		assert.equal(output, input);
	});
});