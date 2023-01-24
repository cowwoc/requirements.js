// Avoid circular dependencies per
// https://medium.com/visual-development/how-to-fix-nasty-circular-dependency-issues-once-and-for-all-in-javascript-typescript-a04c987cf0de
//
// 1. The internal.js module both imports and exports everything from every local module in the project
// 2. Every other module in the project only imports from the internal.js file, and never directly from other
// files in the project.
// 3. The index.js file is the main entry point and imports and exports everything from internal.js that you
// want to expose to the outside world.
//
// Further, the loading order matters. You have to load internal.js and reorder dependencies repeatedly until
// all circular dependencies are resolved.

import type ExtensibleObjectValidator from "../extension/ExtensibleObjectValidator.js";
import type ExtensibleObjectAsserter from "../extension/ExtensibleObjectAsserter.js";
import type ExtensibleObjectVerifier from "../extension/ExtensibleObjectVerifier.js";
import type ObjectValidator from "../ObjectValidator.js";
import type ObjectAsserter from "../ObjectAsserter.js";
import type ObjectVerifier from "../ObjectVerifier.js";
import AbstractObjectValidator from "./extension/AbstractObjectValidator.js";
import AbstractObjectVerifier from "./extension/AbstractObjectVerifier.js";
import ObjectValidatorImpl from "./ObjectValidatorImpl.js";
import ObjectVerifierImpl from "./ObjectVerifierImpl.js";
import AbstractObjectValidatorNoOp from "./extension/AbstractObjectValidatorNoOp.js";
import AbstractObjectAsserterNoOp from "./extension/AbstractObjectAsserterNoOp.js";
import ObjectValidatorNoOp from "./ObjectValidatorNoOp.js";
import ObjectAsserterNoOp from "./ObjectAsserterNoOp.js";
import type ArrayValidator from "../ArrayValidator.js";
import type ArrayAsserter from "../ArrayAsserter.js";
import type ArrayVerifier from "../ArrayVerifier.js";
import ArrayValidatorImpl from "./ArrayValidatorImpl.js";
import ArrayVerifierImpl from "./ArrayVerifierImpl.js";
import type ClassValidator from "../ClassValidator.js";
import type ClassAsserter from "../ClassAsserter.js";
import type ClassVerifier from "../ClassVerifier.js";
import ClassValidatorImpl from "./ClassValidatorImpl.js";
import ClassVerifierImpl from "./ClassVerifierImpl.js";
import Configuration from "../Configuration.js";
import type InetAddressValidator from "../InetAddressValidator.js";
import type InetAddressAsserter from "../InetAddressAsserter.js";
import type InetAddressVerifier from "../InetAddressVerifier.js";
import InetAddressValidatorImpl from "./InetAddressValidatorImpl.js";
import InetAddressVerifierImpl from "./InetAddressVerifierImpl.js";
import type MapValidator from "../MapValidator.js";
import type MapAsserter from "../MapAsserter.js";
import type MapVerifier from "../MapVerifier.js";
import MapValidatorImpl from "./MapValidatorImpl.js";
import MapVerifierImpl from "./MapVerifierImpl.js";
import type ExtensibleNumberValidator from "../extension/ExtensibleNumberValidator.js";
import type ExtensibleNumberAsserter from "../extension/ExtensibleNumberAsserter.js";
import type ExtensibleNumberVerifier from "../extension/ExtensibleNumberVerifier.js";
import type NumberValidator from "../NumberValidator.js";
import type NumberAsserter from "../NumberAsserter.js";
import type NumberVerifier from "../NumberVerifier.js";
import AbstractNumberValidator from "./extension/AbstractNumberValidator.js";
import NumberValidatorImpl from "./NumberValidatorImpl.js";
import AbstractNumberVerifier from "./extension/AbstractNumberVerifier.js";
import NumberVerifierImpl from "./NumberVerifierImpl.js";
import type BooleanValidator from "../BooleanValidator.js";
import type BooleanAsserter from "../BooleanAsserter.js";
import type BooleanVerifier from "../BooleanVerifier.js";
import BooleanValidatorImpl from "./BooleanValidatorImpl.js";
import BooleanVerifierImpl from "./BooleanVerifierImpl.js";
import type SetValidator from "../SetValidator.js";
import type SetAsserter from "../SetAsserter.js";
import type SetVerifier from "../SetVerifier.js";
import SetValidatorImpl from "./SetValidatorImpl.js";
import SetVerifierImpl from "./SetVerifierImpl.js";
import type StringValidator from "../StringValidator.js";
import type StringAsserter from "../StringAsserter.js";
import type StringVerifier from "../StringVerifier.js";
import StringValidatorImpl from "./StringValidatorImpl.js";
import StringVerifierImpl from "./StringVerifierImpl.js";
import
{
	TerminalEncoding,
	TerminalEncodings
} from "../TerminalEncoding.js";
import ValidationFailure from "../ValidationFailure.js";
import Requirements from "../Requirements.js";
import AbstractGlobalConfiguration from "./AbstractGlobalConfiguration.js";
import ArrayValidatorNoOp from "./ArrayValidatorNoOp.js";
import ArrayAsserterNoOp from "./ArrayAsserterNoOp.js";
import ClassValidatorNoOp from "./ClassValidatorNoOp.js";
import ClassAsserterNoOp from "./ClassAsserterNoOp.js";
import AbstractDiffWriter from "./diff/AbstractDiffWriter.js";
import AbstractColorWriter from "./diff/AbstractColorWriter.js";
import TextOnly from "./diff/TextOnly.js";
import ContextGenerator from "./diff/ContextGenerator.js";
import ContextLine from "./diff/ContextLine.js";
import
{
	NEWLINE_MARKER,
	NEWLINE_PATTERN
} from "./diff/DiffConstants.js";
import
{
	DiffGenerator,
	EOS_MARKER
} from "./diff/DiffGenerator.js";
import DiffResult from "./diff/DiffResult.js";
import Terminal from "./Terminal.js";
import VariableType from "./VariableType.js";
import Objects from "./Objects.js";
import MainGlobalConfiguration from "./MainGlobalConfiguration.js";
import GlobalRequirements from "../GlobalRequirements.js";
import Node16Colors from "./diff/Node16Colors.js";
import Node16MillionColors from "./diff/Node16MillionColors.js";
import Node256Colors from "./diff/Node256Colors.js";
import type GlobalConfiguration from "../GlobalConfiguration.js";
import IllegalStateError from "./IllegalStateError.js";
import InetAddressValidatorNoOp from "./InetAddressValidatorNoOp.js";
import InetAddressAsserterNoOp from "./InetAddressAsserterNoOp.js";
import TestGlobalConfiguration from "./TestGlobalConfiguration.js";
import Maps from "./Maps.js";
import MapValidatorNoOp from "./MapValidatorNoOp.js";
import MapAsserterNoOp from "./MapAsserterNoOp.js";
import AbstractNumberValidatorNoOp from "./extension/AbstractNumberValidatorNoOp.js";
import NumberValidatorNoOp from "./NumberValidatorNoOp.js";
import AbstractNumberAsserterNoOp from "./extension/AbstractNumberAsserterNoOp.js";
import NumberAsserterNoOp from "./NumberAsserterNoOp.js";
import SizeValidatorImpl from "./SizeValidatorImpl.js";
import BooleanValidatorNoOp from "./BooleanValidatorNoOp.js";
import BooleanAsserterNoOp from "./BooleanAsserterNoOp.js";
import Pluralizer from "./Pluralizer.js";
import SetValidatorNoOp from "./SetValidatorNoOp.js";
import SetAsserterNoOp from "./SetAsserterNoOp.js";
import Strings from "./Strings.js";
import StringValidatorNoOp from "./StringValidatorNoOp.js";
import StringAsserterNoOp from "./StringAsserterNoOp.js";

export
{
	ArrayValidatorImpl,
	ArrayVerifierImpl,
	ClassValidatorImpl,
	ClassVerifierImpl,
	SetValidatorImpl,
	SetVerifierImpl,
	SetAsserterNoOp,
	StringValidatorImpl,
	StringVerifierImpl,
	TerminalEncoding,
	TerminalEncodings,
	ValidationFailure,
	AbstractGlobalConfiguration,
	ArrayValidatorNoOp,
	ArrayAsserterNoOp,
	ClassAsserterNoOp,
	ClassValidatorNoOp,
	Configuration,
	ContextGenerator,
	ContextLine,
	NEWLINE_MARKER,
	NEWLINE_PATTERN,
	AbstractColorWriter,
	AbstractDiffWriter,
	DiffGenerator,
	EOS_MARKER,
	DiffResult,
	GlobalRequirements,
	IllegalStateError,
	InetAddressValidatorImpl,
	InetAddressVerifierImpl,
	InetAddressValidatorNoOp,
	InetAddressAsserterNoOp,
	MainGlobalConfiguration,
	TestGlobalConfiguration,
	Maps,
	MapValidatorNoOp,
	MapValidatorImpl,
	MapVerifierImpl,
	AbstractNumberValidator,
	NumberValidatorImpl,
	AbstractNumberVerifier,
	NumberVerifierImpl,
	BooleanValidatorImpl,
	BooleanVerifierImpl,
	MapAsserterNoOp,
	Node16Colors,
	Node256Colors,
	Node16MillionColors,
	AbstractNumberValidatorNoOp,
	NumberValidatorNoOp,
	AbstractNumberAsserterNoOp,
	NumberAsserterNoOp,
	SizeValidatorImpl,
	BooleanValidatorNoOp,
	BooleanAsserterNoOp,
	Objects,
	AbstractObjectValidator,
	ObjectValidatorImpl,
	AbstractObjectVerifier,
	ObjectVerifierImpl,
	AbstractObjectValidatorNoOp,
	ObjectValidatorNoOp,
	AbstractObjectAsserterNoOp,
	ObjectAsserterNoOp,
	Pluralizer,
	Requirements,
	SetValidatorNoOp,
	Strings,
	StringValidatorNoOp,
	StringAsserterNoOp,
	TextOnly,
	Terminal,
	VariableType
};
export type
{
	GlobalConfiguration,
	ArrayValidator,
	ArrayAsserter,
	ArrayVerifier,
	ClassValidator,
	ClassAsserter,
	ClassVerifier,
	SetValidator,
	SetAsserter,
	SetVerifier,
	StringValidator,
	StringAsserter,
	StringVerifier,
	InetAddressValidator,
	InetAddressAsserter,
	InetAddressVerifier,
	MapValidator,
	MapAsserter,
	MapVerifier,
	ExtensibleNumberValidator,
	ExtensibleNumberAsserter,
	ExtensibleNumberVerifier,
	NumberValidator,
	NumberAsserter,
	NumberVerifier,
	BooleanValidator,
	BooleanAsserter,
	BooleanVerifier,
	ExtensibleObjectValidator,
	ExtensibleObjectAsserter,
	ExtensibleObjectVerifier,
	ObjectValidator,
	ObjectAsserter,
	ObjectVerifier
};