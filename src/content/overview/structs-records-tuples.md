---
title: "13. Structs, records, tuples"
order: 13
---

```csharp
public struct Point(int x, int y)
{ public int X = x; public int Y = y; } // value type, copied

public record Person(string Name, int Age); // immutable + value equality
var a = new Person("Ada", 36);
var b = a with { Age = 37 }; // copy + change
bool same = a == b; // false (different values? actually false here)
// new Person("Ada",36) == new Person("Ada",36) → true!

(int code, string msg) t = (200, "ok");
Console.WriteLine(t.code);
```

```ts
// no struct — objects are references
type Point = { readonly x: number; readonly y: number };

type Person = { readonly name: string; readonly age: number };
const a: Person = { name: "Ada", age: 36 };
const b: Person = { ...a, age: 37 }; // copy + change
// === is reference equality — need deep-equal:
import { isDeepStrictEqual } from "node:util";
isDeepStrictEqual(a, { ...a }); // true

const t: [code: number, msg: string] = [200, "ok"];
const [code, msg] = t;
type Rec = Record<string, Person>; // dict with fixed value type
```

- C# `struct` = value type (copied). TS objects are always references — copy explicitly with spread.
- C# `record` has value equality. TS has none — compare field-by-field or with a helper.
- Don’t confuse C# `record` with TS `Record<K,V>` (typed dictionary).

### Deep dive: readonly + frozen

```csharp
public readonly struct ImmutablePt
{ public int X { get; init; } public int Y { get; init; } }
```

```ts
const pt = { x: 1, y: 2 } as const; // deeply literal + readonly
Object.freeze(pt); // runtime freeze (shallow)
type DeepFrozen<T> = { readonly [K in keyof T]: DeepFrozen<T[K]> };
```
