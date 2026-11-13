---
title: "Enums"
description: "12. Enums: side-by-side C# and TypeScript examples."
order: 12
---

**How to read:** left is C#, middle is TypeScript, right is blank nara (yours). Narrow screens stack.

## 12. Enums

```csharp
public enum Role { Admin, Editor, Viewer }
public enum Status : byte { Active = 1, Archived = 2 }

Role r = Role.Admin;
string s = r.ToString(); // "Admin"
Role p = Enum.Parse<Role>("Admin");
bool ok = Enum.TryParse("admin", ignoreCase: true, out Role rr);

[Flags] public enum Perms { None=0, Read=1, Write=2 }
Perms p2 = Perms.Read | Perms.Write;
```

```ts
enum Role { Admin, Editor, Viewer } // numeric, avoid
enum Status { Active = "active", Archived = "archived" } // string enum

// modern idiom: union of literals (preferred)
type Role2 = "admin" | "editor" | "viewer";
const r: Role2 = "admin";

const PERMS = { None: 0, Read: 1, Write: 2 } as const;
type Perm = typeof PERMS[keyof typeof PERMS];
const p2 = PERMS.Read | PERMS.Write; // number flag math
```


```nara

```
- Prefer TS string-union literals over `enum` — they erase cleanly, autocomplete, and narrow in switches.
- C# enums are ints with `ToString/Parse`. TS numeric enums allow reverse mapping (`Role[0]`) — confusing, avoid.
- `[Flags]` ≈ manual bitmask with `as const` object + numeric union.
