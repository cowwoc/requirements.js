Minor updates involving cosmetic changes have been omitted from this list. See
https://github.com/cowwoc/requirements.java/commits/master for a full list.

## Version 4.0.6 - 2024/11/04

* Improvements
  * `size().isEqualTo()` and `isNotEqualTo()` now include the array value in the exception context.

## Version 4.0.5 - 2024/10/31

* Breaking changes:
  * Replaced `validateThat()` with `checkIf()`.
  * Validation methods now contain the type of value being validated (e.g. `requireThatString()` instead of
    `requireThat()`). This is the only way to ensure that the return type of the method matches the
    compile-time type of the value being validated.
  * Use consistent parameter ordering across the entire API: `(value, name)`.
    * Adding contextual information now looks like this: `requireThat().withContext(value, name)`
  * Added `Validator.and(validation: (validator: S) => void)` to nest validations.
  * Replaced `isBetweenClosed(min, max)` with `isBetween(min, true, max, true)`.
  * Removed ability to configure validators in order to simplify API.
  * Renamed `StringValidator.isInteger()` to `asPrimitiveInteger()` and `isCharacter()`
    to `asPrimitiveCharacter()`.
  * Replaced `Validator.elseGetMessages()` with `Validator.getFailures().getMessages()`.
  * Replaced `Validator.elseGetException()` with `Validator.getFailures().getException()`.
  * Dropped the `isOneOf()` and `isNotOneOf()` functionality yet again. I haven't figured out a good
    design for this yet.
* New features:
  * Added `validationFailed()` and `getValueOrDefault()` to all validators.
  * Added `StringValidator.doesNotContainWhitespace()`.
  * Added `StringValidator.matches(regex)`.
  * Replaced `ClassValidator.isSupertypeOf()`, `isSubtypeOf()` with `Type.isSupertypeOf()`.
* Improvements
  * If `checkIf()` cannot run validations due to a null value, the expected conditions are still reported.

## Version 3.4.0 - 2023/12/04

* Breaking changes: The following `ObjectVerifier` methods now throw `TypeError` instead of `RangeError` if
  the actual
  value does not have the desired type:
  * `isNull()`
  * `isNotNull()`
  * `isDefined()`
  * `isUndefined()`
  * `isDefinedAndNotNull`
  * `isUndefinedOrNull`
  * `isBoolean()`
  * `isNumber()`
  * `isString()`
  * `isInetAddress()`
  * `isClass()`
  * `isArray()`
  * `isSet()`
  * `isMap()`
  * `isPrimitive()`
  * `isTypeOf()`
  * `isInstanceOf()`

## Version 3.3.3 - 2023/12/04

* Bugfix: 3.3.2 release was missing browser files.

## Version 3.3.2 - 2023/11/30

* Bugfix: Assertions were being thrown if class names were changed code minifiers.

## Version 3.3.1 - 2023/11/29

* Bugfix: Output ESM format to browsers instead of IIFE.

## Version 3.3.0 - 2023/11/29

* Breaking changes
  * Removed methods that transform the actual value, such as asString() or trim().
    Users are expected to handle this outside the library.
  * Removed consumer methods not used to validate class properties (e.g., asStringConsumer()).
  * Renamed isNotDefined() to isUndefined().
  * Renamed isNotFinite() to isInfinite().
  * Removed all deprecated method declarations.

## Version 3.2.3 - 2023/11/23

* Improvements
  * isNull() changes the compile-time type of T to `null`.
  * isNotNull() changes the compile-time type of T to not `null`.

## Version 3.2.2 - 2023/11/23

* Improvement: getActual() now returns a specific type instead of `unknown`.

## Version 3.2.1 - 2023/07/19

* Breaking changes:
  * Migrated from default to named-exports to improve documentation and code-complete discoverability.
* Bugfix: Documentation was missing all the interfaces.
* Removed all babel dependencies.

* ## Version 3.2.0 - 2023/07/18

* Breaking changes:
  * Dropped support for CommonJS.
  * Replaced `Requirements.assertThat(actual, name)` by
    `assertThat(requirements -> requirements.requireThat(actual, name))` and
    `assertThatAndReturn(requirements -> requirements.requireThat(actual, name))`.
    The latter is used for assertions with a return value.
    This change improves the runtime performance of `assertThat()` and reduces code duplication across
    the library.
  * Removed `Object.isActualAvailable()` in favor of `Requirements.assumeThatEnabled()`.
  * `Requirements` no longer returns copies on modification. Added `Requirements.copy()` to facilitate old
    behavior.
* Documentation: Migrated from JSDoc to Typedoc.
* Build: Migrated from yarn to pnpm.

## Version 3.1.1 - 2023/01/27

* Documentation fixes

## Version 3.1.0 - 2023/01/27

* Breaking changes
  * Changed the meaning of `ObjectValidator/Verifier.isTypeOf()`'s parameters.
    * `type` now expects values returned by `typeof()`.

## Version 3.0.3 - 2021/05/27

* Security fixes

## Version 3.0.2 - 2021/04/01

* Security fixes

## Version 3.0.1 - 2021/04/01

* Improvements
  * Added ObjectValidator/Verifier.asBoolean().
  * Added ObjectValidator/Verifier.isActualAvailable().
  * Added StringValidator/Verifier.isTrimmed().
  * Use interfaces to hide whether we return a normal or no-op implementation of a validator or verifier.

## Version 3.0.0 - 2020/12/05

* Breaking changes
  * Removed URI (https://medialize.github.io/URI.js/) in favor of built-in URL.
  * Because built-in URL is always absolute, all corresponding validators were removed.

## Version 2.1.0 - 2020/10/27

* Improvements
  * Converted code to typescript.
  * Copy now includes typescript definition files.

## Version 2.0.9 - 2020/06/17

* Bugfixes
  * Documentation: `Configuration.getContext()` returns a `Map<string, string>` not
    an `Array<string, string>`.
* Improvements
  * Resolved CVE-2020-7662 security vulnerability by upgrading dependencies.

## Version 2.0.8 - 2020/05/07

* Bugfixes
  * `ValidationFailure.mergeContext()` was throwing an error if the global configuration contained a
    failure context.

## Version 2.0.7 - 2020/04/20

* Bugfixes
  * `requireThatInstanceOf()` failed with: "type" must be a type.

## Version 2.0.5 - 2020/04/19

* Improvements
  * If a failure message is longer than the terminal width, push the expected value from the failure message
    to the error context. This helps failure messages remain readable in the face of long values.
  * Added `GlobalConfiguration.getTerminalWidth()`, `withDefaultTerminalWidth()`, `withTerminalWidth()`.

## Version 2.0.0 - 2020/04/15

* Improvements
  * Improved diff output for arrays, multiline strings.