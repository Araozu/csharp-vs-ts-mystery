---
title: "8. Classes & constructors"
order: 8
---

```csharp
public class User
{
  private readonly string _id;
  public User(string id, string name)
  { _id = id; Name = name; }

  public string Name { get; set; }
  public string Id => _id;
  public void Rename(string next) => Name = next;

  public static User Anonymous() => new("0", "anon");
}
var u = new User("1", "Ada");
u.Rename("Grace");
```

```ts
export class User {
  constructor(
    private readonly id: string,
    public name: string,
  ) {} // parameter properties

  get upperName(): string { return this.name.toUpperCase(); }
  rename(next: string): void { this.name = next; }
  static anonymous(): User { return new User("0", "anon"); }
}
const u = new User("1", "Ada");
u.rename("Grace");
// u.id compile-error but still accessible at runtime!
```


```mystery

```
- TS `private` is compile-time only. Use `#id` private fields for runtime privacy.
- TS parameter properties (`constructor(private x)`) ≈ C# primary constructors `class User(string id)` — similar idea, different syntax.
- C# field initializers run before constructor body; same in TS. Order matters for `readonly` assignment.

### Static + factory deep dive

```csharp
public class Counter
{
  private static int _next;
  public static int Created => _next;
  public int Ordinal { get; } = ++_next;
  static Counter() { /* runs once */ }
}
```

```ts
export class Counter {
  private static next = 0;
  static get created(): number { return Counter.next; }
  readonly ordinal: number = ++Counter.next;
  // static blocks (ES2022):
  static { /* runs once */ }
}
```


```mystery

```