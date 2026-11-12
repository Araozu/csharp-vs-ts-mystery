---
title: "5. Nullability & optionality"
order: 5
---

```csharp
#nullable enable

string definitely = "hi";
// definitely = null; // warning

string? maybe = null;
int? count = null; // Nullable<int>

string result = maybe ?? "fallback";
string upper = maybe?.ToUpper() ?? "N/A";
ArgumentNullException.ThrowIfNull(maybe);

int len = maybe?.Length ?? 0;
int v = count.GetValueOrDefault();
bool has = count.HasValue;
```

```ts
let definitely: string = "hi";
// definitely = null; // error under strict

let maybe: string | null = null;
let missing: string | undefined; // unassigned
let count: number | null = null;

let result = maybe ?? "fallback";
let upper = maybe?.toUpperCase() ?? "N/A";
if (maybe == null) throw new Error("required");

let len = maybe?.length ?? 0;
let v = count ?? 0;
let has = count != null;
```


```mystery

```
### 5a. Optional members + null-forgiving

```csharp
public class User { public string? Nick { get; set; } }
User u = new();
string label = u.Nick ?? "anon";

string? input = GetInput();
int l1 = input!.Length; // "trust me"
if (input is not null) { int l2 = input.Length; }
```

```ts
type User = { nick?: string }; // string | undefined
const u: User = {};
const label = u.nick ?? "anon";

let input: string | null = getInput();
let l1 = input!.length; // "trust me" — same risk
if (input !== null) { let l2 = input.length; }

// optional chaining + call + index:
let f = input?.length;
let r = obj?.method?.();
let el = arr?.[0];
```


```mystery

```
- `string?` (C#) ≈ `string | null` (TS). TS object properties/params usually need `| undefined` too (`nick?: string`).
- `?. ?? ??= !` exist in both. TS `== null` checks both null and undefined — the idiomatic “missing” check.
- Prefer `??` over `||` in TS: `||` also falls through on `0/""`/`false`, `??` only on null/undefined.
