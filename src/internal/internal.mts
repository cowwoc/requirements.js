// Avoid circular dependencies per
// https://medium.com/visual-development/how-to-fix-nasty-circular-dependency-issues-once-and-for-all-in-javascript-typescript-a04c987cf0de
//
// 1. The internal.mts module both imports and exports everything from every local module in the project
// 2. Every other module in the project only imports from the internal.js file, and never directly from other
// files in the project.
// 3. The index.js file is the main entry point and imports and exports everything from internal.js that you
// want to expose to the outside world.
//
// Further, the loading order matters. You have to load internal.js and reorder dependencies repeatedly until
// all circular dependencies are resolved.

import type ExtensibleObjectValidator from "../extension/ExtensibleObjectValidator.mjs";
import type ExtensibleObjectVerifier from "../extension/ExtensibleObjectVerifier.mjs";
import type ObjectValidator from "../ObjectValidator.mjs";
import type ObjectVerifier from "../ObjectVerifier.mjs";
import AbstractObjectValidator from "./extension/AbstractObjectValidator.mjs";
import AbstractObjectVerifier from "./extension/AbstractObjectVerifier.mjs";
import ObjectValidatorImpl from "./ObjectValidatorImpl.mjs";
import ObjectVerifierImpl from "./ObjectVerifierImpl.mjs";
import type ArrayValidator from "../ArrayValidator.mjs";
import type ArrayVerifier from "../ArrayVerifier.mjs";
import ArrayValidatorImpl from "./ArrayValidatorImpl.mjs";
import ArrayVerifierImpl from "./ArrayVerifierImpl.mjs";
import type ClassValidator from "../ClassValidator.mjs";
import type ClassVerifier from "../ClassVerifier.mjs";
import ClassValidatorImpl from "./ClassValidatorImpl.mjs";
import ClassVerifierImpl from "./ClassVerifierImpl.mjs";
import Configuration from "../Configuration.mjs";
import type InetAddressValidator from "../InetAddressValidator.mjs";
import type InetAddressVerifier from "../InetAddressVerifier.mjs";
import InetAddressValidatorImpl from "./InetAddressValidatorImpl.mjs";
import InetAddressVerifierImpl from "./InetAddressVerifierImpl.mjs";
import type MapValidator from "../MapValidator.mjs";
import type MapVerifier from "../MapVerifier.mjs";
import MapValidatorImpl from "./MapValidatorImpl.mjs";
import MapVerifierImpl from "./MapVerifierImpl.mjs";
import type ExtensibleNumberValidator from "../extension/ExtensibleNumberValidator.mjs";
import type ExtensibleNumberVerifier from "../extension/ExtensibleNumberVerifier.mjs";
import type NumberValidator from "../NumberValidator.mjs";
import type NumberVerifier from "../NumberVerifier.mjs";
import AbstractNumberValidator from "./extension/AbstractNumberValidator.mjs";
import NumberValidatorImpl from "./NumberValidatorImpl.mjs";
import AbstractNumberVerifier from "./extension/AbstractNumberVerifier.mjs";
import NumberVerifierImpl from "./NumberVerifierImpl.mjs";
import type BooleanValidator from "../BooleanValidator.mjs";
import type BooleanVerifier from "../BooleanVerifier.mjs";
import BooleanValidatorImpl from "./BooleanValidatorImpl.mjs";
import BooleanVerifierImpl from "./BooleanVerifierImpl.mjs";
import type SetValidator from "../SetValidator.mjs";
import type SetVerifier from "../SetVerifier.mjs";
import SetValidatorImpl from "./SetValidatorImpl.mjs";
import SetVerifierImpl from "./SetVerifierImpl.mjs";
import type StringValidator from "../StringValidator.mjs";
import type StringVerifier from "../StringVerifier.mjs";
import StringValidatorImpl from "./StringValidatorImpl.mjs";
import StringVerifierImpl from "./StringVerifierImpl.mjs";
import {
	TerminalEncoding,
	TerminalEncodings
} from "../TerminalEncoding.mjs";
import ValidationFailure from "../ValidationFailure.mjs";
import Requirements from "../Requirements.mjs";
import AbstractGlobalConfiguration from "./AbstractGlobalConfiguration.mjs";
import AbstractDiffWriter from "./diff/AbstractDiffWriter.mjs";
import AbstractColorWriter from "./diff/AbstractColorWriter.mjs";
import TextOnly from "./diff/TextOnly.mjs";
import ContextGenerator from "./diff/ContextGenerator.mjs";
import ContextLine from "./diff/ContextLine.mjs";
import {
	NEWLINE_MARKER,
	NEWLINE_PATTERN
} from "./diff/DiffConstants.mjs";
import {
	DiffGenerator,
	EOS_MARKER
} from "./diff/DiffGenerator.mjs";
import DiffResult from "./diff/DiffResult.mjs";
import Terminal from "./Terminal.mjs";
import VariableType from "./VariableType.mjs";
import Objects from "./Objects.mjs";
import MainGlobalConfiguration from "./MainGlobalConfiguration.mjs";
import GlobalRequirements from "../GlobalRequirements.mjs";
import Node16Colors from "./diff/Node16Colors.mjs";
import Node16MillionColors from "./diff/Node16MillionColors.mjs";
import Node256Colors from "./diff/Node256Colors.mjs";
import type GlobalConfiguration from "../GlobalConfiguration.mjs";
import IllegalStateError from "./IllegalStateError.mjs";
import TestGlobalConfiguration from "./TestGlobalConfiguration.mjs";
import Maps from "./Maps.mjs";
import SizeValidatorImpl from "./SizeValidatorImpl.mjs";
import Pluralizer from "./Pluralizer.mjs";
import Strings from "./Strings.mjs";

export
{
	ArrayValidatorImpl,
	ArrayVerifierImpl,
	ClassValidatorImpl,
	ClassVerifierImpl,
	SetValidatorImpl,
	SetVerifierImpl,
	StringValidatorImpl,
	StringVerifierImpl,
	TerminalEncoding,
	TerminalEncodings,
	ValidationFailure,
	AbstractGlobalConfiguration,
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
	MainGlobalConfiguration,
	TestGlobalConfiguration,
	Maps,
	MapValidatorImpl,
	MapVerifierImpl,
	AbstractNumberValidator,
	NumberValidatorImpl,
	AbstractNumberVerifier,
	NumberVerifierImpl,
	BooleanValidatorImpl,
	BooleanVerifierImpl,
	Node16Colors,
	Node256Colors,
	Node16MillionColors,
	SizeValidatorImpl,
	Objects,
	AbstractObjectValidator,
	ObjectValidatorImpl,
	AbstractObjectVerifier,
	ObjectVerifierImpl,
	Pluralizer,
	Requirements,
	Strings,
	TextOnly,
	Terminal,
	VariableType
};
export type
{
	GlobalConfiguration,
	ArrayValidator,
	ArrayVerifier,
	ClassValidator,
	ClassVerifier,
	SetValidator,
	SetVerifier,
	StringValidator,
	StringVerifier,
	InetAddressValidator,
	InetAddressVerifier,
	MapValidator,
	MapVerifier,
	ExtensibleNumberValidator,
	ExtensibleNumberVerifier,
	NumberValidator,
	NumberVerifier,
	BooleanValidator,
	BooleanVerifier,
	ExtensibleObjectValidator,
	ExtensibleObjectVerifier,
	ObjectValidator,
	ObjectVerifier
};