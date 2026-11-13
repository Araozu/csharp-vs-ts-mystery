---
title: "3. Variables & mutability"
order: 3
---

```csharp
var name = "Ada";      // inferred string, still static
string explicitName = "Grace";
const string Lang = "C#";   // compile-time const
readonly string _id = Guid.NewGuid().ToString(); // runtime readonly (field)

int count = 0;
count = 1;

const int Max = 100; // must be compile-time computable
// Max = 101; // error
```

```ts
let name = "Ada";          // inferred string
let explicitName: string = "Grace";
const lang = "C#" as const; // literal type "C#"
const id: string = crypto.randomUUID();

let count = 0;
count = 1;
// lang = "TS"; // error: cannot reassign const

// const = no reassignment, NOT deep freeze:
const tags = ["a"];
tags.push("b"); // allowed! array contents mutable
```


```nara

```
- `var` (C#) = type-inferred but fixed. `let`/`const` (TS) = same, plus binding mutability.
- C# `const` = compile-time constant. TS `const` = no reassignment. C# `readonly` field ≈ TS `readonly` property.
- TS `as const` gives literal narrowing (`"C#"` instead of `string`) — closest to C# `const string` semantics for literals.

### Deep dive: scoping

```csharp
for (int i = 0; i < 3; i++)
  Console.WriteLine(i);
// Console.WriteLine(i); // error: out of scope

if (true)
{
  int scoped = 1;
}
// scoped not visible here
```

```ts
for (let i = 0; i < 3; i++) console.log(i);
// console.log(i); // error with let (block-scoped)
// var i would leak — avoid var in TS!

if (true) {
  let scoped = 1;
}
// scoped not visible here
```


```nara

```