import type URI from "urijs";
import {
	Configuration,
	ObjectValidator,
	ValidationFailure
} from "./internal/internal";

/**
 * Validates the requirements of a <code>URI</code>.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class UriValidator extends ObjectValidator
{
	private readonly actualUri: URI;

	constructor(configuration: Configuration, actual: unknown, name: string)
	{
		super(configuration, actual, name);
		this.actualUri = actual as URI;
	}

	/**
	 * Ensures that the URI is absolute.
	 *
	 * @return {UriValidator} the updated validator
	 */
	isAbsolute(): this
	{
		if (!this.actualUri.is("absolute"))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be absolute: " + this.config.convertToString(this.actualUri));
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the URI is relative.
	 *
	 * @return {UriValidator} the updated validator
	 */
	isRelative(): this
	{
		if (!this.actualUri.is("relative"))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be relative: " + this.config.convertToString(this.actualUri));
			this.failures.push(failure);
		}
		return this;
	}

	getActual(): URI
	{
		return this.actualUri;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {UriValidator as default};