import ContainerSizeVerifier from "./ContainerSizeVerifier";
import ExceptionBuilder from "./ExceptionBuilder";
import InetAddress from "./InetAddressVerifier";
import ObjectVerifier from "./ObjectVerifierSuperclass";
import Pluralizer from "./Pluralizer";
import URI from "urijs";
import UriVerifier from "./UriVerifier";
import Utilities from "./Utilities";

// See http://stackoverflow.com/a/9209720/14731
const INTERNET_ADDRESS = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^(?:(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){6})(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:::(?:(?:(?:[0-9a-fA-F]{1,4})):){5})(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})))?::(?:(?:(?:[0-9a-fA-F]{1,4})):){4})(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,1}(?:(?:[0-9a-fA-F]{1,4})))?::(?:(?:(?:[0-9a-fA-F]{1,4})):){3})(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,2}(?:(?:[0-9a-fA-F]{1,4})))?::(?:(?:(?:[0-9a-fA-F]{1,4})):){2})(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,3}(?:(?:[0-9a-fA-F]{1,4})))?::(?:(?:[0-9a-fA-F]{1,4})):)(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,4}(?:(?:[0-9a-fA-F]{1,4})))?::)(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,5}(?:(?:[0-9a-fA-F]{1,4})))?::)(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,6}(?:(?:[0-9a-fA-F]{1,4})))?::))))$/;

/**
 * Verifies a {@code String}.
 *
 * @class
 * @author Gili Tzabari
 */
class StringVerifier extends ObjectVerifier {
	/**
	 * Ensures that the actual value starts with a value.
	 *
	 * @param {String} prefix the value that the string must start with
	 * @return {StringVerifier} this
	 * @throws {RangeError} if the actual value does not start with {@code prefix}
	 */
	startsWith(prefix)
	{
		if (this.actual.startsWith(prefix))
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must start with \"" + Utilities.toString(prefix) +
			"\".").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value does not start with a value.
	 *
	 * @param {String} prefix the value that the string may not start with
	 * @return {StringVerifier} this
	 * @throws {RangeError} if the actual value does not start with {@code prefix}
	 */
	doesNotStartWith(prefix)
	{
		if (!this.actual.startsWith(prefix))
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not start with \"" +
			Utilities.toString(prefix) + "\".").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value ends with a value.
	 *
	 * @param {String} suffix the value that the string must end with
	 * @return {StringVerifier} this
	 * @throws {RangeError} if the actual value does not end with {@code suffix}
	 */
	endsWith(suffix)
	{
		if (this.actual.endsWith(suffix))
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must end with \"" + Utilities.toString(suffix) +
			"\".").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value does not end with a value.
	 *
	 * @param {String} suffix the value that the string may not end with
	 * @return {StringVerifier} this
	 * @throws {RangeError} if the actual value does not start with {@code suffix}
	 */
	doesNotEndWith(suffix)
	{
		if (!this.actual.endsWith(suffix))
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not end with \"" + Utilities.toString(
				suffix) +
			"\".").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the value is an empty string.
	 *
	 * @return {StringVerifier} this
	 * @throws {RangeError} if the value is not an empty string
	 */
	isEmpty()
	{
		if (this.actual.length === 0)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be empty.").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the value is not an empty string.
	 *
	 * @return {StringVerifier} this
	 * @throws {RangeError} if the value is an empty string
	 */
	isNotEmpty()
	{
		if (this.actual.length > 0)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not be empty").
			build();
	}

	/**
	 * Trims whitespace at the beginning and end of the actual value.
	 *
	 * @return {StringVerifier} a verifier for the trimmed representation of the actual value
	 */
	trim()
	{
		const trimmed = this.actual.trim();
		if (trimmed === this.actual)
			return this;
		return new StringVerifier(this.config, trimmed, this.name);
	}

	/**
	 * @param {Function} consumer a function that accepts a {@code StringVerifier} for the trimmed representation of the
	 *   string
	 * @return {StringVerifier} this
	 * @throws {TypeError} if {@code consumer} is not set
	 */
	trimConsumer(consumer)
	{
		this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
		consumer(this.trim());
		return this;
	}

	/**
	 * @return {ContainerSizeVerifier} a verifier for the length of the string
	 */
	length()
	{
		return new ContainerSizeVerifier(this.config, this.actual, this.actual.length, this.name, this.name + ".length",
			Pluralizer.CHARACTER);
	}

	/**
	 * @param {Function} consumer a function that accepts a {@code ContainerSizeVerifier} for the length of the string
	 * @return {StringVerifier} this
	 * @throws {TypeError} if {@code consumer} is not set
	 */
	lengthConsumer(consumer)
	{
		this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
		consumer(this.length());
		return this;
	}

	/**
	 * @return {StringVerifier} this
	 */
	asString()
	{
		return this;
	}

	/**
	 * @param {Function} consumer a function that accepts {@code this}
	 * @return {StringVerifier} this
	 * @throws {TypeError} if {@code consumer} is not set
	 */
	asStringConsumer(consumer)
	{
		this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
		consumer(this);
		return this;
	}

	/**
	 * @return {InetAddressVerifier} a verifier for the value's Internet address representation
	 * @throws {RangeError} if the actual value does not contain a valid Internet address format
	 */
	asInetAddress()
	{
		if (INTERNET_ADDRESS.test(this.actual))
			return new InetAddress(this.config, this.actual, this.name);
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain a valid IP address or hostname.").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * @param {Function} consumer a function that accepts an {@code InetAddressVerifier} for the value's Internet address
	 * representation
	 * @return {StringVerifier} this
	 * @throws {TypeError} if {@code consumer} is not set
	 * @throws {RangeError} if the actual value does not contain a valid Internet address format
	 */
	asInetAddressConsumer(consumer)
	{
		this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
		consumer(this.asInetAddress());
		return this;
	}

	/**
	 * @return {UriVerifier} a verifier for the value's URI representation
	 */
	asUri()
	{
		return new UriVerifier(this.config, new URI(this.actual), this.name);
	}

	/**
	 * @param {Function} consumer a function that accepts a {@code UriVerifier} for the value's Internet address
	 * representation
	 * @return {StringVerifier} this
	 * @throws {TypeError} if {@code consumer} is not set
	 */
	asUriConsumer(consumer)
	{
		this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
		consumer(this.asUri());
		return this;
	}
}

export default StringVerifier;