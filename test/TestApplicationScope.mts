/*
 * Copyright (c) 2016 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import {TerminalEncoding} from "../src/index.mjs";
import {
	DefaultProcessScope,
	AbstractApplicationScope
} from "../src/internal/internal.mjs";
import {TestGlobalConfiguration} from "./TestGlobalConfiguration.mjs";

/**
 * ApplicationScope for the test codebase.
 */
class TestApplicationScope extends AbstractApplicationScope
{
	/**
	 * Creates a new application scope.
	 *
	 * @param terminalEncoding - the type of encoding that validators should output
	 * @throws TypeError if `terminalEncoding` is null
	 */
	public constructor(terminalEncoding: TerminalEncoding)
	{
		super(DefaultProcessScope.INSTANCE, new TestGlobalConfiguration(terminalEncoding));
	}

	public close()
	{
	}
}

export {TestApplicationScope};