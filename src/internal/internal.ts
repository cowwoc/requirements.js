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

import ObjectValidator from "../ObjectValidator";
import ObjectVerifier from "../ObjectVerifier";
import ObjectValidatorNoOp from "./ObjectValidatorNoOp";
import ObjectVerifierNoOp from "./ObjectVerifierNoOp";
import ArrayValidator from "../ArrayValidator";
import ArrayVerifier from "../ArrayVerifier";
import ClassValidator from "../ClassValidator";
import ClassVerifier from "../ClassVerifier";
import Configuration from "../Configuration";
import InetAddressValidator from "../InetAddressValidator";
import InetAddressVerifier from "../InetAddressVerifier";
import MapValidator from "../MapValidator";
import MapVerifier from "../MapVerifier";
import NumberValidator from "../NumberValidator";
import NumberVerifier from "../NumberVerifier";
import Requirements from "../Requirements";
import SetValidator from "../SetValidator";
import SetVerifier from "../SetVerifier";
import SizeValidator from "../SizeValidator";
import SizeVerifier from "../SizeVerifier";
import StringValidator from "../StringValidator";
import StringVerifier from "../StringVerifier";
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
import NumberValidatorNoOp from "./NumberValidatorNoOp";
import NumberVerifierNoOp from "./NumberVerifierNoOp";
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
	ArrayVerifier,
	ClassValidator,
	ClassVerifier,
	SetValidator,
	SetVerifier,
	SetVerifierNoOp,
	SizeValidator,
	SizeVerifier,
	StringValidator,
	StringVerifier,
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
	InetAddressVerifier,
	InetAddressValidatorNoOp,
	InetAddressVerifierNoOp,
	MainGlobalConfiguration,
	TestGlobalConfiguration,
	Maps,
	MapValidatorNoOp,
	MapValidator,
	MapVerifier,
	NumberValidator,
	NumberVerifier,
	MapVerifierNoOp,
	Node16Colors,
	Node256Colors,
	Node16MillionColors,
	NumberValidatorNoOp,
	NumberVerifierNoOp,
	Objects,
	ObjectValidator,
	ObjectVerifier,
	ObjectValidatorNoOp,
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