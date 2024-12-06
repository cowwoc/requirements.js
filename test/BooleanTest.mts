import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import {
	TerminalEncoding,
	Configuration,
	Type,
	requireThatBoolean
} from "../src/index.mjs";
import {TestCompiler} from "../scripts/TestCompiler.mjs";
import os from "os";
import {JavascriptValidatorsImpl} from "../src/internal/validator/JavascriptValidatorsImpl.mjs";
import {TestApplicationScope} from "./TestApplicationScope.mjs";


const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
	Configuration.DEFAULT);
const compiler = new TestCompiler();

suite("BooleanTest", () =>
{
	test("isTrue", () =>
	{
		validators.requireThatBoolean(true, "actual").isTrue();
	});

	test("isTrue_False", () =>
	{
		assert.throws(function()
		{
			validators.requireThatBoolean(false, "actual").isTrue();
		}, RangeError);
	});

	test("isFalse", () =>
	{
		validators.requireThatBoolean(false, "actual").isFalse();
	});

	test("isFalse_False", () =>
	{
		assert.throws(function()
		{
			validators.requireThatBoolean(true, "actual").isFalse();
		}, RangeError);
	});

	test("undefinedAsBoolean", () =>
	{
		assert.throws(function()
		{
			let actual;
			requireThatBoolean(actual, "actual").isType(Type.BOOLEAN);
		}, TypeError);
	});

	test("nullAsBoolean", () =>
	{
		const code =
			`import {requireThat} from "./target/publish/node/index.mjs";
			
			const actual = null;
			requireThat(actual, "actual").isFalse();`;
		const messages = compiler.compile(code);
		assert.strictEqual(messages, "test.mts(4,34): error TS2339: Property 'isFalse' does not exist on " +
			"type 'UnknownValidator<null>'." + os.EOL);
	}).timeout(10000);

	test("zeroNumberAsBoolean", () =>
	{
		const code =
			`import {requireThat} from "./target/publish/node/index.mjs";
			
			const actual = 0;
			requireThat(actual, "actual").isFalse();`;
		const messages = compiler.compile(code);
		assert.strictEqual(messages, "test.mts(4,34): error TS2339: Property 'isFalse' does not exist on " +
			"type 'UnknownValidator<number>'." + os.EOL);
	}).timeout(10000);

	test("nonZeroNumberAsBoolean", () =>
	{
		const code =
			`import {requireThat} from "./target/publish/node/index.mjs";
			
			const actual = 1;
			requireThat(actual, "actual").isFalse();`;
		const messages = compiler.compile(code);
		assert.strictEqual(messages, "test.mts(4,34): error TS2339: Property 'isFalse' does not exist on " +
			"type 'UnknownValidator<number>'." + os.EOL);
	}).timeout(10000);

	test("zeroStringAsBoolean", () =>
	{
		const code =
			`import {requireThat} from "./target/publish/node/index.mjs";
			
			const actual = "0";
			requireThat(actual, "actual").isFalse();`;
		const messages = compiler.compile(code);
		assert.strictEqual(messages, "test.mts(4,34): error TS2339: Property 'isFalse' does not exist on " +
			"type 'UnknownValidator<string>'." + os.EOL);
	}).timeout(10000);

	test("nonZeroStringAsBoolean", () =>
	{
		const code =
			`import {requireThat} from "./target/publish/node/index.mjs";
			
			const actual = "1";
			requireThat(actual, "actual").isTrue();`;
		const messages = compiler.compile(code);
		assert.strictEqual(messages, "test.mts(4,34): error TS2339: Property 'isTrue' does not exist on " +
			"type 'UnknownValidator<string>'." + os.EOL);
	}).timeout(10000);

	test("trueStringAsBoolean", () =>
	{
		const code =
			`import {requireThat} from "./target/publish/node/index.mjs";
			
			const actual = "true";
			requireThat(actual, "actual").isTrue();`;
		const messages = compiler.compile(code);
		assert.strictEqual(messages, "test.mts(4,34): error TS2339: Property 'isTrue' does not exist on " +
			"type 'UnknownValidator<string>'." + os.EOL);
	}).timeout(10000);

	test("emptyStringAsBoolean", () =>
	{
		const code =
			`import {requireThat} from "./target/publish/node/index.mjs";
			
			const actual = "";
			requireThat(actual, "actual").isFalse();`;
		const messages = compiler.compile(code);
		assert.strictEqual(messages, "test.mts(4,34): error TS2339: Property 'isFalse' does not exist on " +
			"type 'UnknownValidator<string>'." + os.EOL);
	}).timeout(10000);

	test("falseStringAsBoolean", () =>
	{
		const code =
			`import {requireThat} from "./target/publish/node/index.mjs";
			
			const actual = "false";
			requireThat(actual, "actual").isFalse();`;
		const messages = compiler.compile(code);
		assert.strictEqual(messages, "test.mts(4,34): error TS2339: Property 'isFalse' does not exist on " +
			"type 'UnknownValidator<string>'." + os.EOL);
	}).timeout(10000);

	test("getActual", () =>
	{
		const input = true;
		const output = validators.requireThatBoolean(input, "input").getValue();
		assert.strictEqual(output, input);
	});
});