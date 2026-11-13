---
title: "Equality & reference vs value"
description: "29. Equality & reference vs value: side-by-side C# and TypeScript examples."
order: 29
---

**How to read:** left is C#, middle is TypeScript, right is blank nara (yours). Narrow screens stack.

## 29. Equality & reference vs value

```csharp
string a = "hi"; string b = "hi";
bool eq = a == b; // true (string value equality)

var p1 = new Person("Ada", 36); // record
var p2 = new Person("Ada", 36);
bool sameRecord = p1 == p2; // true (value)

var o1 = new object(); var o2 = new object();
bool sameRef = ReferenceEquals(o1, o2); // false
bool eqDef = EqualityComparer<int>.Default.Equals(1, 1);
```

```ts
const a = "hi"; const b = "hi";
const eq = a === b; // true (primitives by value)

const p1 = { name: "Ada" }; const p2 = { name: "Ada" };
const sameObj = p1 === p2; // false! (reference)
// deep: isDeepStrictEqual, lodash.isEqual, fast-deep-equal
// == does coercion: 0 == "" is true — always use === / !==

// NaN gotcha: NaN !== NaN → use Number.isNaN
```


```nara

```
- C# `==` can be overloaded per type. JS/TS `===` is never overloaded: primitives by value, objects by reference.
- Always `===/!==` in TS. In C# follow each type’s semantics (`record` = value, `class` = reference unless overridden).

### Memory model footnote

```csharp
// struct = stack/value (usually), class = heap/reference
// Span<T> / stackalloc for zero-alloc slices
Span<int> s = stackalloc int[3] { 1, 2, 3 };
```

```ts
// everything is heap + GC; primitives by value
// TypedArrays / ArrayBuffer for zero-copy binary:
const buf = new Uint8Array([1, 2, 3]);
const view = buf.subarray(0, 2); // no copy (like Span)
```


```nara

```