[![npm version](https://badge.fury.io/js/%40cowwoc%2Frequirements.svg)](https://badge.fury.io/js/%40cowwoc%2Frequirements)
[![build-status](https://github.com/cowwoc/requirements.js/workflows/Build/badge.svg)](https://github.com/cowwoc/requirements.js/actions?query=workflow%3ABuild)

# <img src="https://raw.githubusercontent.com/cowwoc/requirements.js/release-3.0.3/wiki/checklist.svg?sanitize=true" width=64 height=64 alt="checklist"> Requirements.js
Fluent Design by Contract for Javascript

[![API](https://img.shields.io/badge/api_docs-5B45D5.svg)](https://cowwoc.github.io/requirements.js/3.0.2/docs/api/)
[![Changelog](https://img.shields.io/badge/changelog-A345D5.svg)](wiki/Changelog.md)
[![js](https://img.shields.io/badge/other%20languages-java-457FD5.svg)](../../../requirements.java)

A [fluent API](https://en.wikipedia.org/wiki/Fluent_interface) for enforcing
[design contracts](https://en.wikipedia.org/wiki/Design_by_contract) with [automatic message generation](#usage).

```javascript
import {requireThat} from "@cowwoc/requirements"

class Player
{
  constructor(name, age)
  {
    requireThat(name, "name").isNotNull().asString().length.isBetween(1, 30);
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

## Features

* [Automatic message generation](wiki/Features.md#automatic-message-generation)
* [Diffs provided whenever possible](wiki/Features.md#diffs-provided-whenever-possible)
* [Assertion support](wiki/Features.md#assertion-support)
* [Grouping nested requirements](wiki/Features.md#grouping-nested-requirements)
* [String diff](wiki/Features.md#string-diff)

## Getting Started

You can install this library using [npm](https://www.npmjs.com/get-npm):

```
npm install --save @cowwoc/requirements@3.0.3
```

or [yarn](https://yarnpkg.com/en/):

```
yarn add @cowwoc/requirements@3.0.3
```

The best way to learn about the API is using your IDE's auto-complete engine. There are five entry points you can navigate from:

* [requireThat(value, name)](https://cowwoc.github.io/requirements.js/3.0.2/docs/api/module-DefaultRequirements.html#~requireThat)
* [assertThat(value, name)](https://cowwoc.github.io/requirements.js/3.0.2/docs/api/module-DefaultRequirements.html#~assertThat)
* [validateThat(value, name)](https://cowwoc.github.io/requirements.js/3.0.2/docs/api/module-DefaultRequirements.html#~validateThat)
* [Requirements](https://cowwoc.github.io/requirements.js/3.0.2/docs/api/module-Requirements-Requirements.html)
* [GlobalRequirements](https://cowwoc.github.io/requirements.js/3.0.2/docs/api/module-GlobalRequirements-GlobalRequirements.html)

## Related Projects

* http://chaijs.com/
* https://github.com/dsheiko/bycontract
* https://github.com/muroc/offensive.js

## License

Code licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0

Icons made by Flat Icons from www.flaticon.com is licensed by CC 3.0 BY
