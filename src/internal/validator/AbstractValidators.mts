import {
	type GlobalConfiguration,
	Configuration,
	IllegalStateError,
	type ApplicationScope,
	MutableConfiguration,
	type ConfigurationUpdater,
	MutableStringMappers,
	type Validators,
	internalValueToString,
	requireThatValueIsNotNull,
	AssertionError
} from "../internal.mjs";

/**
 * Updates the configuration that will be used by new validators.
 */
class ConfigurationUpdaterImpl implements ConfigurationUpdater
{
	private readonly outer: AbstractValidators<unknown>;
	private readonly setConfiguration: (configuration: Configuration) => void;
	private _allowDiff: boolean;
	private readonly mutableStringMappers: MutableStringMappers;
	private _recordStacktrace: boolean;
	private _errorTransformer: (error: Error) => Error;
	private changed = false;
	private closed = false;

	/**
	 * Creates a new configuration updater.
	 *
	 * @param outer - a reference to the outer class
	 * @param setConfiguration - a method that sets the validator factory's configuration
	 * @throws TypeError if `setConfiguration` is `undefined` or `null`
	 */
	public constructor(outer: AbstractValidators<unknown>,
	                   setConfiguration: (configuration: Configuration) => void)
	{
		this.outer = outer;
		this.setConfiguration = setConfiguration;

		const configuration = outer.getConfiguration();
		this._allowDiff = configuration.allowDiff();
		this.mutableStringMappers = MutableStringMappers.from(configuration.stringMappers());
		this._recordStacktrace = configuration.recordStacktrace();
		this._errorTransformer = configuration.errorTransformer();
	}

	public allowDiff(): boolean;
	public allowDiff(mayDiff: boolean): ConfigurationUpdater
	public allowDiff(allowDiff?: boolean): boolean | ConfigurationUpdater
	{
		this.ensureOpen();
		if (allowDiff === undefined)
			return this._allowDiff;
		if (allowDiff !== this._allowDiff)
		{
			this._allowDiff = allowDiff;
			this.changed = true;
		}
		return this;
	}

	public stringMappers(): MutableStringMappers
	{
		this.ensureOpen();
		return this.mutableStringMappers;
	}

	public recordStacktrace(): boolean;
	public recordStacktrace(recordStacktrace: boolean): ConfigurationUpdater;
	public recordStacktrace(recordStacktrace?: boolean): boolean | ConfigurationUpdater
	{
		this.ensureOpen();
		if (recordStacktrace === undefined)
			return this._recordStacktrace;
		if (recordStacktrace !== this._recordStacktrace)
		{
			this._recordStacktrace = recordStacktrace;
			this.changed = true;
		}
		return this;
	}

	public errorTransformer(): (error: Error) => Error;
	public errorTransformer(errorTransformer: (error: Error) => Error): ConfigurationUpdater;
	public errorTransformer(errorTransformer?: (error: Error) => Error): ((error: Error) => Error) | ConfigurationUpdater
	{
		this.ensureOpen();
		if (errorTransformer === undefined)
			return this._errorTransformer;
		if (errorTransformer !== this._errorTransformer)
		{
			this._errorTransformer = errorTransformer;
			this.changed = true;
		}
		return this;
	}

	/**
	 * @throws IllegalStateError if the updater is closed
	 */
	private ensureOpen(): void
	{
		if (this.closed)
			throw new IllegalStateError("The changes have already been applied");
	}

	public close(): void
	{
		if (this.closed)
			return;
		this.closed = true;
		const oldConfiguration = this.outer.getConfiguration();
		const immutableStringMappers = this.mutableStringMappers.toImmutable();
		this.changed ||= immutableStringMappers !== oldConfiguration.stringMappers();
		if (!this.changed)
			return;
		this.outer.setConfiguration(new Configuration(this._allowDiff, immutableStringMappers,
			this._recordStacktrace, oldConfiguration.throwOnFailure(), this._errorTransformer));
	}

	public toString()
	{
		return `allowDiff: ${this._allowDiff}, stringMappers: ${internalValueToString(
			this.mutableStringMappers)}, recordStacktrace: ${this._recordStacktrace}`;
	}
}

/**
 * @typeParam S - the type of the validator factory
 */
abstract class AbstractValidators<S> implements Validators<S>
{
	/**
	 * A function that converts the thrown error to `AssertionError`.
	 */
	private static readonly CONVERT_TO_ASSERTION_ERROR: (error: Error) => Error =
		error => new AssertionError(error.message, {cause: error});
	protected readonly scope: ApplicationScope;
	private requireThatConfiguration: Configuration;
	private assertThatConfiguration: Configuration;
	private checkIfConfiguration: Configuration;
	protected readonly context = new Map<string, unknown>();

	/**
	 * Creates a new instance.
	 *
	 * @param scope         - the application configuration
	 * @param configuration - the configuration to use for new validators
	 * @throws TypeError if any of the arguments are `undefined` or `null`
	 */
	protected constructor(scope: ApplicationScope, configuration: Configuration)
	{
		this.scope = scope;
		requireThatValueIsNotNull(configuration, "configuration");
		this.requireThatConfiguration = configuration;
		this.assertThatConfiguration = MutableConfiguration.from(configuration).
			errorTransformer(AbstractValidators.CONVERT_TO_ASSERTION_ERROR).toImmutable();
		this.checkIfConfiguration = MutableConfiguration.from(configuration).
			throwOnFailure(false).toImmutable();
	}

	/**
	 * @returns the application configuration
	 */
	public getScope(): ApplicationScope
	{
		return this.scope;
	}

	public getConfiguration(): Configuration
	{
		return this.requireThatConfiguration;
	}

	/**
	 * Returns the configuration for `assertThat` factory methods.
	 *
	 * @returns the configuration for `assertThat` factory methods
	 */
	protected getAssertThatConfiguration(): Configuration
	{
		return this.assertThatConfiguration;
	}

	/**
	 * Returns the configuration for `checkIf` factory methods.
	 *
	 * @returns the configuration for `checkIf` factory methods
	 */
	protected getCheckIfConfiguration(): Configuration
	{
		return this.checkIfConfiguration;
	}

	/**
	 * @returns this
	 */
	protected self(): S
	{
		return this as unknown as S;
	}

	public updateConfiguration(): ConfigurationUpdater;
	public updateConfiguration(updater: (configuration: ConfigurationUpdater) => void): S;
	public updateConfiguration(updater?: (configuration: ConfigurationUpdater) => void): ConfigurationUpdater | S
	{
		if (updater === undefined)
		{
			return new ConfigurationUpdaterImpl(this,
				(newConfig: Configuration) => this.setConfiguration(newConfig));
		}
		const updatableConfiguration = this.updateConfiguration();
		updater(updatableConfiguration);
		updatableConfiguration.close();
		return this.self();
	}

	/**
	 * Returns a configuration updater that sets the validator factory's configuration.
	 *
	 * @param setConfiguration - a method that sets the validator factory's configuration
	 * @returns the configuration updater
	 * @throws TypeError if `setConfiguration` is `null`
	 */
	public updateAndSetConfiguration(setConfiguration: (configuration: Configuration) => void)
	{
		return new ConfigurationUpdaterImpl(this, setConfiguration);
	}

	/**
	 * Set the configuration used by new validators.
	 *
	 * @param configuration - the updated configuration
	 * @throws TypeError if `configuration` is null
	 */
	public setConfiguration(configuration: Configuration): void
	{
		requireThatValueIsNotNull(configuration, "configuration");
		this.requireThatConfiguration = configuration;
		this.assertThatConfiguration = MutableConfiguration.from(configuration).
			errorTransformer(AbstractValidators.CONVERT_TO_ASSERTION_ERROR).toImmutable();
		this.checkIfConfiguration = MutableConfiguration.from(configuration).
			throwOnFailure(false).toImmutable();
	}


	public getContext(): Map<string, unknown>
	{
		return new Map<string, unknown>(this.context);
	}

	public getGlobalConfiguration(): GlobalConfiguration
	{
		return this.scope.getGlobalConfiguration();
	}

	abstract copy(): S;

	abstract removeContext(name: string): S;

	abstract withContext(value: unknown, name: string): S;
}

export {AbstractValidators};