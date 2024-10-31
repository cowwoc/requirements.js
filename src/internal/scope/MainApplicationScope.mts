/*
 * Copyright (c) 2016 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import {
	MainGlobalConfiguration,
	type ProcessScope,
	DefaultProcessScope,
	AbstractApplicationScope
} from "../internal.mjs";

/**
 * ApplicationScope for the main codebase.
 */
class MainApplicationScope extends AbstractApplicationScope
{
	/**
	 * The singleton instance.
	 */
	public static readonly INSTANCE = new MainApplicationScope(DefaultProcessScope.INSTANCE);

	/**
	 * Creates a new application scope.
	 *
	 * @param parent - the parent scope
	 * @throws TypeError if `parent` is null
	 */
	private constructor(parent: ProcessScope)
	{
		super(parent, new MainGlobalConfiguration(parent.getTerminal()));
	}

	public close()
	{
	}
}

export {MainApplicationScope};