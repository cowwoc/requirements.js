import {
	Configuration,
	ObjectValidator,
	ValidationFailure
} from "./internal/internal";

/**
 * Validates the requirements of a <code>URL</code>.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class UrlValidator extends ObjectValidator
{
	// https://stackoverflow.com/a/19709846/14731
	private static readonly URL_IS_ABSOLUTE = new RegExp("^(?:[a-z]+:)?//", "i");
	private readonly actualUrl: URL;

	constructor(configuration: Configuration, actual: unknown, name: string)
	{
		super(configuration, actual, name);
		this.actualUrl = actual as URL;
	}

	/**
	 * Ensures that the URL is absolute.
	 *
	 * @return {UrlValidator} the updated validator
	 */
	isAbsolute(): this
	{
		if (!UrlValidator.URL_IS_ABSOLUTE.test(this.actualUrl.toString()))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be absolute: " + this.config.convertToString(this.actualUrl));
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the URL is relative.
	 *
	 * @return {UrlValidator} the updated validator
	 */
	isRelative(): this
	{
		if (UrlValidator.URL_IS_ABSOLUTE.test(this.actualUrl.toString()))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be relative: " + this.config.convertToString(this.actualUrl));
			this.failures.push(failure);
		}
		return this;
	}

	getActual(): URL
	{
		return this.actualUrl;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {UrlValidator as default};