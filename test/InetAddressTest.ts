import test from "tape-catch";
import {
	Configuration,
	Requirements,
	TerminalEncoding,
	TestGlobalConfiguration
} from "../src/internal/internal";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

test("InetAddressTest.asIpAddress_actualIsIpV4", function(t)
{
	const actual = "1.2.3.4";
	requirements.requireThat(actual, "actual").asInetAddress();
	t.end();
});

test("InetAddressTest.asIpAddress_actualIsInvalidIpV4", function(t)
{
	t.throws(function()
	{
		const actual = "1.256.3.4";
		requirements.requireThat(actual, "actual").asInetAddress();
	}, RangeError);
	t.end();
});

test("InetAddressTest.asIpAddress_actualIsIpV6", function(t)
{
	const actual = "0000:0000:0000:0000:0000:0000:192.168.0.1";
	requirements.requireThat(actual, "actual").asInetAddress();
	t.end();
});

test("InetAddressTest.asIpAddress_endsWithZeroCompression", function(t)
{
	const actual = "0000:0000:0000:0000:192.168.0.1::";
	requirements.requireThat(actual, "actual").asInetAddress();
	t.end();
});

test("InetAddressTest.asIpAddress_multipleZeroCompressions", function(t)
{
	t.throws(function()
	{
		const actual = "0000::0000::0000:0000:192.168.0.1:";
		requirements.requireThat(actual, "actual").asInetAddress();
	}, RangeError);
	t.end();
});

test("InetAddressTest.isIpV4", function(t)
{
	const actual = "1.2.3.4";
	requirements.requireThat(actual, "actual").asInetAddress().isIpV4();
	t.end();
});

test("InetAddressTest.isIpV4_actualIsV6", function(t)
{
	t.throws(function()
	{
		const actual = "2001:db8:a0b:12f0::1";
		requirements.requireThat(actual, "actual").asInetAddress().isIpV4();
	}, RangeError);
	t.end();
});

test("InetAddressTest.isIpV6", function(t)
{
	const actual = "2001:db8:a0b:12f0::1";
	requirements.requireThat(actual, "actual").asInetAddress().isIpV6();
	t.end();
});

test("InetAddressTest.isIpV6_actualIsV4", function(t)
{
	t.throws(function()
	{
		const actual = "1.2.3.4";
		requirements.requireThat(actual, "actual").asInetAddress().isIpV6();
	}, RangeError);
	t.end();
});

test("InetAddressTest.isIpV6_multipleZeroCompressions", function(t)
{
	t.throws(function()
	{
		const actual = "2001:db8::a0b:12f0::1";
		requirements.requireThat(actual, "actual").asInetAddress().isIpV6();
	}, RangeError);
	t.end();
});

test("InetAddressTest.isIpV6_actualContainsNonHexCharacters", function(t)
{
	t.throws(function()
	{
		const actual = "2001:gb8:a0b:12f0::1";
		requirements.requireThat(actual, "actual").asInetAddress().isIpV6();
	}, RangeError);
	t.end();
});

test("InetAddressTest.isIpV6_actualHasZeroSuppression", function(t)
{
	const actual = "2001:DB8:0:2F3B:2AA:FF:FE28:9C5A";
	requirements.requireThat(actual, "actual").asInetAddress().isIpV6();
	t.end();
});

test("InetAddressTest.isIpV6_actualHasLeadingZeros", function(t)
{
	const actual = "::0:2F3B:2AA:FF:FE28:9C5A";
	requirements.requireThat(actual, "actual").asInetAddress().isIpV6();
	t.end();
});

test("InetAddressTest.isIpV6_actualHasLeadingColon", function(t)
{
	t.throws(function()
	{
		const actual = ":0:2F3B:2AA:FF:FE28:9C5A";
		requirements.requireThat(actual, "actual").asInetAddress().isIpV6();
	}, RangeError);
	t.end();
});

test("InetAddressTest.asIpAddress_actualHasTrailingColon", function(t)
{
	t.throws(function()
	{
		const actual = "0000:0000:0000:0000:0000:0000:192.168.0.1:";
		requirements.requireThat(actual, "actual").asInetAddress();
	}, RangeError);
	t.end();
});

test("InetAddressTest.isHostname", function(t)
{
	const actual = "example.com";
	requirements.requireThat(actual, "actual").asInetAddress().isHostname();
	t.end();
});

test("InetAddressTest.isHostname_actualIsEmpty", function(t)
{
	t.throws(function()
	{
		const actual = "";
		requirements.requireThat(actual, "actual").asInetAddress().isHostname();
	}, RangeError);
	t.end();
});

test("InetAddressTest.isHostname_actualContainsNonAscii", function(t)
{
	t.throws(function()
	{
		const actual = "ex@mple.com";
		requirements.requireThat(actual, "actual").asInetAddress().isHostname();
	}, RangeError);
	t.end();
});

test("InetAddressTest.isHostname_actualComponentTooShort", function(t)
{
	t.throws(function()
	{
		const actual = "example..com";
		requirements.requireThat(actual, "actual").asInetAddress().isHostname();
	}, RangeError);
	t.end();
});

test("InetAddressTest.isHostname_actualComponentTooLong", function(t)
{
	t.throws(function()
	{
		const actual = "1234567890123456789012345678901234567890123456789012345678901234.com";
		requirements.requireThat(actual, "actual").asInetAddress().isHostname();
	}, RangeError);
	t.end();
});

test("InetAddressTest.isHostname_actualStartsWithHyphen", function(t)
{
	t.throws(function()
	{
		const actual = "-example.com";
		requirements.requireThat(actual, "actual").asInetAddress().isHostname();
	}, RangeError);
	t.end();
});

test("InetAddressTest.isHostname_actualEndsWithHyphen", function(t)
{
	t.throws(function()
	{
		const actual = "example-.com";
		requirements.requireThat(actual, "actual").asInetAddress().isHostname();
	}, RangeError);
	t.end();
});

test("InetAddressTest.isHostname_actualIsTooLong", function(t)
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

	t.equals(actual.length, 253);
	requirements.requireThat(actual, "actual").asInetAddress().isHostname();

	t.throws(function()
	{
		prefix += "c";
		actual = prefix + suffix;
		requirements.requireThat(prefix, "actual").asInetAddress().isHostname();
	}, RangeError);
	t.end();
});

test("InetAddressTest.isHostname_actualIsIpAddress", function(t)
{
	t.throws(function()
	{
		const actual = "0000:0000:0000:0000:0000:0000:192.168.0.1";
		requirements.requireThat(actual, "actual").asInetAddress().isHostname();
	}, RangeError);
	t.end();
});

test("InetAddressTest.getActual", function(t)
{
	const input = "::0:2F3B:2AA:FF:FE28:9C5A";
	const output = requirements.requireThat(input, "input").getActual();
	t.equals(output, input);
	t.end();
});

test("InetAddressTest.validateThatNullAsInetAddress", function(t)
{
	const actual = null;
	const expectedMessages = ["actual must contain a valid IP address or hostname.\n" +
	"Actual: null\n" +
	"Type  : null"];
	const actualFailures = requirements.validateThat(actual, "actual").asInetAddress().getFailures();
	const actualMessages = actualFailures.map(failure => failure.getMessage());
	requirements.requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages);
	t.end();
});