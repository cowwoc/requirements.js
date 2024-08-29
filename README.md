[![npm version](https://badge.fury.io/js/%40cowwoc%2Frequirements.svg)](https://badge.fury.io/js/%40cowwoc%2Frequirements)
[![build-status](https://github.com/cowwoc/requirements.js/workflows/Build/badge.svg)](https://github.com/cowwoc/requirements.js/actions?query=workflow%3ABuild)

# <img src="https://raw.githubusercontent.com/cowwoc/requirements.js/release-4.0.0/docs/checklist.svg?sanitize=true" width=64 height=64 alt="checklist"> Fluent API for Design Contracts

[![API](https://img.shields.io/badge/api_docs-5B45D5.svg)](https://cowwoc.github.io/requirements.js/4.0.0/docs/api/)
[![Changelog](https://img.shields.io/badge/changelog-A345D5.svg)](docs/Changelog.md)
[![java](https://img.shields.io/badge/other%20languages-java-457FD5.svg)](../../../requirements.java)

A [fluent API](https://en.wikipedia.org/wiki/Fluent_interface) for enforcing
[design contracts](https://en.wikipedia.org/wiki/Design_by_contract)
with [automatic message generation](#usage).

✔️ Easy to use  
✔️ Fast  
✔️ Production-ready

To get started, add this dependency:

```shell
npm install --save @cowwoc/requirements@4.0.0
```

or [pnpm](https://pnpm.io/):

```shell
pnpm add @cowwoc/requirements@4.0.0
```

## Sample Code

```typescript
import {requireThat} from "@cowwoc/requirements";


class Address
{
}

class PublicAPI
{
	constructor(name: string | null, age: number, address: Address | undefined)
	{
		// To validate user input, cast them to "unknown" prior to type-checks.
		requireThat(name as unknown, "name").isString().length().isBetween(1, 30);
		requireThat(age as unknown, "age").isNumber().isBetween(18, 30);

		// Methods that conduct runtime type-checks, such as isString() or isNotNull(), update the
		// compile-time type returned by getValue().
		const nameIsString: string = requireThat(name as unknown, "name").isString().getValue();
		const address: Address = requireThat(address as unknown, "address").isInstance(Address).getValue();
	}
}

class PrivateAPI
{
	public static toCamelCase(text): string
	{
		// Trusted input does not need to be casted to "unknown". The input type will be inferred
		// and runtime checks will be skipped. Notice the lack of isString() or isNumber() invocations
		// in the following code.
		assertThat(r => r.requireThat(name, "name").length().isBetween(1, 30));
		assertThat(r => r.requireThat(age, "age").isBetween(18, 30));
	}
}
```

Failure messages will look like this:

```text
TypeError: name may not be null

RangeError: name may not be empty

RangeError: age must be in range [18, 30).
Actual: 15
```

## Features

* [Automatic message generation](docs/Features.md#automatic-message-generation)
* [Diffs provided whenever possible](docs/Features.md#diffs-provided-whenever-possible)
* [Assertion support](docs/Features.md#assertion-support)
* [Grouping nested requirements](docs/Features.md#grouping-nested-requirements)
* [String diff](docs/Features.md#string-diff)

## Getting Started

The best way to learn about the API is using your IDE's auto-complete engine.
There are six entry points you can navigate from:

* [requireThat(value, name)](https://cowwoc.github.io/requirements.js/4.0.0/docs/api/module-DefaultRequirements.html#~requireThat)
* [validateThat(value, name)](https://cowwoc.github.io/requirements.js/4.0.0/docs/api/module-DefaultRequirements.html#~validateThat)
* [assertThat(Function)](https://cowwoc.github.io/requirements.js/4.0.0/docs/api/module-DefaultRequirements.html#~assertThat)
* [assertThatAndReturn(Function)](https://cowwoc.github.io/requirements.js/4.0.0/docs/api/module-DefaultRequirements.html#~assertThatAndReturn)

* [Requirements](https://cowwoc.github.io/requirements.js/4.0.0/docs/api/module-Requirements-Requirements.html)
* [GlobalRequirements](https://cowwoc.github.io/requirements.js/4.0.0/docs/api/module-GlobalRequirements-GlobalRequirements.html)

## Best practices

* Use `requireThat()` to verify pre-conditions of public APIs.
* Use `assertThat()` to verify object invariants and method post-conditions.
  This results in excellent performance when assertions are disabled.
  Have your cake and eat it too!
* Don't bother validating any constraints that are already enforced by the Typescript compiler (such as the
  type of a variable) unless it will result in silent failures or security vulnerabilities when violated.

## Related Projects

* http://chaijs.com/
* https://github.com/dsheiko/bycontract
* https://github.com/muroc/offensive.js

## License

Code licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0

Icons made by Flat Icons from www.flaticon.com is licensed by CC 3.0 BY