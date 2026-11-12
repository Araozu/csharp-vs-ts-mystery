---
title: "26. Unions, intersections, discriminated unions"
order: 26
---

```csharp
// C# has no union types — hierarchy + pattern matching
public abstract record Result;
public record Ok(string Value) : Result;
public record Err(string Message) : Result;

string Show(Result r) => r switch
{
  Ok o => $"ok: {o.Value}",
  Err e => $"err: {e.Message}",
  _ => throw new ArgumentOutOfRangeException()
};
```

```ts
type Result =
  | { ok: true; value: string }
  | { ok: false; message: string };

function show(r: Result): string {
  return r.ok ? `ok: ${r.value}` : `err: ${r.message}`;
}

// intersection = "both of"
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;

// keyof / typeof / indexed access — no C# equivalent:
type Keys = keyof Person; // "name" | "age"
```

- Biggest modeling gap. In TS reach for unions of literals; in C# reach for `abstract record` hierarchies.
- TS `|` ≈ C# inheritance for “one of”; TS `&` ≈ multiple interfaces for “both of”.
