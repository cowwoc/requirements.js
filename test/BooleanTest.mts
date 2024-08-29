import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import {
	TerminalEncoding,
	requireThat,
	Configuration,
	Type
} from "../src/index.mjs";
import {TestCompiler} from "../build/TestCompiler.mjs";
import os from "os";
import {mode} from "../build/mode.mjs";
import {JavascriptValidatorsImpl} from "../src/internal/validator/JavascriptValidatorsImpl.mjs";
import {TestApplicationScope} from "./TestApplicationScope.mjs";


const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
	Configuration.DEFAULT);

let compiler: TestCompiler | undefined;
if (mode === "DEBUG")
	compiler = undefined;
else
	compiler = new TestCompiler();

suite("BooleanTest", () =>
{
	test("isTrue", () =>
	{
		validators.requireThat(true, "actual").isTrue();
	});

	test("isTrue_False", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(false, "actual").isTrue();
		}, RangeError);
	});

	test("isFalse", () =>
	{
		validators.requireThat(false, "actual").isFalse();
	});

	test("isFalse_False", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(true, "actual").isFalse();
		}, RangeError);
	});

	test("undefinedAsBoolean", () =>
	{
		assert.throws(function()
		{
			let actual;
			requireThat(actual, "actual").isType(Type.BOOLEAN);
		}, TypeError);
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
		assert.strictEqual(messages, "test.mts(4,34): error TS2339: Property 'isFalse' does not exist on " +
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
		assert.strictEqual(messages, "test.mts(4,34): error TS2339: Property 'isFalse' does not exist on " +
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
		assert.strictEqual(messages, "test.mts(4,34): error TS2339: Property 'isFalse' does not exist on " +
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
		assert.strictEqual(messages, "test.mts(4,34): error TS2339: Property 'isFalse' does not exist on " +
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
		assert.strictEqual(messages, "test.mts(4,34): error TS2339: Property 'isTrue' does not exist on " +
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
		assert.strictEqual(messages, "test.mts(4,34): error TS2339: Property 'isTrue' does not exist on " +
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
		assert.strictEqual(messages, "test.mts(4,34): error TS2339: Property 'isFalse' does not exist on " +
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
		assert.strictEqual(messages, "test.mts(4,34): error TS2339: Property 'isFalse' does not exist on " +
			"type 'StringVerifier'." + os.EOL);
	}).timeout(5000);

	test("getActual", () =>
	{
		const input = true;
		const output = validators.requireThat(input, "input").getValue();
		assert.strictEqual(output, input);
	});
});