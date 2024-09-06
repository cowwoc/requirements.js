// Avoid circular dependencies per https://stackoverflow.com/a/76717884/14731
//
// 1. The internal.mts module both imports and exports everything from every module in the project.
// 2. Every other module in the project only imports from the internal.js file, and never directly from other
// files in the project.
// 3. The index.js file is the main entry point and imports and exports everything from internal.js that you
// want to expose to the outside world.
//
// internal.js determines the library-wide loading order.
// Dependencies must be loaded before dependents.

import type {ObjectValidator} from "../validator/ObjectValidator.mjs";
import {
	Type,
	TypeCategory
} from "../Type.mjs";
import {
	classExtends,
	assert,
	requireThatValueIsNotNull,
	assertThatValueIsNotNull,
	requireThatType,
	assertThatType,
	requireThatTypeCategory,
	assertThatTypeCategory,
	requireThatInstanceOf,
	assertThatInstanceOf,
	requireThatStringIsNotEmpty,
	assertThatStringIsNotEmpty,
	internalValueToString,
	getSuperclass,
	verifyName,
	quoteString,
	type ElementOf,
	type MapKey,
	type MapValue,
	type ClassConstructor,
	type Comparable,
	type NonUndefinable
} from "./validator/Objects.mjs";
import type {ArrayValidator} from "../validator/ArrayValidator.mjs";
import {
	type ErrorBuilder,
	isErrorBuilder
} from "./validator/ErrorBuilder.mjs";
import type {CollectionComponent} from "../validator/component/CollectionComponent.mjs";
import type {NegativeNumberComponent} from "../validator/component/NegativeNumberComponent.mjs";
import type {PositiveNumberComponent} from "../validator/component/PositiveNumberComponent.mjs";
import type {ZeroNumberComponent} from "../validator/component/ZeroNumberComponent.mjs";
import type {NumberComponent} from "../validator/component/NumberComponent.mjs";
import {AbstractValidator} from "./validator/AbstractValidator.mjs";
import {AbstractCollectionValidator} from "./validator/AbstractCollectionValidator.mjs";
import {ArrayValidatorImpl} from "./validator/ArrayValidatorImpl.mjs";
import {Terminal} from "./validator/Terminal.mjs";
import {type ProcessScope} from "./scope/ProcessScope.mjs";
import {DefaultProcessScope} from "./scope/DefaultProcessScope.mjs";
import type {GlobalConfiguration} from "../GlobalConfiguration.mjs";
import {MainGlobalConfiguration} from "./scope/MainGlobalConfiguration.mjs";
import {StringMappers} from "./StringMappers.mjs";
import {MutableStringMappers} from "./MutableStringMappers.mjs";
import {MutableConfiguration} from "./validator/MutableConfiguration.mjs";
import {AbstractValidators} from "./validator/AbstractValidators.mjs";
import {
	type ApplicationScope,
	isApplicationScope
} from "./scope/ApplicationScope.mjs";
import {AbstractApplicationScope} from "./scope/AbstractApplicationScope.mjs";
import {MainApplicationScope} from "./scope/MainApplicationScope.mjs";
import {Configuration} from "./Configuration.mjs";
import {JavascriptValidatorsImpl} from "./validator/JavascriptValidatorsImpl.mjs";
import {ObjectValidatorImpl} from "./validator/ObjectValidatorImpl.mjs";
import type {MapValidator} from "../validator/MapValidator.mjs";
import {MapValidatorImpl} from "./validator/MapValidatorImpl.mjs";
import type {NumberValidator} from "../validator/NumberValidator.mjs";
import {NumberValidatorImpl} from "./validator/NumberValidatorImpl.mjs";
import type {BooleanValidator} from "../validator/BooleanValidator.mjs";
import {BooleanValidatorImpl} from "./validator/BooleanValidatorImpl.mjs";
import type {SetValidator} from "../validator/SetValidator.mjs";
import {SetValidatorImpl} from "./validator/SetValidatorImpl.mjs";
import type {StringValidator} from "../validator/StringValidator.mjs";
import {StringValidatorImpl} from "./validator/StringValidatorImpl.mjs";
import {
	TerminalEncoding,
	sortByDecreasingRank
} from "../TerminalEncoding.mjs";
import {
	type ValidationFailure,
	isValidationFailure
} from "../ValidationFailure.mjs";
import {ValidationFailures} from "../ValidationFailures.mjs";
import {ValidationFailureImpl} from "./validator/ValidationFailureImpl.mjs";
import {MultipleFailuresError} from "../MultipleFailuresError.mjs";
import {JavascriptValidators} from "../JavascriptValidators.mjs";
import type {JavascriptRequireThat} from "../JavascriptRequireThat.mjs";
import type {JavascriptAssertThat} from "../JavascriptAssertThat.mjs";
import type {JavascriptCheckIf} from "../JavascriptCheckIf.mjs";
import {
	requireThatNumber,
	requireThatBoolean,
	requireThatArray,
	requireThatSet,
	requireThatMap,
	requireThatString,
	requireThatObject,
	assertThatNumber,
	assertThatBoolean,
	assertThatArray,
	assertThatSet,
	assertThatMap,
	assertThatString,
	assertThatObject,
	checkIfNumber,
	checkIfBoolean,
	checkIfArray,
	checkIfSet,
	checkIfMap,
	checkIfString,
	checkIfObject,
	updateConfiguration,
	getContext,
	withContext,
	removeContext
} from "../DefaultJavascriptValidators.mjs";
import {AbstractDiffWriter} from "./message/diff/AbstractDiffWriter.mjs";
import {AbstractColorWriter} from "./message/diff/AbstractColorWriter.mjs";
import {TextOnly} from "./message/diff/TextOnly.mjs";
import {ContextGenerator} from "./message/diff/ContextGenerator.mjs";
import {
	NEWLINE_MARKER,
	EOS_MARKER,
	NEWLINE_PATTERN,
	EOL_PATTERN,
	DIFF_EQUAL,
	DIFF_DELETE,
	DIFF_INSERT
} from "./message/diff/DiffConstants.mjs";
import {DiffGenerator} from "./message/diff/DiffGenerator.mjs";
import {DiffResult} from "./message/diff/DiffResult.mjs";
import {
	isTrueFailed,
	isFalseFailed
} from "./message/BooleanMessages.mjs";
import {Node16Colors} from "./message/diff/Node16Colors.mjs";
import {Node16MillionColors} from "./message/diff/Node16MillionColors.mjs";
import {Node256Colors} from "./message/diff/Node256Colors.mjs";
import {IllegalStateError} from "./util/IllegalStateError.mjs";
import {
	appendToValue,
	sortByKeys
} from "./validator/Maps.mjs";
import {ObjectSizeValidatorImpl} from "./validator/ObjectSizeValidatorImpl.mjs";
import {Pluralizer} from "./validator/Pluralizer.mjs";
import {
	lastConsecutiveIndexOf,
	lastIndexOf,
	containsOnly,
	getMapper,
	valueIsStripped
} from "./util/Strings.mjs";
import type {ConfigurationUpdater} from "./ConfigurationUpdater.mjs";
import {
	type StringMapper,
	isStringMapper,
	INTERNAL_VALUE_TO_STRING
} from "./StringMapper.mjs";
import {AssertionError} from "./util/AssertionError.mjs";
import type {Validators} from "../Validators.mjs";
import type {DiffWriter} from "./message/diff/DiffWriter.mjs";
import type {ColoredDiff} from "./message/diff/ColoredDiff.mjs";
import type {ValidatorComponent} from "../validator/component/ValidatorComponent.mjs";
import {MessageBuilder} from "./message/section/MessageBuilder.mjs";
import {
	objectIsEmpty,
	objectIsNotEmpty
} from "./message/ObjectMessages.mjs";
import {
	numberIsNegative,
	numberIsNotNegative,
	numberIsZero,
	numberIsNotZero,
	numberIsPositive,
	numberIsNotPositive,
	numberIsMultipleOf,
	numberIsNotMultipleOf,
	numberIsWholeNumber,
	numberIsNotWholeNumber,
	numberIsNumber,
	numberIsNotNumber,
	numberIsFinite,
	numberIsInfinite
} from "./message/NumberMessages.mjs";
import {
	comparableIsEqualTo,
	comparableIsLessThan,
	comparableIsLessThanOrEqualTo,
	comparableIsGreaterThanOrEqualTo,
	comparableIsGreaterThan,
	comparableCompareValues,
	isBetweenFailed,
	comparableGetBounds
} from "./message/ComparableMessages.mjs";
import {
	stringIsBlank,
	stringIsNotBlank,
	stringIsTrimmed,
	stringIsStripped,
	stringStartsWith,
	stringDoesNotStartWith,
	stringEndsWith,
	stringDoesNotEndWith,
	stringContains,
	stringDoesNotContain,
	stringDoesNotContainWhitespace,
	stringMatches
} from "./message/StringMessages.mjs";
import {
	messagesIsUndefined,
	messagesIsNotUndefined,
	messagesIsNull,
	messagesIsNotNull,
	messagesConstraint,
	messagesIsEqualTo,
	messagesIsInstanceOf,
	messagesIsNotInstanceOf,
	messagesIsNotEqualTo,
	MINIMUM_LENGTH_FOR_DIFF
} from "./message/ValidatorMessages.mjs";
import type {UnsignedNumberValidator} from "../validator/UnsignedNumberValidator.mjs";
import type {MessageSection} from "./message/section/MessageSection.mjs";
import {ContextSection} from "./message/section/ContextSection.mjs";
import {StringSection} from "./message/section/StringSection.mjs";
import {ObjectAndSize} from "./util/ObjectAndSize.mjs";
import {ValidationTarget} from "./util/ValidationTarget.mjs";
import {Difference} from "./util/Difference.mjs";
import {
	collectionContainsSize,
	collectionSizeIsBetween,
	collectionContains,
	collectionDoesNotContain,
	collectionContainsExactly,
	collectionDoesNotContainExactly,
	collectionContainsAny,
	collectionDoesNotContainAny,
	collectionContainsAll,
	collectionDoesNotContainAll,
	collectionDoesNotContainDuplicates,
	collectionIsSorted,
	collectionContainsSameNullity
} from "./message/CollectionMessages.mjs";
import {
	classIsPrimitive,
	classIsSupertypeOf,
	classIsSubtypeOf
} from "./message/ClassMessages.mjs";
import type {ClassValidator} from "../validator/ClassValidator.mts";

export
{
	AbstractCollectionValidator,
	SetValidatorImpl,
	StringValidatorImpl,
	TerminalEncoding,
	sortByDecreasingRank,
	Configuration,
	ContextGenerator,
	NEWLINE_MARKER,
	EOS_MARKER,
	NEWLINE_PATTERN,
	EOL_PATTERN,
	DIFF_EQUAL,
	DIFF_DELETE,
	DIFF_INSERT,
	AbstractColorWriter,
	AbstractDiffWriter,
	DiffGenerator,
	DiffResult,
	IllegalStateError,
	MainGlobalConfiguration,
	appendToValue,
	sortByKeys,
	MapValidatorImpl,
	NumberValidatorImpl,
	BooleanValidatorImpl,
	Node16Colors,
	Node256Colors,
	Node16MillionColors,
	ObjectSizeValidatorImpl,
	classExtends,
	assert,
	requireThatValueIsNotNull,
	assertThatValueIsNotNull,
	requireThatType,
	assertThatType,
	requireThatTypeCategory,
	assertThatTypeCategory,
	requireThatInstanceOf,
	assertThatInstanceOf,
	requireThatStringIsNotEmpty,
	assertThatStringIsNotEmpty,
	internalValueToString,
	getSuperclass,
	verifyName,
	quoteString,
	AbstractValidators,
	AbstractValidator,
	ObjectValidatorImpl,
	Pluralizer,
	requireThatNumber,
	requireThatBoolean,
	requireThatArray,
	requireThatSet,
	requireThatMap,
	requireThatString,
	requireThatObject,
	assertThatNumber,
	assertThatBoolean,
	assertThatArray,
	assertThatSet,
	assertThatMap,
	assertThatString,
	assertThatObject,
	checkIfNumber,
	checkIfBoolean,
	checkIfArray,
	checkIfSet,
	checkIfMap,
	checkIfString,
	checkIfObject,
	updateConfiguration,
	getContext,
	withContext,
	removeContext,
	lastConsecutiveIndexOf,
	lastIndexOf,
	containsOnly,
	getMapper,
	valueIsStripped,
	TextOnly,
	Terminal,
	Type,
	TypeCategory,
	ArrayValidatorImpl,
	MainApplicationScope,
	JavascriptValidatorsImpl,
	DefaultProcessScope,
	MutableConfiguration,
	AssertionError,
	MutableStringMappers,
	StringMappers,
	MessageBuilder,
	messagesIsInstanceOf,
	messagesIsNotInstanceOf,
	messagesIsNotEqualTo,
	numberIsNegative,
	numberIsNotNegative,
	numberIsZero,
	numberIsNotZero,
	numberIsPositive,
	numberIsNotPositive,
	numberIsMultipleOf,
	numberIsNotMultipleOf,
	numberIsWholeNumber,
	numberIsNotWholeNumber,
	numberIsNumber,
	numberIsNotNumber,
	numberIsFinite,
	numberIsInfinite,
	comparableIsEqualTo,
	comparableIsLessThan,
	comparableIsLessThanOrEqualTo,
	comparableIsGreaterThanOrEqualTo,
	comparableIsGreaterThan,
	comparableCompareValues,
	isBetweenFailed,
	comparableGetBounds,
	isTrueFailed,
	isFalseFailed,
	JavascriptValidators,
	ValidationFailureImpl,
	MultipleFailuresError,
	AbstractApplicationScope,
	isApplicationScope,
	ContextSection,
	StringSection,
	INTERNAL_VALUE_TO_STRING,
	isStringMapper,
	isErrorBuilder,
	ValidationTarget,
	stringIsBlank,
	stringIsNotBlank,
	stringIsTrimmed,
	stringIsStripped,
	stringStartsWith,
	stringDoesNotStartWith,
	stringEndsWith,
	stringDoesNotEndWith,
	stringContains,
	stringDoesNotContain,
	stringDoesNotContainWhitespace,
	stringMatches,
	Difference,
	ObjectAndSize,
	collectionContainsSize,
	collectionSizeIsBetween,
	collectionContains,
	collectionDoesNotContain,
	collectionContainsExactly,
	collectionDoesNotContainExactly,
	collectionContainsAny,
	collectionDoesNotContainAny,
	collectionContainsAll,
	collectionDoesNotContainAll,
	collectionDoesNotContainDuplicates,
	collectionIsSorted,
	collectionContainsSameNullity,
	classIsPrimitive,
	classIsSupertypeOf,
	classIsSubtypeOf,
	messagesIsUndefined,
	messagesIsNotUndefined,
	messagesIsNull,
	messagesIsNotNull,
	objectIsEmpty,
	objectIsNotEmpty,
	messagesConstraint,
	messagesIsEqualTo,
	isValidationFailure,
	ValidationFailures,
	MINIMUM_LENGTH_FOR_DIFF
};
export type
{
	SetValidator,
	StringValidator,
	MapValidator,
	NumberValidator,
	BooleanValidator,
	ObjectValidator,
	ElementOf,
	MapKey,
	MapValue,
	ClassConstructor,
	Comparable,
	NonUndefinable,
	ArrayValidator,
	ConfigurationUpdater,
	Validators,
	DiffWriter,
	ColoredDiff,
	ValidatorComponent,
	UnsignedNumberValidator,
	StringMapper,
	JavascriptRequireThat,
	JavascriptAssertThat,
	JavascriptCheckIf,
	CollectionComponent,
	ErrorBuilder,
	NegativeNumberComponent,
	NumberComponent,
	ZeroNumberComponent,
	PositiveNumberComponent,
	ValidationFailure,
	ProcessScope,
	ApplicationScope,
	GlobalConfiguration,
	MessageSection,
	ClassValidator
};