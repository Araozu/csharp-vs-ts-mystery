---
title: "14. Generics"
order: 14
---

```csharp
T First<T>(List<T> items) => items[0];

public class Repo<T> where T : class, new()
{
  public T Create() => new T();
  public void Save(T item) { /* ... */ }
}

// reified: works at runtime
bool IsInt<T>(T v) => typeof(T) == typeof(int);

// variance: interface-level
// IEnumerable<out T> covariant, Action<in T> contravariant
```

```ts
function first<T>(items: T[]): T { return items[0]; }

export class Repo<T extends object> {
  constructor(private make: () => T) {}
  create(): T { return this.make(); }
  save(item: T): void { /* ... */ }
}
// 'new' constraint ≈ constructor signature:
type Ctor<T> = new (...args: never[]) => T;

// erased: NO runtime typeof(T) — pass a tag:
function isInt(v: unknown, tag: string): boolean { return tag === "int"; }
```


```mystery

```
### Constraints + defaults + helpers

```csharp
// constraints
void Print<T>(T v) where T : notnull, IDisposable { /* ... */ }
// defaults not allowed on methods pre-C#? now via overloads
```

```ts
function print<T extends { id: string }>(v: T): void {}
function wrap<T = string>(v?: T): T[] { return v == null ? [] : [v]; };

// powerhouse helpers (no C# equivalent):
type Partial<T>, Pick<T, K>, Omit<T, K>, ReturnType<F>, Awaited<T>
```


```mystery

```
- `where T : class, new()` ≈ `<T extends object>` + constructor param.
- Biggest gap: C# reified vs TS erased. Serialization, DI, and validation need explicit runtime values in TS.
