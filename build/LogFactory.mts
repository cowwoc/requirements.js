import {
	createLogger,
	format,
	Logger,
	transports
} from "winston";

// https://stackoverflow.com/a/63486530/14731
const Reset = "\x1b[0m";
const FgWhite = "\x1b[37m";
const BgRed = "\x1b[41m";

class LogFactory
{
	/**
	 * @param name the name of the logger
	 */
	public static getLogger(name: string): Logger
	{
		return createLogger({
			transports: [new transports.Console()],
			format: format.combine(
				format(info =>
				{
					// https://github.com/winstonjs/winston/issues/1345#issuecomment-393853665
					info.level = info.level.toUpperCase();
					return info;
				})(),
				format.errors({stack: true}),
				format.prettyPrint(),
				format.colorize(),
				format.timestamp({format: "YYYY-MM-DD HH:mm:ss.SSS"}),
				format.printf(({
					               timestamp,
					               level,
					               message,
					               stack
				               }) =>
				{
					if (stack)
						return `${timestamp} ${level} ${FgWhite + BgRed + name + Reset} - ${message}\n${stack}`;
					return `${timestamp} ${level} ${FgWhite + BgRed + name + Reset} - ${message}`;
				})
			)
		});
	}
}

export {LogFactory};