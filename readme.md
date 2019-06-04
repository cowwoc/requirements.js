### Fluent requirement enforcement for Javascript APIs ###

A [fluent API](https://en.wikipedia.org/wiki/Fluent_interface) for enforcing [design contracts](https://en.wikipedia.org/wiki/Design_by_contract) with [automatic message generation](#markdown-header-usage).

```
#!javascript
// Input
const actual = [2, 3, 4, 6];
const expected = [1, 3, 5];
requireThat(actual, "actual").containsAll(expected);

// Output
RangeError: actual must contain all elements in: [1, 3, 5]
Actual : [2, 4, 6]
Missing: [1, 5]
```

### Getting Started ###

`npm install requirements.js --save-dev`

The changelog can be found at [Changelog](../wiki/Changelog)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Debugging ###

To debug the gulpfile, run: `inspect --require babel-register node_modules/gulp/bin/gulp.js`

To debug a unit test, run: `inspect --debug-brk build/test/NameOfTest`

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact