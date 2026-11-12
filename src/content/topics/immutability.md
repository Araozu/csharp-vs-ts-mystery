---
title: "Immutability & readonly — in depth"
description: "27. Immutability & readonly — in depth: side-by-side C# and TypeScript examples."
order: 27
---

**How to read:** left is C#, middle is TypeScript, right is blank Mystery (yours). Narrow screens stack.

## 27. Immutability & readonly — in depth

```csharp
public record Person(string Name, int Age);
var a = new Person("Ada", 36);
var b = a with { Age = 37 }; // non-destructive

IReadOnlyList<int> nums = new List<int> { 1, 2 };
// nums.Add → not available

public class Cfg { public string Env { get; init; } = "dev"; }
// init: set once at creation
```

```ts
type Person = { readonly name: string; readonly age: number };
const a: Person = { name: "Ada", age: 36 };
const b: Person = { ...a, age: 37 };

const nums: readonly number[] = [1, 2];
// nums.push → error
type Frozen<T> = { readonly [K in keyof T]: T[K] };
type DeepRO<T> = { readonly [K in keyof T]: DeepRO<T[K]> };
```


```mystery

```
- Both favor copy-on-write: C# `with`, TS object/array spread.
- TS `readonly` is shallow + compile-time only — use `Object.freeze` for runtime.
