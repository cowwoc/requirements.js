# ![checklist.png](https://bitbucket.org/repo/qRAo8G/images/2273371789-checklist.png) Requirements #
[![npm version](https://badge.fury.io/js/%40cowwoc%2Frequirements.svg)](https://badge.fury.io/js/%40cowwoc%2Frequirements) [![build-status](https://img.shields.io/bitbucket/pipelines/cowwoc/requirements.js/default.svg)](https://bitbucket.org/cowwoc/requirements.js/addon/pipelines/home)  [![API](https://img.shields.io/badge/api_docs-5B45D5.svg)](https://cowwoc.bitbucket.io/requirements.js/jsdoc/latest/) [![Changelog](https://img.shields.io/badge/changelog-A345D5.svg)](https://bitbucket.org/cowwoc/requirements.js/wiki/Changelog/)

[![java](https://img.shields.io/badge/languages-java-457FD5.svg)](https://bitbucket.org/cowwoc/requirements.java/) ![js](https://img.shields.io/badge/js-black.svg)

## Fluent Design by Contract for Javascript APIs ##

A [fluent API](https://en.wikipedia.org/wiki/Fluent_interface) for enforcing [design contracts](https://en.wikipedia.org/wiki/Design_by_contract) with [automatic message generation](#markdown-header-usage).

```javascript
import {requireThat} from "@cowwoc/requirements/es6/node/DefaultRequirements.js"

class Player
{
  constructor(name, age)
  {
    requireThat(name, "name").isNotNull().asString().length().isBetween(1, 30);
    requireThat(age, "age").asNumber().isBetween(18, 30);
  }
}
```

Exception messages will look like this:

```javascript
TypeError: name may not be null

RangeError: name may not be empty

RangeError: age must be in range [18, 30).
Actual: 15
```

## Features ##

* [Automatic message generation](https://bitbucket.org/cowwoc/requirements.js/wiki/Features#markdown-header-automatic-message-generation)
* [Diffs provided whenever possible](https://bitbucket.org/cowwoc/requirements.js/wiki/Features#markdown-header-diffs-provided-whenever-possible)
* [Assertion support](https://bitbucket.org/cowwoc/requirements.js/wiki/Features#markdown-header-assertion-support)
* [Grouping nested requirements](https://bitbucket.org/cowwoc/requirements.js/wiki/Features#markdown-header-grouping-nested-requirements)
* [String diff](https://bitbucket.org/cowwoc/requirements.js/wiki/Features#markdown-header-string-diff)

## Getting Started ##

You can install this library using [npm](https://www.npmjs.com/get-npm):

```
npm install --save @cowwoc/requirements@1.0.11
```

or [yarn](https://yarnpkg.com/en/):

```
yarn add @cowwoc/requirements@1.0.11
```

The API has three entry points:

* [requireThat(value, name)](https://cowwoc.bitbucket.io/requirements.js/jsdoc/latest/org.bitbucket.cowwoc.requirements/org/bitbucket/cowwoc/requirements/DefaultRequirements.html#requireThat(T,java.lang.String))
* [assertThat(value, name)](https://cowwoc.bitbucket.io/requirements.js/jsdoc/latest/org.bitbucket.cowwoc.requirements/org/bitbucket/cowwoc/requirements/DefaultRequirements.html#assertThat(T,java.lang.String))
* [Requirements](https://cowwoc.bitbucket.io/requirements.js/jsdoc/latest/org.bitbucket.cowwoc.requirements/org/bitbucket/cowwoc/requirements/Requirements.html)

## Breaking Changes ##

This library does not follow the [semantic versioning spec](https://docs.npmjs.com/about-semantic-versioning).
Be sure to check the [changelog](https://bitbucket.org/cowwoc/requirements.js/wiki/Changelog/) for breaking changes. 

## 3rd-party libraries and tools ##

Enhanced support is available for the following 3rd-party libraries and tools:

* [IntelliJ IDEA](https://bitbucket.org/cowwoc/requirements.js/wiki/Supported%20Tools)

## License ##

Code licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0

Icons made by Flat Icons from www.flaticon.com is licensed by CC 3.0 BY