module.exports = {
	// https://github.com/mochajs/mocha/issues/4726#issuecomment-903213780
	loader: ["ts-node/esm"],
	require: ["ts-node/register", "source-map-support/register.js"],
	reporter: "spec",
	extensions:
		[
			".ts"
		],
	include:
		[
			"**/*.ts"
		],
	"exclude": [
		"**/*.d.ts"
	]
};