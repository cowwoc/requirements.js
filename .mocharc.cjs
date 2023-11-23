module.exports = {
	// https://github.com/mochajs/mocha/issues/4726#issuecomment-903213780
	loader: ["ts-node/esm"],
	require: ["ts-node/register", "source-map-support/register.js"],
	reporter: "spec",
	extensions:
		[
			".mts"
		],
	include:
		[
			"**/*.mts"
		],
	exclude: [
		"**/*.d.mts"
	]
	// slow: 0
};