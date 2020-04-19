Minor updates involving cosmetic changes have been omitted from this list. See
https://github.com/cowwoc/requirements.java/commits/master for a full list.

## Version 2.0.2 - 2020/04/19

* Improvements
    * If a failure message is longer than the terminal width, push the expected value from the failure message to the
    exception context. This helps failure messages remain readable in the face of long values.
    * Added `GlobalConfiguration.getTerminalWidth()`, `withDefaultTerminalWidth()`, `withTerminalWidth()`.

## Version 2.0.0 - 2020/04/15

* Improvements
    * Improved diff output for arrays, multiline strings.