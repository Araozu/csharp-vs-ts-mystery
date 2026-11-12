---
title: "9. Interfaces & type aliases"
order: 9
---

```csharp
public interface HasId { string Id { get; } }
public interface User : HasId { string Name { get; set; } }

public class DbUser : User
{
  public required string Id { get; init; }
  public required string Name { get; set; }
}

// alias via using
using UserId = System.String;
```

```ts
interface HasId { readonly id: string; }
interface User extends HasId { name: string; }
const u: User = { id: "1", name: "Ada" }; // structural!

type UserId = string;
type Admin = User & { role: "admin" };
type Status = "active" | "archived";
type MaybeUser = User | null;

// implements is optional:
class DbUser implements User {
  constructor(readonly id: string, public name: string) {}
}
```

- TS interfaces are structural + erasable. C# interfaces are nominal + enforced at runtime.
- TS `type` expresses unions/intersections/literals — C# needs enums, inheritance, or pattern matching.
- Excess property checks: TS object literals error on unknown props (`{id, name, extra}`), but non-literals don’t — a common surprise.
