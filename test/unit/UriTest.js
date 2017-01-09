import registerSuite from "intern!object";
import assert from "intern/chai!assert";
import requireThat from "./Requirements";
import URI from "urijs";

define(function()
{
	registerSuite(
		{
			name: "UriTest",

			asUri: function()
			{
				requireThat("http://host.com/index.html", "actual").asUri();
			},

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
			},

			asString: function()
			{
				const string = "http://host.com/index.html";
				const actual = new URI(string);
				requireThat(actual, "actual").asString().isEqualTo(string);
			},

			getActual: function()
			{
				const input = new URI("http://www.test.com/");
				const output = requireThat(input, "input").getActual();
				assert.equal(output, input);
			}
		});
});