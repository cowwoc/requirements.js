/*
 * Copyright (c) 2019 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import {
	type GlobalConfiguration,
	TerminalEncoding,
	Terminal,
	internalValueToString,
	assertThatValueIsNotNull
} from "../internal.mjs";

/**
 * Default global configuration.
 */
class MainGlobalConfiguration implements GlobalConfiguration
{
	private readonly terminal: Terminal;

	/**
	 * @param terminal - the system configuration
	 * @throws TypeError if `terminal` is not a `Terminal`
	 */
	public constructor(terminal: Terminal)
	{
		assertThatValueIsNotNull(terminal, "terminal");
		this.terminal = terminal;
	}

	public supportedTerminalEncodings(): Set<TerminalEncoding>
	{
		return this.terminal.getSupportedTypes();
	}

	public terminalEncoding(): TerminalEncoding;
	public terminalEncoding(encoding: TerminalEncoding): GlobalConfiguration;
	public terminalEncoding(encoding?: TerminalEncoding): TerminalEncoding | GlobalConfiguration
	{
		if (encoding === undefined)
			return this.terminal.getEncoding();
		if (encoding === null)
			throw new TypeError("encoding may not be null");
		this.terminal.setEncoding(encoding);
		return this;
	}

	public toString()
	{
		return `MainGlobalConfiguration[supportedTerminalEncodings=
${internalValueToString(this.supportedTerminalEncodings())}, terminalEncoding=
${internalValueToString(this.terminalEncoding())}]`;
	}
}

export {MainGlobalConfiguration};