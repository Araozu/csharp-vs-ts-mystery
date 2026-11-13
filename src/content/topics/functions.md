---
title: "Functions"
description: "7. Functions: side-by-side C# and TypeScript examples."
order: 7
---

**How to read:** left is C#, middle is TypeScript, right is blank nara (yours). Narrow screens stack.

## 7. Functions

### 7a. Declarations, arrows, function types

```csharp
int Add(int a, int b) => a + b;

int Fib(int n)
{
  if (n <= 1) return n;
  return Fib(n - 1) + Fib(n - 2);
}

Func<int, int, int> add = (a, b) => a + b;
Func<int> getRandom = () => Random.Shared.Next();

// closures capture variables (by reference)
int factor = 10;
Func<int, int> scale = x => x * factor;
```

```ts
function add(a: number, b: number): number { return a + b; }
const add2 = (a: number, b: number): number => a + b;

const fib = (n: number): number =>
  n <= 1 ? n : fib(n - 1) + fib(n - 2);

type Add = (a: number, b: number) => number;
const add3: Add = (a, b) => a + b;

// closures capture by reference too
let factor = 10;
const scale = (x: number): number => x * factor;
```


```nara

```
### 7b. Defaults, named args, params

```csharp
void Greet(string name = "world", bool loud = false)
{ /* ... */ }
Greet(loud: true); // true named args
Greet("Ada");

int Sum(params int[] nums) => nums.Sum();
Sum(1, 2, 3);
```

```ts
function greet(name = "world", loud = false) { /* ... */ }
greet(undefined, true); // placeholder for "named"
greet("Ada");

// idiomatic named args: options object + destructuring
function greetOpts({ name = "world", loud = false }: { name?: string; loud?: boolean }) {}
greetOpts({ loud: true });

function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3); sum(...[1, 2]);
```


```nara

```
- Arrow `=>` exists in both. C# lambdas need a delegate type (`Func/Action`); TS function types are structural.
- C# has true named args. TS fakes them with a destructured options object — prefer that once you have >2 params.
- `this`: C# methods capture per instance. TS arrows capture outer `this`; regular `function` gets dynamic `this` — prefer arrows for callbacks. Use `this: void` param to forbid dynamic this.
