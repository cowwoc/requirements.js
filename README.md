[![npm version](https://badge.fury.io/js/%40cowwoc%2Frequirements.svg)](https://badge.fury.io/js/%40cowwoc%2Frequirements)
[![build-status](https://github.com/cowwoc/requirements.js/workflows/Build/badge.svg)](https://github.com/cowwoc/requirements.js/actions?query=workflow%3ABuild)

# <img src="https://raw.githubusercontent.com/cowwoc/requirements.js/release-4.0/docs/checklist.svg?sanitize=true" width=64 height=64 alt="checklist"> Requirements API

[![API](https://img.shields.io/badge/api_docs-5B45D5.svg)](https://cowwoc.github.io/requirements.js/4.0/docs/api/)
[![Changelog](https://img.shields.io/badge/changelog-A345D5.svg)](docs/Changelog.md)
[![java](https://img.shields.io/badge/other%20languages-java-457FD5.svg)](../../../requirements.java)

A [fluent API](https://en.m.wikipedia.org/docs/Fluent_interface) for enforcing
[design contracts](https://en.wikipedia.org/docs/Design_by_contract) with
[automatic message generation](docs/Features.md#automatic-message-generation):

✔️ Easy to use  
✔️ Fast  
✔️ Production-ready

To get started, add this dependency:

```shell
npm install --save @cowwoc/requirements@4.0
```

or [pnpm](https://pnpm.io/):

```shell
pnpm add @cowwoc/requirements@4.0
```

## Usage Example

```typescript
import {requireThatString} from "@cowwoc/requirements";

class Cake
{
  private bitesTaken = 0;
  private piecesLeft;

  public constructor(piecesLeft: number)
  {
    requireThat(piecesLeft, "piecesLeft").isPositive();
    this.piecesLeft = piecesLeft;
  }

  public eat(): number
  {
    ++bitesTaken;
    assertThat(bitesTaken, "bitesTaken").isNotNegative().elseThrow();

    piecesLeft -= ThreadLocalRandom.current().nextInt(5);

    assertThat(piecesLeft, "piecesLeft").isNotNegative().elseThrow();
    return piecesLeft;
  }

  public getFailures(): String[]
  {
    return checkIf(bitesTaken, "bitesTaken").isNotNegative().
      and(checkIf(piecesLeft, "piecesLeft").isGreaterThan(3)).
      elseGetMessages();
  }
}
```

If you violate a **precondition**:

```typescript
const cake = new Cake(-1000);
```

You'll get:

```
RangeError: "piecesLeft" must be positive.
actual: -1000
```

If you violate a **class invariant**:

```typescript
const cake = new Cake(1_000_000);
while (true)
  cake.eat();
```

You'll get:

```
lang.AssertionError: "bitesTaken" may not be negative.
actual: -128
```

If you violate a **postcondition**:

```typescript
const cake = new Cake(100);
while (true)
  cake.eat();
```

You'll get:

```
AssertionError: "piecesLeft" may not be negative.
actual: -4
```

If you violate **multiple** conditions at once:

```typescript
const cake = new Cake(1);
cake.bitesTaken = -1;
cake.piecesLeft = 2;
const failures = [];
for (const failure of cake.getFailures())
    failures.add(failure);
console.log(failures.join("\n\n"));
```

You'll get:

```
"bitesTaken" may not be negative.
actual: -1

"piecesLeft" must be greater than 3.
actual: 2
```

## Features

This library offers the following features:

* [Automatic message generation](docs/Features.md#automatic-message-generation) for validation failures
* [Diffs provided whenever possible](docs/Features.md#diffs-provided-whenever-possible) to highlight the
  differences between expected and actual values
* [Zero overhead when assertions are disabled](docs/Features.md#assertion-support) for better performance
* [Multiple validation failures](docs/Features.md#multiple-validation-failures) that report all the errors at
  once
* [Nested validations](docs/Features.md#nested-validations) that allow you to validate complex objects
* [String diff](docs/Features.md#string-diff) that shows the differences between two strings

## Entry Points

Designed for discovery using your favorite IDE's auto-complete feature.
The main entry points are:

* [requireThat(value, name)](https://cowwoc.github.io/requirements.js/4.0/docs/api/module-DefaultRequirements.html#~requireThat)
  for method preconditions.
* [assertThat(value, name)](https://cowwoc.github.io/requirements.js/4.0/docs/api/module-DefaultRequirements.html#~assertThat)
  for [class invariants, method postconditions and private methods](docs/Features.md#assertion-support). 
* [checkIf(value, name)](https://cowwoc.github.io/requirements.js/4.0/docs/api/module-DefaultRequirements.html#~checkIf)
  for multiple failures and customized error handling.

See the [API documentation](https://cowwoc.github.io/requirements.java/10.0/docs/api/) for more details.

## Best practices

* Use `checkIf().elseGetMessages()` to return failure messages without throwing an exception.
  This is the fastest validation approach, ideal for web services.
* To enhance the clarity of failure messages, you should provide parameter names, even when they are optional.
  In other words, favor `assert that(value, name)` over `assert that(value)`.

## Related Projects

* http://chaijs.com/
* https://github.com/dsheiko/bycontract
* https://github.com/muroc/offensive.js

## License

Code licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0

Icons made by Flat Icons from www.flaticon.com is licensed by CC 3.0 BY