---
title: "Variables & mutability"
description: "Full page: declaring variables, inference, const vs readonly, scoping, and closure gotchas in C# and TypeScript."
order: 3
---

One full page for one idea: how bindings work, what’s mutable, and where scoping bites you.

## 1. Declaration cheat sheet

| Need | C# | TypeScript |
| --- | --- | --- |
| Inferred mutable | `var name = "Ada";` | `let name = "Ada";` |
| Explicit type | `string name = "Ada";` | `let name: string = "Ada";` |
| Never reassign (binding) | `const` (compile-time) / `readonly` field | `const` |
| Literal type preserved | `const string Lang = "C#";` | `const lang = "C#" as const;` |
| Deeply immutable | `record + init + IReadOnlyList` | `as const + readonly + Object.freeze` |

```csharp
var name = "Ada";      // inferred string, still static
string explicitName = "Grace";
const string Lang = "C#";   // compile-time const
const int Max = 100;        // must be computable at compile time

class C {
  readonly string _id = Guid.NewGuid().ToString(); // runtime readonly
  const string Kind = "user"; // implicitly static
}

int count = 0;
count = 1;
// Lang = "TS"; // error
```

```ts
let name = "Ada";          // inferred string
let explicitName: string = "Grace";
const lang = "C#";         // literal narrowed to "C#"? no — string, unless as const
const langLit = "C#" as const; // type: "C#"
const id: string = crypto.randomUUID();

let count = 0;
count = 1;
// lang = "TS"; // error: cannot reassign

// const ≠ immutable contents:
const tags = ["a"];
tags.push("b"); // allowed!
const frozen = ["a"] as const; // readonly ["a"]
```

- C# `var` = inferred but fixed type. TS `let`/`const` = same, plus binding mutability.
- C# `const` = embedded at compile time. TS `const` = no reassignment. Don’t map them 1:1.
- C# `readonly` field ≈ TS `readonly` property (assign once, then frozen).

## 2. Inference & widening

```csharp
var s = "hi"; // string
// s = 5; // error — still static
var x = (string?)null; // need hint when null
// var y; // error — must initialize

int n = 5; // int, no widening surprises
// n = 5.5; // error
```

```ts
let s = "hi"; // string
// s = 5; // error
let x = null; // any? no — with strict: null, widens on assignment unless annotated
let y; // any (implicit) — avoid; annotate: let y: string | undefined;

let n = 5; // number
// widening trap:
let w = null; // type: any under non-strict, null under strict w/ widening
const w2 = null; // type: null (narrow, const)
function f(v = "hi") { /* v: string */ }
```

- Always annotate when initializing with `null`: C# `string? x = null`, TS `let x: string | null = null`.
- TS `let` widens literals (`"hi"` → `string`); `const` preserves them. Use `as const` when you need the literal.

## 3. Scoping

```csharp
for (int i = 0; i < 3; i++) Console.WriteLine(i);
// i not visible here — block scoped

if (true) { int t = 1; }
// t not visible here

// shadowing is an error in same scope, allowed in nested:
int a = 1;
{ int a2 = 2; }
```

```ts
for (let i = 0; i < 3; i++) console.log(i);
// i not visible — let/const are block scoped

if (true) { let t = 1; }
// t not visible here

// var leaks — never use var in TS:
for (var j = 0; j < 3; j++) {}
console.log(j); // 3 — leaked!

let a = 1;
{ let a = 2; console.log(a); } // shadowing allowed
console.log(a); // 1
```

## 4. The closure-in-a-loop trap

```csharp
// Pre-C# 5, foreach captured the same variable.
// Modern C#: each iteration gets a fresh variable — safe:
var actions = new List<Action>();
foreach (var n in new[] { 1, 2, 3 }) actions.Add(() => Console.WriteLine(n));
foreach (var a in actions) a(); // 1 2 3

// for-loop: 'i' is one variable — copy if capturing:
for (int i = 0; i < 3; i++) { int copy = i; Task.Run(() => Console.WriteLine(copy)); }
```

```ts
// let = fresh per iteration (safe). var = shared (bug):
const fns: (() => void)[] = [];
for (let n of [1, 2, 3]) fns.push(() => console.log(n));
fns.forEach((f) => f()); // 1 2 3

const bad: (() => void)[] = [];
for (var i = 0; i < 3; i++) bad.push(() => console.log(i));
bad.forEach((f) => f()); // 3 3 3 — classic bug
// fix: use let, or capture: const copy = i;
```

- Rule: always use `let/const` in TS loops, fresh locals in C# `for` when capturing into lambdas/tasks.

## 5. Definite assignment

```csharp
string s;
if (DateTime.Now.Second > 30) s = "a";
else s = "b";
Console.WriteLine(s); // OK — compiler proves assignment

// string t;
// Console.WriteLine(t); // error: use of unassigned local
```

```ts
let s: string;
if (Date.now() % 2 === 0) s = "a";
else s = "b";
console.log(s); // OK with strict (control-flow proves it)

// let t: string;
// console.log(t!); // error under strict — use ! or assign
// class fields: constructor must assign or use definite assignment:
// name!: string;
```
