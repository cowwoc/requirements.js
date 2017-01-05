define(function(require)
{
	var registerSuite = require('intern!object');
	var assert = require('intern/chai!assert');
	var requireThat = require("Requirements");

	registerSuite(
		{
			name: 'InetAddressTest',

			asIpAddress_actualIsIpV4: function()
			{
				const actual = "1.2.3.4";
				requireThat(actual, "actual").asInetAddress();
			},

			asIpAddress_actualIsIpV6: function()
			{
				const actual = "0000:0000:0000:0000:0000:0000:192.168.0.1";
				requireThat(actual, "actual").asInetAddress();
			},

			asIpAddress_actualIsInvalidIpV4: function()
			{
				assert.throws(function()
				{
					const actual = "1.256.3.4";
					requireThat(actual, "actual").asInetAddress();
				}, RangeError)
			},

			asIpAddress_actualIsInvalidIpV6: function()
			{
				assert.throws(function()
				{
					const actual = "0000:0000:0000:0000:0000:0000:192.168.0.1:";
					requireThat(actual, "actual").asInetAddress();
				}, RangeError)
			},

			asIpAddress_multipleZeroCompressions: function()
			{
				assert.throws(function()
				{
					const actual = "0000::0000::0000:0000:192.168.0.1:";
					requireThat(actual, "actual").asInetAddress();
				}, RangeError)
			},

			isIpV4: function()
			{
				const actual = "1.2.3.4";
				requireThat(actual, "actual").asInetAddress().isIpV4();
			},

			isIpV4_actualIsV6: function()
			{
				assert.throws(function()
				{
					const actual = "2001:db8:a0b:12f0::1";
					requireThat(actual, "actual").asInetAddress().isIpV4();
				}, RangeError)
			},

			isIpV6: function()
			{
				const actual = "2001:db8:a0b:12f0::1";
				requireThat(actual, "actual").asInetAddress().isIpV6();
			},

			isIpV6_actualIsV4: function()
			{
				assert.throws(function()
				{
					const actual = "1.2.3.4";
					requireThat(actual, "actual").asInetAddress().isIpV6();
				}, RangeError)
			},

			isIpV6_multipleZeroCompressions: function()
			{
				assert.throws(function()
				{
					const actual = "2001:db8::a0b:12f0::1";
					requireThat(actual, "actual").asInetAddress().isIpV6();
				}, RangeError)
			},

			isIpV6_actualHasZeroSuppression: function()
			{
				const actual = "2001:DB8:0:2F3B:2AA:FF:FE28:9C5A";
				requireThat(actual, "actual").asInetAddress().isIpV6();
			},

			isIpV6_actualHasLeadingZeros: function()
			{
				const actual = "::0:2F3B:2AA:FF:FE28:9C5A";
				requireThat(actual, "actual").asInetAddress().isIpV6();
			},

			isIpV6_actualHasLeadingColon: function()
			{
				assert.throws(function()
				{
					const actual = ":0:2F3B:2AA:FF:FE28:9C5A";
					requireThat(actual, "actual").asInetAddress().isIpV6();
				}, RangeError)
			}
		});
});