define(function(require)
{
	var registerSuite = require('intern!object');
	var assert = require('intern/chai!assert');
	var requireThat = require("Requirements");
	var URI = require("urijs");

	registerSuite(
		{
			name: 'UriTest',

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