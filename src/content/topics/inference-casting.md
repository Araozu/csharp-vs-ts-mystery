---
title: "Inference, any / object / unknown, casting"
description: "6. Inference, any / object / unknown, casting: side-by-side C# and TypeScript examples."
order: 6
---

**How to read:** left is C#, middle is TypeScript, right is blank nara (yours). Narrow screens stack.

## 6. Inference, any / object / unknown, casting

```csharp
var s = "hello"; // string, fixed
// s = 5; // error

object o = "abc";    // boxes anything
dynamic dyn = "hello"; // runtime binding
dyn = 42;              // allowed, checked at runtime

object x = "abc";
string a = (string)x;    // throws if wrong
string? b = x as string; // null if wrong
bool isStr = x is string;
if (x is string str) { Console.WriteLine(str.Length); }
```

```ts
let s = "hello"; // string, fixed
// s = 5; // error

let o: object = {};
let anything: any = "hello";  // escape hatch
anything = 42;
let safe: unknown = "hello"; // must narrow first
// safe.toUpperCase(); // error
if (typeof safe === "string") safe.toUpperCase(); // OK

let x: unknown = "abc";
let a = x as string;       // compile-time only, no check!
let b = <string>x;         // angle form (avoid in .tsx)
let c = String(x);         // runtime conversion
let d = typeof x === "string" ? x : "fallback"; // safe
```


```nara

```
- `object` ≈ `object`, `dynamic` ≈ `any`, but TS `unknown` (safe any) has no direct C# equivalent — prefer it over `any`.
- C# casts can throw at runtime. TS `as` does nothing at runtime — it only tells the compiler what to assume. Validate external data with Zod/Valibot instead.
- TS `satisfies` checks shape without widening: `const c = {…} satisfies Config` ≈ C# object initializer with type checking.
