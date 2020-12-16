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

import type ExtensibleObjectValidator from "../extension/ExtensibleObjectValidator";
import type ExtensibleObjectAsserter from "../extension/ExtensibleObjectAsserter";
import type ExtensibleObjectVerifier from "../extension/ExtensibleObjectVerifier";
import type ObjectValidator from "../ObjectValidator";
import type ObjectAsserter from "../ObjectAsserter";
import type ObjectVerifier from "../ObjectVerifier";
import AbstractObjectValidator from "./extension/AbstractObjectValidator";
import AbstractObjectVerifier from "./extension/AbstractObjectVerifier";
import ObjectValidatorImpl from "./ObjectValidatorImpl";
import ObjectVerifierImpl from "./ObjectVerifierImpl";
import AbstractObjectValidatorNoOp from "./extension/AbstractObjectValidatorNoOp";
import AbstractObjectAsserterNoOp from "./extension/AbstractObjectAsserterNoOp";
import ObjectValidatorNoOp from "./ObjectValidatorNoOp";
import ObjectAsserterNoOp from "./ObjectAsserterNoOp";
import type ArrayValidator from "../ArrayValidator";
import type ArrayAsserter from "../ArrayAsserter";
import type ArrayVerifier from "../ArrayVerifier";
import ArrayValidatorImpl from "./ArrayValidatorImpl";
import ArrayVerifierImpl from "./ArrayVerifierImpl";
import type ClassValidator from "../ClassValidator";
import type ClassAsserter from "../ClassAsserter";
import type ClassVerifier from "../ClassVerifier";
import ClassValidatorImpl from "./ClassValidatorImpl";
import ClassVerifierImpl from "./ClassVerifierImpl";
import Configuration from "../Configuration";
import type InetAddressValidator from "../InetAddressValidator";
import type InetAddressAsserter from "../InetAddressAsserter";
import type InetAddressVerifier from "../InetAddressVerifier";
import InetAddressValidatorImpl from "./InetAddressValidatorImpl";
import InetAddressVerifierImpl from "./InetAddressVerifierImpl";
import type MapValidator from "../MapValidator";
import type MapAsserter from "../MapAsserter";
import type MapVerifier from "../MapVerifier";
import MapValidatorImpl from "./MapValidatorImpl";
import MapVerifierImpl from "./MapVerifierImpl";
import type ExtensibleNumberValidator from "../extension/ExtensibleNumberValidator";
import type ExtensibleNumberAsserter from "../extension/ExtensibleNumberAsserter";
import type ExtensibleNumberVerifier from "../extension/ExtensibleNumberVerifier";
import type NumberValidator from "../NumberValidator";
import type NumberAsserter from "../NumberAsserter";
import type NumberVerifier from "../NumberVerifier";
import AbstractNumberValidator from "./extension/AbstractNumberValidator";
import NumberValidatorImpl from "./NumberValidatorImpl";
import AbstractNumberVerifier from "./extension/AbstractNumberVerifier";
import NumberVerifierImpl from "./NumberVerifierImpl";
import type BooleanValidator from "../BooleanValidator";
import type BooleanAsserter from "../BooleanAsserter";
import type BooleanVerifier from "../BooleanVerifier";
import BooleanValidatorImpl from "./BooleanValidatorImpl";
import BooleanVerifierImpl from "./BooleanVerifierImpl";
import type SetValidator from "../SetValidator";
import type SetAsserter from "../SetAsserter";
import type SetVerifier from "../SetVerifier";
import SetValidatorImpl from "./SetValidatorImpl";
import SetVerifierImpl from "./SetVerifierImpl";
import type StringValidator from "../StringValidator";
import type StringAsserter from "../StringAsserter";
import type StringVerifier from "../StringVerifier";
import StringValidatorImpl from "./StringValidatorImpl";
import StringVerifierImpl from "./StringVerifierImpl";
import {
	TerminalEncoding,
	TerminalEncodings
} from "../TerminalEncoding";
import ValidationFailure from "../ValidationFailure";
import Requirements from "../Requirements";
import AbstractGlobalConfiguration from "./AbstractGlobalConfiguration";
import ArrayValidatorNoOp from "./ArrayValidatorNoOp";
import ArrayAsserterNoOp from "./ArrayAsserterNoOp";
import ClassValidatorNoOp from "./ClassValidatorNoOp";
import ClassAsserterNoOp from "./ClassAsserterNoOp";
import AbstractDiffWriter from "./diff/AbstractDiffWriter";
import AbstractColorWriter from "./diff/AbstractColorWriter";
import TextOnly from "./diff/TextOnly";
import ContextGenerator from "./diff/ContextGenerator";
import ContextLine from "./diff/ContextLine";
import {
	NEWLINE_MARKER,
	NEWLINE_PATTERN
} from "./diff/DiffConstants";
import {
	DiffGenerator,
	EOS_MARKER
} from "./diff/DiffGenerator";
import DiffResult from "./diff/DiffResult";
import Terminal from "./Terminal";
import Objects from "./Objects";
import MainGlobalConfiguration from "./MainGlobalConfiguration";
import GlobalRequirements from "../GlobalRequirements";
import Node16Colors from "./diff/Node16Colors";
import Node16MillionColors from "./diff/Node16MillionColors";
import Node256Colors from "./diff/Node256Colors";
import type GlobalConfiguration from "../GlobalConfiguration";
import IllegalStateError from "./IllegalStateError";
import InetAddressValidatorNoOp from "./InetAddressValidatorNoOp";
import InetAddressAsserterNoOp from "./InetAddressAsserterNoOp";
import TestGlobalConfiguration from "./TestGlobalConfiguration";
import Maps from "./Maps";
import MapValidatorNoOp from "./MapValidatorNoOp";
import MapAsserterNoOp from "./MapAsserterNoOp";
import AbstractNumberValidatorNoOp from "./extension/AbstractNumberValidatorNoOp";
import NumberValidatorNoOp from "./NumberValidatorNoOp";
import AbstractNumberAsserterNoOp from "./extension/AbstractNumberAsserterNoOp";
import NumberAsserterNoOp from "./NumberAsserterNoOp";
import SizeValidatorImpl from "./SizeValidatorImpl";
import BooleanValidatorNoOp from "./BooleanValidatorNoOp";
import BooleanAsserterNoOp from "./BooleanAsserterNoOp";
import Pluralizer from "./Pluralizer";
import SetValidatorNoOp from "./SetValidatorNoOp";
import SetAsserterNoOp from "./SetAsserterNoOp";
import Strings from "./Strings";
import StringValidatorNoOp from "./StringValidatorNoOp";
import StringAsserterNoOp from "./StringAsserterNoOp";

export {
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
	Terminal
};
export type {
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