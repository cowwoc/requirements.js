## Automatic message generation

```javascript
const number = "1234567";

requireThat(number, "number").asString().length().isLessThanOrEqualTo(5);

RangeError: number may not contain more than 5 characters.
Actual: 7
number: 1234567
```

## Diffs provided whenever possible

Not only do we provide you with the actual and expected values, we also provide a diff whenever possible.

```javascript
const actual = [2, 3, 4, 6];
const expected = [1, 3, 5];

requireThat(actual, "actual").containsAll(expected);

RangeError: actual must contain all elements in: [1, 3, 5]
Actual : [2, 3, 4, 6]
Missing: [1, 5]
```

## Clean stack-traces

This API's classes do not show up in your stack-traces.

```javascript

TypeError: actual may not be null
```

## Assertion support

All verifiers allocate memory which is especially hard to justify given that most checks are never going to fail. If you
need to run in a high-performance, zero allocation environment (to reduce latency and jitter) look no further
than `DefaultRequirements.assertThat()`.

`assertThat()` skips verification if assertions are disabled. `DefaultRequirements` might be less flexible
than `Requirements` but it only allocates `Requirements` once per application. Together, they guarantee high performance
and no allocations if assertions are disabled.

## Grouping nested requirements

Some classes provide a mechanism for grouping nested requirements. For example, `MapVerifier` has methods `keys()`
and `keys(consumer)`, `values()` and `values(consumer)`. This enables one to group requirements that share the same
parent. For example:

```javascript

const nameToAge = new Map();
nameToAge.set("Leah", 3);
nameToAge.set("Nathaniel", 1);

requireThat(nameToAge, "nameToAge").isNotNull();
requireThat(nameToAge, "nameToAge").asMap().keys().containsAll(["Leah", "Nathaniel"]);
requireThat(nameToAge, "nameToAge").asMap().values().containsAll([3, 1]);
```

can be rewritten as:

```javascript

requireThat(nameToAge, "nameToAge").isNotNull().asMap().
  keys(k -> k.containsAll(["Leah", "Nathaniel"])).
  values(v -> v.containsAll([3, 1]));
```

## String diff

When a [String comparison](https://cowwoc.github.io/requirements.js/1.1.1/docs/api/ObjectVerifier.html#isEqualTo) fails,
the library outputs a [diff](../wiki/String%20diff) of the values being compared.

![xterm-example4.png](wiki/colored-diff-example4.png)

Node supports colors in exception messages while browsers do not.