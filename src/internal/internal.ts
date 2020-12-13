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
import AbstractObjectValidator from "./extension/AbstractObjectValidator";
import type ObjectValidator from "../ObjectValidator";
import ObjectValidatorImpl from "./ObjectValidatorImpl";
import type ExtensibleObjectVerifier from "../extension/ExtensibleObjectVerifier";
import AbstractObjectVerifier from "./extension/AbstractObjectVerifier";
import type ObjectVerifier from "../ObjectVerifier";
import ObjectVerifierImpl from "./ObjectVerifierImpl";
import AbstractObjectValidatorNoOp from "./extension/AbstractObjectValidatorNoOp";
import ObjectValidatorNoOp from "./ObjectValidatorNoOp";
import AbstractObjectVerifierNoOp from "./extension/AbstractObjectVerifierNoOp";
import ObjectVerifierNoOp from "./ObjectVerifierNoOp";
import type ArrayValidator from "../ArrayValidator";
import ArrayValidatorImpl from "./ArrayValidatorImpl";
import type ArrayVerifier from "../ArrayVerifier";
import ArrayVerifierImpl from "./ArrayVerifierImpl";
import type ClassValidator from "../ClassValidator";
import ClassValidatorImpl from "./ClassValidatorImpl";
import type ClassVerifier from "../ClassVerifier";
import ClassVerifierImpl from "./ClassVerifierImpl";
import Configuration from "../Configuration";
import type InetAddressValidator from "../InetAddressValidator";
import InetAddressValidatorImpl from "./InetAddressValidatorImpl";
import type InetAddressVerifier from "../InetAddressVerifier";
import InetAddressVerifierImpl from "./InetAddressVerifierImpl";
import type MapValidator from "../MapValidator";
import MapValidatorImpl from "./MapValidatorImpl";
import type MapVerifier from "../MapVerifier";
import MapVerifierImpl from "./MapVerifierImpl";
import type ExtensibleNumberValidator from "../extension/ExtensibleNumberValidator";
import AbstractNumberValidator from "./extension/AbstractNumberValidator";
import type NumberValidator from "../NumberValidator";
import NumberValidatorImpl from "./NumberValidatorImpl";
import type ExtensibleNumberVerifier from "../extension/ExtensibleNumberVerifier";
import AbstractNumberVerifier from "./extension/AbstractNumberVerifier";
import type NumberVerifier from "../NumberVerifier";
import NumberVerifierImpl from "./NumberVerifierImpl";
import type BooleanValidator from "../BooleanValidator";
import BooleanValidatorImpl from "./BooleanValidatorImpl";
import type BooleanVerifier from "../BooleanVerifier";
import BooleanVerifierImpl from "./BooleanVerifierImpl";
import Requirements from "../Requirements";
import type SetValidator from "../SetValidator";
import SetValidatorImpl from "./SetValidatorImpl";
import type SetVerifier from "../SetVerifier";
import SetVerifierImpl from "./SetVerifierImpl";
import type SizeValidator from "../SizeValidator";
import SizeValidatorImpl from "./SizeValidatorImpl";
import type SizeVerifier from "../SizeVerifier";
import SizeVerifierImpl from "./SizeVerifierImpl";
import type StringValidator from "../StringValidator";
import StringValidatorImpl from "./StringValidatorImpl";
import type StringVerifier from "../StringVerifier";
import StringVerifierImpl from "./StringVerifierImpl";
import {
	TerminalEncoding,
	TerminalEncodings
} from "../TerminalEncoding";
import ValidationFailure from "../ValidationFailure";
import AbstractGlobalConfiguration from "./AbstractGlobalConfiguration";
import ArrayValidatorNoOp from "./ArrayValidatorNoOp";
import ArrayVerifierNoOp from "./ArrayVerifierNoOp";
import ClassValidatorNoOp from "./ClassValidatorNoOp";
import ClassVerifierNoOp from "./ClassVerifierNoOp";
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
import InetAddressVerifierNoOp from "./InetAddressVerifierNoOp";
import TestGlobalConfiguration from "./TestGlobalConfiguration";
import Maps from "./Maps";
import MapValidatorNoOp from "./MapValidatorNoOp";
import MapVerifierNoOp from "./MapVerifierNoOp";
import AbstractNumberValidatorNoOp from "./extension/AbstractNumberValidatorNoOp";
import NumberValidatorNoOp from "./NumberValidatorNoOp";
import AbstractNumberVerifierNoOp from "./extension/AbstractNumberVerifierNoOp";
import NumberVerifierNoOp from "./NumberVerifierNoOp";
import BooleanValidatorNoOp from "./BooleanValidatorNoOp";
import BooleanVerifierNoOp from "./BooleanVerifierNoOp";
import Pluralizer from "./Pluralizer";
import SetValidatorNoOp from "./SetValidatorNoOp";
import SetVerifierNoOp from "./SetVerifierNoOp";
import SizeValidatorNoOp from "./SizeValidatorNoOp";
import SizeVerifierNoOp from "./SizeVerifierNoOp";
import Strings from "./Strings";
import StringValidatorNoOp from "./StringValidatorNoOp";
import StringVerifierNoOp from "./StringVerifierNoOp";

export {
	ArrayValidator,
	ArrayValidatorImpl,
	ArrayVerifier,
	ArrayVerifierImpl,
	ClassValidator,
	ClassValidatorImpl,
	ClassVerifier,
	ClassVerifierImpl,
	SetValidator,
	SetValidatorImpl,
	SetVerifier,
	SetVerifierImpl,
	SetVerifierNoOp,
	SizeValidator,
	SizeValidatorImpl,
	SizeVerifier,
	SizeVerifierImpl,
	StringValidator,
	StringValidatorImpl,
	StringVerifier,
	StringVerifierImpl,
	TerminalEncoding,
	TerminalEncodings,
	ValidationFailure,
	AbstractGlobalConfiguration,
	ArrayValidatorNoOp,
	ArrayVerifierNoOp,
	ClassVerifierNoOp,
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
	InetAddressValidator,
	InetAddressValidatorImpl,
	InetAddressVerifier,
	InetAddressVerifierImpl,
	InetAddressValidatorNoOp,
	InetAddressVerifierNoOp,
	MainGlobalConfiguration,
	TestGlobalConfiguration,
	Maps,
	MapValidatorNoOp,
	MapValidator,
	MapValidatorImpl,
	MapVerifier,
	MapVerifierImpl,
	ExtensibleNumberValidator,
	AbstractNumberValidator,
	NumberValidator,
	NumberValidatorImpl,
	ExtensibleNumberVerifier,
	AbstractNumberVerifier,
	NumberVerifier,
	NumberVerifierImpl,
	BooleanValidator,
	BooleanValidatorImpl,
	BooleanVerifier,
	BooleanVerifierImpl,
	MapVerifierNoOp,
	Node16Colors,
	Node256Colors,
	Node16MillionColors,
	AbstractNumberValidatorNoOp,
	NumberValidatorNoOp,
	AbstractNumberVerifierNoOp,
	NumberVerifierNoOp,
	BooleanValidatorNoOp,
	BooleanVerifierNoOp,
	Objects,
	ExtensibleObjectValidator,
	AbstractObjectValidator,
	ObjectValidator,
	ObjectValidatorImpl,
	ExtensibleObjectVerifier,
	AbstractObjectVerifier,
	ObjectVerifier,
	ObjectVerifierImpl,
	AbstractObjectValidatorNoOp,
	ObjectValidatorNoOp,
	AbstractObjectVerifierNoOp,
	ObjectVerifierNoOp,
	Pluralizer,
	Requirements,
	SetValidatorNoOp,
	SizeValidatorNoOp,
	SizeVerifierNoOp,
	Strings,
	StringValidatorNoOp,
	StringVerifierNoOp,
	TextOnly,
	Terminal
};
export type {GlobalConfiguration};