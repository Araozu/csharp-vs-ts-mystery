---
title: "LINQ vs array methods"
description: "16. LINQ vs array methods: side-by-side C# and TypeScript examples."
order: 16
---

**How to read:** left is C#, middle is TypeScript, right is blank Mystery (yours). Narrow screens stack.

## 16. LINQ vs array methods

```csharp
var names = users
  .Where(u => u.Age >= 18)
  .OrderBy(u => u.Name)
  .Select(u => u.Name)
  .ToList();

// query syntax (no TS equivalent)
var q = from u in users
        where u.Age >= 18
        select u.Name;

int total = users.Sum(u => u.Age);
bool anyAdmin = users.Any(u => u.Role == "admin");
var dict = users.ToDictionary(u => u.Id);
```

```ts
const names = users
  .filter((u) => u.age >= 18)
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((u) => u.name);
// no query syntax — chain methods

const total = users.reduce((s, u) => s + u.age, 0);
const anyAdmin = users.some((u) => u.role === "admin");
const allActive = users.every((u) => u.status === "active");
const dict = Object.fromEntries(users.map((u) => [u.id, u]));
const dictMap = new Map(users.map((u) => [u.id, u] as const));
```

| C# LINQ | TS equivalent |
| --- | --- |
| `Where` | `filter` |
| `Select` | `map` |
| `SelectMany` | `flatMap` |
| `OrderBy/ThenBy` | `sort/toSorted` with comparator |
| `First/FirstOrDefault` | `find` (`T \| undefined`) |
| `Any/All` | `some/every` |
| `Aggregate/Sum` | `reduce` |
| `Distinct` | `[...new Set(arr)]` |
| `Chunk/GroupBy` | manual or `Object.groupBy` (ES2024) |

### Lazy vs eager — performance deep dive

```csharp
// LINQ is lazy — nothing runs until enumerated
IEnumerable<int> q = nums.Where(n => { Console.WriteLine(n); return n > 1; });
// no output yet
var list = q.ToList(); // now it runs (deferred execution)
```

```ts
// Array methods are eager — each step allocates
const out = nums.filter((n) => { console.log(n); return n > 1; });
// logs immediately
// For lazy pipelines, use generators:
function* lazyFilter<T>(xs: Iterable<T>, f: (t: T) => boolean): Generator<T> {
  for (const x of xs) if (f(x)) yield x;
}
```

- TS `sort` mutates; use `toSorted/toReversed/toSpliced` for LINQ-like non-mutating behavior.
- `Object.groupBy` is new — check target/lib before using, otherwise reduce into a `Map`.
