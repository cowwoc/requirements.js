import ObjectVerifier from "./ObjectVerifier";

/**
 * Creates a new ContainerSizeVerifier.
 *
 * @constructor
 * @param {Object} container the container
 * @param {Number} size the size of the container
 * @param {String} containerName the name of the container
 * @param {String} sizeName the name of the container size
 * @param {Pluralizer} pluralizer returns the singular or plural form of the container's element type
 * @param {Configuration} config the instance configuration
 * @author Gili Tzabari
 */
function ContainerSizeVerifier(container, size, containerName, sizeName, pluralizer, config)
{
	Object.defineProperty(this, "container",
		{
			value: container
		});
	Object.defineProperty(this, "size",
		{
			value: size
		});
	Object.defineProperty(this, "containerName",
		{
			value: containerName
		});
	Object.defineProperty(this, "sizeName",
		{
			value: sizeName
		});
	Object.defineProperty(this, "pluralizer",
		{
			value: pluralizer
		});
	Object.defineProperty(this, "config",
		{
			value: config
		});
}
ContainerSizeVerifier.prototype = Object.create(ContainerSizeVerifier.prototype);
ContainerSizeVerifier.prototype.constructor = ContainerSizeVerifier;

ContainerSizeVerifier.prototype.withException = function(exception)
{
	const newConfig = this.config.withException(exception);
	if (newConfig === this.config)
		return this;
	return new ContainerSizeVerifier(this.container, this.size, this.containerName, this.sizeName, this.pluralizer, newConfig);
};

export default ContainerSizeVerifier;