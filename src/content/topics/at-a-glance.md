---
title: "At a glance"
description: "1. At a glance: side-by-side C# and TypeScript examples."
order: 1
---

**How to read:** left is C#, middle is TypeScript, right is blank Mystery (yours). Narrow screens stack.

## 1. At a glance

| Topic | C# | TypeScript |
| --- | --- | --- |
| Runs on | .NET CLR (Windows/Linux/macOS, cloud, mobile via MAUI, Unity) | Any JS runtime (browser, Node, Bun, Deno, workers) |
| Typing | Nominal, static. Same shape ≠ assignable | Structural, static (erased). Same shape = assignable |
| Null safety | `Nullable enable`, `T?` for refs + `Nullable<T>` for values | `strictNullChecks`, `\| null \| undefined` unions |
| Inheritance | Single class + multiple interfaces | Same, plus mixins + intersection types |
| Generics | Reified (kept at runtime, reflection works) | Erased (compile-time only, gone in emitted JS) |
| Concurrency | Threads, thread-pool, `Task`, `Parallel` | Event loop, microtasks, `Promise`, workers for true threads |
| Errors | Typed `catch (ExType)` + filters `when` | Single `catch (unknown)`, narrow with `instanceof` |
| Distribution | NuGet, assemblies, single-file, Native AOT | npm/jsr, bundlers, `tsc` emits plain JS |

### Nominal vs structural — the one idea that explains half the differences

```csharp
// Same shape, NOT assignable
public class UserA { public string Name { get; set; } = ""; }
public class UserB { public string Name { get; set; } = ""; }
// UserB b = new UserA(); // error
// Must implement a shared interface explicitly.
```

```ts
// Same shape, assignable
type UserA = { name: string };
type UserB = { name: string };
const a: UserA = { name: "Ada" };
const b: UserB = a; // OK — structure matches
```


```mystery
gaa
```

- C# asks *“what did you declare?”* TS asks *“what shape do you have?”*
- C# generics survive to runtime (`typeof(T)`, serializers). TS generics do not — pass a value (schema, constructor, tag) if runtime needs it.
- Both have `async/await`, but C# schedules on threads; TS schedules on the event-loop microtask queue.
