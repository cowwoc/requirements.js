When
a [String comparison](https://cowwoc.github.io/requirements.js/4.0.11/interfaces/DefaultJavascriptValidators._internal_.ValidatorComponent.html#isEqualTo)
fails, the library outputs a [diff](https://en.wikipedia.org/wiki/Diff) of the values being compared.

Depending on the terminal capability, you will see a [Textual](Textual_Diff.md) or [Colored](Colored_Diff.md)
diff.

# Overriding Terminal Detection

We disable colors if stdout is redirected. This doesn't necessarily mean that ANSI codes are not supported,
but we chose
to err on the side of caution.
Users can override this behavior by
invoking [GlobalRequirements.withTerminalEncoding()](https://cowwoc.github.io/requirements.js/3.2.3/docs/api/module-GlobalRequirements-GlobalRequirements.html#.withTerminalEncoding).