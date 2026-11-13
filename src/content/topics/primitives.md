---
title: "Primitive / built-in types"
description: "4. Primitive / built-in types: side-by-side C# and TypeScript examples."
order: 4
---

**How to read:** left is C#, middle is TypeScript, right is blank nara (yours). Narrow screens stack.

## 4. Primitive / built-in types

| Concept | C# | TypeScript |
| --- | --- | --- |
| Text | `string` (UTF-16) | `string` (UTF-16) |
| Boolean | `bool` | `boolean` |
| Integers | `int long short byte uint ulong …` | `number` (double) + `bigint` |
| Decimals | `float double decimal` (money-safe) | `number` only — use libs (decimal.js) for money |
| Date/time | `DateTime DateOnly TimeOnly TimeSpan DateTimeOffset` | `Date` (+ `Temporal` proposal / Luxon / date-fns) |
| GUID | `Guid` | `string` via `crypto.randomUUID()` |
| Nothing | `void` + `null` | `void never null undefined` |
| Anything | `object dynamic` | `object unknown any` |

```csharp
int i = 42;
long big = 9_000_000_000L;
double d = 0.1 + 0.2;    // 0.30000000000000004
decimal money = 0.1m + 0.2m; // 0.3 exact
bool ok = true;
char c = 'A';            // distinct char type
DateTime now = DateTime.UtcNow;
Guid id = Guid.NewGuid();
TimeSpan ttl = TimeSpan.FromMinutes(5);
```

```ts
let i: number = 42;
let big: bigint = 9_000_000_000n; // note 'n'
let d = 0.1 + 0.2; // 0.30000000000000004 — same float issue
// no decimal literal — 0.1+0.2 is float math
let ok: boolean = true;
let c = "A"; // no char — single-char string
let now = new Date();
let id: string = crypto.randomUUID();
let ttlMs = 5 * 60 * 1000; // durations are just numbers
```


```nara

```
- If C# uses `decimal` for money, don’t port to TS `number` naively — use integers-of-cents or a decimal library.
- TS `number` covers all C# int/float/double. `bigint` covers `long` beyond 2<sup>53</sup> but can’t mix with `number` without conversion.
- C# `char` vs TS single-char `string`; C# `TimeSpan` vs TS millisecond numbers or `Temporal.Duration`.
