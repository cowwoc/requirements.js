/**
 * A string denoting the end of a line.
 */
const NEWLINE_MARKER = "\\n";
/**
 * Character denoting the end of string.
 */
const EOS_MARKER = "\\0";
/**
 * A pattern matching newline characters anywhere in a string.
 */
const NEWLINE_PATTERN = /\r?\n/;
/**
 * A pattern matching the end of a line or stream.
 */
const EOL_PATTERN = /\\n|\\0$/;
/**
 * Indicates a character is equal in the actual and expected values.
 */
const DIFF_EQUAL = " ";
/**
 * Indicates a character to delete from the actual value.
 */
const DIFF_DELETE = "-";
/**
 * Indicates a character to insert into the actual value.
 */
const DIFF_INSERT = "+";

export
{
	NEWLINE_MARKER,
	EOS_MARKER,
	NEWLINE_PATTERN,
	EOL_PATTERN,
	DIFF_EQUAL,
	DIFF_DELETE,
	DIFF_INSERT
};