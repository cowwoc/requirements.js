import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import {
	Configuration,
	TerminalEncoding,
	requireThat
} from "../src/index.mjs";
import {
	ValidationFailureImpl,
	type ErrorBuilder,
	JavascriptValidatorsImpl,
	StringValidatorImpl,
	MessageBuilder,
	AssertionError
} from "../src/internal/internal.mjs";
import {TestApplicationScope} from "./TestApplicationScope.mjs";

suite("ValidationFailureTest", () =>
{
	test("configurationIsUndefined", () =>
	{
		assert.throws(function()
		{
			let configuration: undefined;
			let errorType: undefined;
			let message: undefined;

			// eslint-disable-next-line no-new
			new ValidationFailureImpl(configuration as unknown as Configuration,
				message as unknown as string, errorType as unknown as ErrorBuilder);
		}, AssertionError);
	});

	test("typeIsUndefined", () =>
	{
		assert.throws(function()
		{
			let type: undefined;
			// eslint-disable-next-line no-new
			new ValidationFailureImpl(Configuration.DEFAULT, "message.", type as unknown as ErrorBuilder);
		}, AssertionError);
	});

	test("messageIsUndefined", () =>
	{
		assert.throws(function()
		{
			let message: undefined;

			// eslint-disable-next-line no-new
			new ValidationFailureImpl(Configuration.DEFAULT, message as unknown as string, RangeError);
		}, TypeError);
	});

	test("addContext", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);
		const validator = validators.requireThat("value", "actual") as StringValidatorImpl;
		const valueNotString = 12345;

		// eslint-disable-next-line no-new
		new ValidationFailureImpl(Configuration.DEFAULT, new MessageBuilder(validator, "message.").
			withContext(valueNotString, "key").toString(), RangeError);
	});

	test("addContext_keyNotString", () =>
	{
		assert.throws(function()
		{
			const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
				Configuration.DEFAULT);
			const validator = validators.requireThat("value", "actual") as StringValidatorImpl;

			const key = null;
			// eslint-disable-next-line no-new
			new ValidationFailureImpl(Configuration.DEFAULT, new MessageBuilder(validator, "message.").
				withContext(key as unknown as string, null as unknown as string).toString(), RangeError);
		}, TypeError);
	});

	test("messageWithoutFormatting", () =>
	{
		const validators = new JavascriptValidatorsImpl(
			new TestApplicationScope(TerminalEncoding.NODE_16_COLORS), Configuration.DEFAULT);
		validators.updateConfiguration(c => c.allowDiff(false));
		const validator = validators.requireThat("value", "actual") as StringValidatorImpl;

		const actual = "int[6]";
		const expected = "int[5]";
		const expectedMessage = `\
"actual" must be equal to "${expected}".
actual: "int[6]"`;
		const expectedMessages = [expectedMessage];

		const actualFailures = validators.checkIf(actual, "actual").
			isEqualTo(expected).elseGetFailures();
		const actualMessages = actualFailures.getFailures().map(failure => failure.getMessage());
		requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages, "expectedMessages");
	});
});