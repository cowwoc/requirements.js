import parseArgs from "minimist";

const env = parseArgs(process.argv.slice(2));
let mode: string;
if (env.mode === undefined)
	mode = "DEBUG";
else
	mode = env.mode as string;

export {mode};