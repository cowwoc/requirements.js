/*
 * Copyright (c) 2016 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
/*
 * Copyright (c) 2016 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import {
	type GlobalConfiguration,
	type ProcessScope,
	type ApplicationScope,
	assertThatValueIsNotNull
} from "../internal.mjs";

/**
 * ApplicationScope for the main and test codebases.
 */
abstract class AbstractApplicationScope implements ApplicationScope
{
	public abstract close(): void;

	private readonly parent: ProcessScope;
	/**
	 * The global configuration.
	 */
	private readonly globalConfiguration: GlobalConfiguration;

	/**
	 * Creates a new instance.
	 *
	 * @param parent              - the parent scope
	 * @param globalConfiguration - the global configuration
	 * @throws TypeError if any of the arguments are `null`
	 */
	protected constructor(parent: ProcessScope, globalConfiguration: GlobalConfiguration)
	{
		assertThatValueIsNotNull(parent, "parent");
		assertThatValueIsNotNull(globalConfiguration, "globalConfiguration");
		this.parent = parent;
		this.globalConfiguration = globalConfiguration;
	}

	public getGlobalConfiguration()
	{
		return this.globalConfiguration;
	}

	public getTerminal()
	{
		return this.parent.getTerminal();
	}
}

export {AbstractApplicationScope};