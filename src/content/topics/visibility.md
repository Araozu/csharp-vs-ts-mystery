---
title: "Access modifiers"
description: "23. Access modifiers: side-by-side C# and TypeScript examples."
order: 23
---

**How to read:** left is C#, middle is TypeScript, right is blank nara (yours). Narrow screens stack.

## 23. Access modifiers

| Intent | C# | TypeScript |
| --- | --- | --- |
| Public | `public` (top-level default is `internal`) | `public` (default) / `export` |
| Private to class | `private` (enforced) | `private` (compile-time) or `#field` (runtime) |
| Subclasses | `protected` | `protected` |
| Same project only | `internal` / `InternalsVisibleTo` | No equivalent — module privacy via non-exported symbols |
| Static | `static` + static ctors | `static` + static blocks |

```csharp
public class Account
{
  private decimal _balance;
  protected string Owner { get; } = "";
  internal string AuditId { get; } = "";
  private protected string Audit2 { get; } = "";
  public static string Bank => "Acme";
}
```

```ts
export class Account {
  #balance = 0; // truly private at runtime
  protected owner = "";
  static bank = "Acme";
}
// internal ≈ don't export from barrel:
const auditId = ""; // module-private
export { /* only what callers need */ };
```


```nara

```