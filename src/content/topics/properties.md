---
title: "Properties vs accessors"
description: "11. Properties vs accessors: side-by-side C# and TypeScript examples."
order: 11
---

**How to read:** left is C#, middle is TypeScript, right is blank nara (yours). Narrow screens stack.

## 11. Properties vs accessors

```csharp
public class Counter
{
  public int Count { get; private set; }
  public string Name { get; init; } = "n/a";
  private int _backing;
  public int Doubled
  {
    get => _backing * 2;
    set => _backing = value / 2;
  }
  public void Inc() => Count++;
}
var c = new Counter { Name = "clicks" };
```

```ts
export class Counter {
  private _count = 0;
  readonly name: string = "n/a";
  get count(): number { return this._count; }
  private _backing = 0;
  get doubled(): number { return this._backing * 2; }
  set doubled(v: number) { this._backing = v / 2; }
  inc(): void { this._count++; }
}
// object-literal init equivalent:
const c = Object.assign(new Counter(), {});
```


```nara

```
- C# properties are first-class (`get/set/init`). TS uses `get/set` accessors or plain fields.
- C# `init` ≈ TS `readonly` assigned in constructor.
- JSON serialization: C# honors getters/setters via attributes; TS accessors are lost in `JSON.stringify` unless backed by data fields.
