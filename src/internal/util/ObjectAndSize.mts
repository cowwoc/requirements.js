/**
 * An object and its size: If the object represents a collection, the size refers to the number of elements it
 * contains. If the object represents a string, the size corresponds to its length.
 *
 * @param value - the object
 * @param size - the value's size
 */
class ObjectAndSize
{
	public object: Map<unknown, unknown> | Set<unknown> | unknown[] | string;
	public size: number;

	/**
	 * Creates a new instance.
	 *
	 * @param object - the object
	 * @param size - the object's size
	 */
	constructor(object: Map<unknown, unknown> | Set<unknown> | unknown[] | string, size: number)
	{
		this.object = object;
		this.size = size;
	}

	toString()
	{
		return `value: ${JSON.stringify(this.object, null, 2)}, size: ${this.size}`;
	}
}

export {ObjectAndSize};