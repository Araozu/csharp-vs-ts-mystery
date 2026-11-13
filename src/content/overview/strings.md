---
title: "17. Strings, regex & dates — in depth"
order: 17
---

```csharp
string msg = $"Hello, {name}!"; // interpolation
string upper = name.ToUpperInvariant();
string joined = string.Join(", ", new[] { "a", "b" });
string[] parts = "a,b".Split(',');
bool starts = msg.StartsWith("Hello");
string sub = msg[0..5]; // ranges
string raw = @"C:\temp\file.txt"; // verbatim

// regex (compiled, typed groups in .NET 7+)
var m = Regex.Match("2024-01-02", @"(?<y>\d+)");
DateTime dt = DateTime.Parse("2024-01-02");
```

```ts
const msg = `Hello, ${name}!`; // template literal
const upper = name.toUpperCase();
const joined = ["a", "b"].join(", ");
const parts = "a,b".split(",");
const starts = msg.startsWith("Hello");
const sub = msg.slice(0, 5);
const raw = String.raw`C:\temp\file.txt`;

// regex literals + named groups
const m = /(?<y>\d+)-(?<mo>\d+)/.exec("2024-01-02");
const y = m?.groups?.y;
const dt = new Date("2024-01-02"); // beware TZ parsing!
// prefer Temporal (polyfill) or date-fns for real work
```


```nara

```
- C# `$""` ≈ TS backticks. C# verbatim `@""` ≈ `String.raw`.
- Date parsing: C# `DateOnly/TimeOnly/DateTimeOffset` are precise; TS `Date` is famously lossy — use ISO strings + a library.
