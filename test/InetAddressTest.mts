import {
	Configuration,
	Requirements,
	TerminalEncoding,
	TestGlobalConfiguration
} from "../src/internal/internal.mjs";
import {
	suite,
	test
} from "mocha";
import {assert} from "chai";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

suite("InetAddressTest", () =>
{
	test("asIpAddress_actualIsIpV4", () =>
	{
		const actual = "1.2.3.4";
		requirements.requireThat(actual, "actual").asInetAddress();
	});

	test("asIpAddress_actualIsInvalidIpV4", () =>
	{
		assert.throws(function()
		{
			const actual = "1.256.3.4";
			requirements.requireThat(actual, "actual").asInetAddress();
		}, RangeError);
	});

	test("asIpAddress_actualIsIpV6", () =>
	{
		const actual = "0000:0000:0000:0000:0000:0000:192.168.0.1";
		requirements.requireThat(actual, "actual").asInetAddress();
	});

	test("asIpAddress_endsWithZeroCompression", () =>
	{
		const actual = "0000:0000:0000:0000:192.168.0.1::";
		requirements.requireThat(actual, "actual").asInetAddress();
	});

	test("asIpAddress_multipleZeroCompressions", () =>
	{
		assert.throws(function()
		{
			const actual = "0000::0000::0000:0000:192.168.0.1:";
			requirements.requireThat(actual, "actual").asInetAddress();
		}, RangeError);
	});

	test("isIpV4", () =>
	{
		const actual = "1.2.3.4";
		requirements.requireThat(actual, "actual").asInetAddress().isIpV4();
	});

	test("isIpV4_actualIsV6", () =>
	{
		assert.throws(function()
		{
			const actual = "2001:db8:a0b:12f0::1";
			requirements.requireThat(actual, "actual").asInetAddress().isIpV4();
		}, RangeError);
	});

	test("isIpV6", () =>
	{
		const actual = "2001:db8:a0b:12f0::1";
		requirements.requireThat(actual, "actual").asInetAddress().isIpV6();
	});

	test("isIpV6_actualIsV4", () =>
	{
		assert.throws(function()
		{
			const actual = "1.2.3.4";
			requirements.requireThat(actual, "actual").asInetAddress().isIpV6();
		}, RangeError);
	});

	test("isIpV6_multipleZeroCompressions", () =>
	{
		assert.throws(function()
		{
			const actual = "2001:db8::a0b:12f0::1";
			requirements.requireThat(actual, "actual").asInetAddress().isIpV6();
		}, RangeError);
	});

	test("isIpV6_actualContainsNonHexCharacters", () =>
	{
		assert.throws(function()
		{
			const actual = "2001:gb8:a0b:12f0::1";
			requirements.requireThat(actual, "actual").asInetAddress().isIpV6();
		}, RangeError);
	});

	test("isIpV6_actualHasZeroSuppression", () =>
	{
		const actual = "2001:DB8:0:2F3B:2AA:FF:FE28:9C5A";
		requirements.requireThat(actual, "actual").asInetAddress().isIpV6();
	});

	test("isIpV6_actualHasLeadingZeros", () =>
	{
		const actual = "::0:2F3B:2AA:FF:FE28:9C5A";
		requirements.requireThat(actual, "actual").asInetAddress().isIpV6();
	});

	test("isIpV6_actualHasLeadingColon", () =>
	{
		assert.throws(function()
		{
			const actual = ":0:2F3B:2AA:FF:FE28:9C5A";
			requirements.requireThat(actual, "actual").asInetAddress().isIpV6();
		}, RangeError);
	});

	test("asIpAddress_actualHasTrailingColon", () =>
	{
		assert.throws(function()
		{
			const actual = "0000:0000:0000:0000:0000:0000:192.168.0.1:";
			requirements.requireThat(actual, "actual").asInetAddress();
		}, RangeError);
	});

	test("isHostname", () =>
	{
		const actual = "example.com";
		requirements.requireThat(actual, "actual").asInetAddress().isHostname();
	});

	test("isHostname_actualIsEmpty", () =>
	{
		assert.throws(function()
		{
			const actual = "";
			requirements.requireThat(actual, "actual").asInetAddress().isHostname();
		}, RangeError);
	});

	test("isHostname_actualContainsNonAscii", () =>
	{
		assert.throws(function()
		{
			const actual = "ex@mple.com";
			requirements.requireThat(actual, "actual").asInetAddress().isHostname();
		}, RangeError);
	});

	test("isHostname_actualComponentTooShort", () =>
	{
		assert.throws(function()
		{
			const actual = "example..com";
			requirements.requireThat(actual, "actual").asInetAddress().isHostname();
		}, RangeError);
	});

	test("isHostname_actualComponentTooLong", () =>
	{
		assert.throws(function()
		{
			const actual = "1234567890123456789012345678901234567890123456789012345678901234.com";
			requirements.requireThat(actual, "actual").asInetAddress().isHostname();
		}, RangeError);
	});

	test("isHostname_actualStartsWithHyphen", () =>
	{
		assert.throws(function()
		{
			const actual = "-example.com";
			requirements.requireThat(actual, "actual").asInetAddress().isHostname();
		}, RangeError);
	});

	test("isHostname_actualEndsWithHyphen", () =>
	{
		assert.throws(function()
		{
			const actual = "example-.com";
			requirements.requireThat(actual, "actual").asInetAddress().isHostname();
		}, RangeError);
	});

	test("isHostname_actualIsTooLong", () =>
	{
		let prefix = "";
		// 3x63 characters
		for (let i = 0; i < 3; ++i)
		{
			for (let j = 0; j < 6; ++j)
				prefix += "1234567890";
			prefix += "123.";
		}
		for (let j = 0; j < 5; ++j)
			prefix += "1234567890";
		prefix += "1234567";
		const suffix = ".com";
		let actual = prefix + suffix;

		assert.equal(actual.length, 253);
		requirements.requireThat(actual, "actual").asInetAddress().isHostname();

		assert.throws(function()
		{
			prefix += "c";
			actual = prefix + suffix;
			requirements.requireThat(prefix, "actual").asInetAddress().isHostname();
		}, RangeError);
	});

	test("isHostname_actualIsIpAddress", () =>
	{
		assert.throws(function()
		{
			const actual = "0000:0000:0000:0000:0000:0000:192.168.0.1";
			requirements.requireThat(actual, "actual").asInetAddress().isHostname();
		}, RangeError);
	});

	test("getActual", () =>
	{
		const input = "::0:2F3B:2AA:FF:FE28:9C5A";
		const output = requirements.requireThat(input, "input").getActual();
		assert.equal(output, input);
	});

	test("validateThatNullAsInetAddress", () =>
	{
		const actual = null;
		const expectedMessages = ["actual must contain a valid IP address or hostname.\n" +
		"Actual: null\n" +
		"Type  : null"];
		const actualFailures = requirements.validateThat(actual, "actual").asInetAddress().getFailures();
		const actualMessages = actualFailures.map(failure => failure.getMessage());
		requirements.requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages);
	});
});