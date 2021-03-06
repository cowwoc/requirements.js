Minor updates involving cosmetic changes have been omitted from this list. See
https://github.com/cowwoc/requirements.java/commits/master for a full list.

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
    * Bundle now includes typescript definition files.

## Version 2.0.9 - 2020/06/17

* Bugfixes
    * Documentation: `Configuration.getContext()` returns a `Map<string, string>` not an `Array<string, string>`.
* Improvements
    * Resolved CVE-2020-7662 security vulnerability by upgrading dependencies.

## Version 2.0.8 - 2020/05/07

* Bugfixes
    * `ValidationFailure.mergeContext()` was throwing an exception if the global configuration contained a failure
      context.

## Version 2.0.7 - 2020/04/20

* Bugfixes
    * `requireThatInstanceOf()` failed with: "type" must be a type.

## Version 2.0.5 - 2020/04/19

* Improvements
    * If a failure message is longer than the terminal width, push the expected value from the failure message to the
      exception context. This helps failure messages remain readable in the face of long values.
    * Added `GlobalConfiguration.getTerminalWidth()`, `withDefaultTerminalWidth()`, `withTerminalWidth()`.

## Version 2.0.0 - 2020/04/15

* Improvements
    * Improved diff output for arrays, multiline strings.