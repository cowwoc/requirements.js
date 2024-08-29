/*
 * Copyright (c) 2016 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import type {Terminal} from "../internal.mjs";

/**
 * The process configuration.
 */
interface ProcessScope
{
	/**
	 * @returns the terminal attached to the process
	 */
	getTerminal(): Terminal;

	/**
	 * Closes the scope.
	 */
	close(): void;
}

export type {ProcessScope};