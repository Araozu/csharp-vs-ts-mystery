---
title: "19. Pattern matching & narrowing"
order: 19
---

```csharp
object shape = new Circle(2);
double area = shape switch
{
  Circle c => Math.PI * c.R * c.R,
  Rectangle { W: var w, H: var h } => w * h,
  null => 0,
  _ => throw new ArgumentException("unknown")
};

if (shape is Circle circle) Console.WriteLine(circle.R);

// list + relational + logical patterns (C# 9+)
bool ok = score is >= 90 or <= 10;
if (arr is [1, .., 5]) Console.WriteLine("starts 1 ends 5");
```

```ts
type Shape =
  | { kind: "circle"; r: number }
  | { kind: "rect"; w: number; h: number };
declare const shape: Shape;

const area =
  shape.kind === "circle" ? Math.PI * shape.r ** 2 :
  shape.kind === "rect"   ? shape.w * shape.h :
  (() => { throw new Error("unknown"); })();

// guards: typeof / instanceof / in / predicates
function isCircle(s: Shape): s is Extract<Shape, { kind: "circle" }> {
  return s.kind === "circle";
}
if (isCircle(shape)) console.log(shape.r);

// exhaustiveness via never:
function assertNever(x: never): never { throw new Error("unhandled"); }
```


```nara

```
- C# patterns match on runtime type. TS narrows via discriminant props (`kind`), `typeof`, `in`, and guard functions.
- Exhaustiveness: C# warns on non-exhaustive enum switches; TS checks via `never` in the default branch.

### Destructuring

```csharp
var (code, msg) = (200, "ok");
var person = new Person("Ada", 36);
var (name, age) = person; // needs Deconstruct

// discard
var (_, onlyMsg) = (200, "ok");
```

```ts
const [code, msg] = [200, "ok"] as const;
const person = { name: "Ada", age: 36 };
const { name, age } = person;
const { name: display = "n/a", ...rest } = person;
const [first, ...others] = [1, 2, 3];
const [a = 0] = []; // defaults
```


```nara

```