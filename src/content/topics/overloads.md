---
title: "Overloads, optional & params"
description: "25. Overloads, optional & params: side-by-side C# and TypeScript examples."
order: 25
---

**How to read:** left is C#, middle is TypeScript, right is blank Mystery (yours). Narrow screens stack.

## 25. Overloads, optional & params

```csharp
string Format(int n) => n.ToString();
string Format(double n, int digits = 2) => n.ToString($"F{digits}");

int Sum(params int[] nums) => nums.Sum();
Sum(1, 2, 3);
Sum(new[] { 1, 2 });
```

```ts
function format(n: number): string;
function format(n: number, digits: number): string;
function format(n: number, digits = 0): string {
  return n.toFixed(digits);
}

function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3); sum(...[1, 2]);
```


```mystery

```
- C# resolves overloads by arity/types at compile time. TS overloads are compile-time only — one runtime implementation handles all.
- `params int[]` ≈ `...nums: number[]`. Spread `...` works at call sites and in literals in TS.
