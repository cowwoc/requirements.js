/*
 * Copyright (c) 2016 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */

import {
	Terminal,
	type ProcessScope
} from "../internal.mjs";

/**
 * The default implementation of ProcessScope.
 */
class DefaultProcessScope implements ProcessScope
{
	/**
	 * The singleton instance.
	 */
	public static readonly INSTANCE = new DefaultProcessScope();
	private readonly terminal = new Terminal();

	private constructor()
	{
	}

	public getTerminal()
	{
		return this.terminal;
	}

	public close()
	{
	}
}

export {DefaultProcessScope};