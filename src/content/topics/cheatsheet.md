---
title: "Mental-model cheat sheet"
description: "31. Mental-model cheat sheet: side-by-side C# and TypeScript examples."
order: 31
---

**How to read:** left is C#, middle is TypeScript, right is blank nara (yours). Narrow screens stack.

## 31. Mental-model cheat sheet

<!-- col:csharp label="If you know C#, remember…" -->

- Types disappear at runtime. Any logic needing a type must receive a *value* (schema, constructor, string tag).
- `undefined` is a second null. Check both: `== null` covers both, `??` handles both.
- Object shapes are enough — no `implements` needed. Excess-property checks on literals are the main friction.
- Prefer union literals over enums, `unknown` over `any`, `Map` for non-string keys.
- Validate JSON at runtime. The compiler can’t see over the network.
- `sort` mutates — use `toSorted`. Array methods are eager — generators for lazy.

<!-- col:ts label="If you know TS, remember…" -->

- C# is nominal — same shape ≠ assignable. Implement the interface explicitly.
- Generics are real at runtime — `typeof(T)`, reflection, source generators work.
- `null` is the main “missing”; value types need `?` to be nullable (`int?`).
- LINQ is lazy; `IEnumerable` pipelines don’t run until enumerated (`ToList()`).
- Equality/mutability depend on `class` vs `struct` vs `record` — pick deliberately.
- DI, config, and hosting are built-in (ASP.NET) — less glue code than Node.

### Quick operator / keyword map

| C# | TypeScript | Notes |
| --- | --- | --- |
| `var x = …` | `let x / const x` | Both infer; TS splits binding mutability |
| `string?` | `string \| null \| undefined` | TS splits missing in two |
| `?. ?? ??= !` | `?. ?? ??= !` | Same semantics |
| `is` / switch patterns | `typeof/instanceof/in` + guards | Different mechanics, same goal |
| `Func<A,R> / Action<T>` | `(a: A) => R / (t: T) => void` | TS fn types are structural |
| `List<T>` | `T[]` |  |
| `Dictionary<K,V>` | `Map<K,V> / Record<K,V>` |  |
| `Where/Select/Any/All` | `filter/map/some/every` |  |
| `Task<T>` | `Promise<T>` |  |
| `$"…{x}"` | `` `…${x}` `` |  |
| `params` | `...rest` |  |
| `sealed` | (no keyword — don’t extend) |  |
| `record … with` | `{ ...obj, k: v }` |  |
| `IEnumerable + yield` | `Iterable/Generator + function*` |  |
| `CancellationToken` | `AbortSignal` |  |
