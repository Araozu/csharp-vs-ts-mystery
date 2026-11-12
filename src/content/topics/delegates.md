---
title: "Delegates, lambdas, events"
description: "24. Delegates, lambdas, events: side-by-side C# and TypeScript examples."
order: 24
---

**How to read:** left is C#, middle is TypeScript, right is blank Mystery (yours). Narrow screens stack.

## 24. Delegates, lambdas, events

```csharp
public delegate int Compare(string a, string b);
Func<int, int, int> add = (a, b) => a + b;
Action<string> log = Console.WriteLine;
Predicate<string> isLong = s => s.Length > 3;

public event EventHandler<string>? Renamed;
Renamed?.Invoke(this, "new-name");
// subscribe: obj.Renamed += Handler; //-= to remove
```

```ts
type Compare = (a: string, b: string) => number;
const add: (a: number, b: number) => number = (a, b) => a + b;
const log: (msg: string) => void = console.log;
const isLong = (s: string): boolean => s.length > 3;

// events: EventTarget / EventEmitter, no keyword
import { EventEmitter } from "node:events";
const bus = new EventEmitter();
bus.on("renamed", (name: string) => console.log(name));
bus.emit("renamed", "new-name");

// DOM:
target.addEventListener("click", (e) => console.log(e));
```


```mystery

```
- `Func<A,R>` ≈ `(a: A) => R`, `Action<T>` ≈ `(t: T) => void`.
- C# events are language-level with `+=/-=`. TS uses `addEventListener` / `EventEmitter.on` + `removeListener`.
- Multicast: C# delegates combine (`+`); TS typically holds an array of callbacks.
