/*
 * Copyright (c) 2019 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import type {TerminalEncoding} from "./internal/internal.mjs";

/**
 * The configuration shared by all validators. Changes apply to existing or new validators.
 */
interface GlobalConfiguration
{
	/**
	 * Returns the encoding supported by the terminal.
	 *
	 * @returns the encoding supported by the terminal
	 */
	supportedTerminalEncodings(): Set<TerminalEncoding>;

	/**
	 * Returns the current terminal encoding.
	 *
	 * @returns the current terminal encoding (defaults to the auto-detected encoding)
	 */
	terminalEncoding(): TerminalEncoding;

	/**
	 * Sets the terminal encoding of the output.
	 * <p>
	 * This can be used to force the use of ANSI colors when their support is not detected.
	 *
	 * @param encoding - the type of encoding that the terminal supports
	 * @returns this
	 * @throws TypeError if `encoding` is `undefined` or `null`
	 */
	terminalEncoding(encoding: TerminalEncoding): GlobalConfiguration;

	terminalEncoding(encoding?: TerminalEncoding): TerminalEncoding | GlobalConfiguration;
}

export type {GlobalConfiguration};