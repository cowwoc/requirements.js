module.exports = {
	// https://stackoverflow.com/a/78098005/14731
	"node-option": ["import=tsx"],
	require: ["source-map-support/register.js"],
	reporter: "spec",
	extension: ["mts"],
	include: ["**/*.mts"],
	exclude: ["**/*.d.mts"]
};