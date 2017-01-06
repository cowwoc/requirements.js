import registerSuite from "intern!object";
import assert from "intern/chai!assert";
import requireThat from "./Requirements";
import URI from "urijs";

define(function()
{
	registerSuite(
		{
			name: "UriTest",

			isAbsolute: function()
			{
				requireThat(new URI("http://host.com/index.html"), "actual").isAbsolute();
			},

			isAbsolute_False: function()
			{
				assert.throws(function()
				{
					requireThat(new URI("../index.html"), "actual").isAbsolute();
				}, RangeError);
			}
		});
});