import parseArgs from "minimist";

const env = parseArgs(process.argv.slice(2));
let mode = env.mode;
if (typeof (mode) === "undefined")
	mode = "DEBUG";

export {mode};