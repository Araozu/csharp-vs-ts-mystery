---
title: "18. Conditionals, switches, loops"
order: 18
---

```csharp
string label = score switch
{
  >= 90 => "A",
  >= 80 => "B",
  _ => "F"
};

switch (role)
{
  case "admin": Grant(); break;
  case "editor" when canEdit: Grant(); break;
  default: Deny(); break;
}

for (int i = 0; i < n; i++) { /* ... */ }
foreach (var u in users) { /* ... */ }
while (more) { /* ... */ } }
```

```ts
const label =
  score >= 90 ? "A" :
  score >= 80 ? "B" : "F";

switch (role) {
  case "admin": grant(); break;
  // no 'when' guard — use if inside
  default: deny(); break;
}

// expression-style via object map:
const handlers: Record<string, () => void> = { admin: grant, editor: grant };
(handlers[role] ?? deny)();

for (let i = 0; i < n; i++) { /* ... */ }
for (const u of users) { /* ... */ } // like foreach
// for (const k in obj) — keys, avoid on arrays
while (more) { /* ... */ }
```


```mystery

```
- C# `foreach` = TS `for...of`. TS `for...in` iterates keys — almost never what you want for arrays.
- C# switch expressions return values exhaustively. TS switch is a statement — use ternary chains or lookup maps for expression style.
