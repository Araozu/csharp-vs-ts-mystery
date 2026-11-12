---
title: "Error handling — in depth"
description: "20. Error handling — in depth: side-by-side C# and TypeScript examples."
order: 20
---

**How to read:** left is C#, middle is TypeScript, right is blank Mystery (yours). Narrow screens stack.

## 20. Error handling — in depth

```csharp
try
{
  var text = File.ReadAllText("data.txt");
  int n = int.Parse(text);
}
catch (FileNotFoundException ex) { Console.WriteLine($"missing: {ex.Message}"); }
catch (FormatException) when (debug) { throw; } // filter + rethrow keeps stack
finally { /* always */ }

// Result-style also common now:
// OneOf<User, NotFound>, FluentResults, ErrorOr
```

```ts
import { readFile } from "node:fs/promises";
try {
  const text = await readFile("data.txt", "utf8");
  const n = Number.parseInt(text, 10);
  if (Number.isNaN(n)) throw new Error(`bad number: ${text}`);
} catch (err) {
  // err: unknown under useUnknownInCatchVariables
  if (err instanceof Error) console.log(`failed: ${err.message}`);
  else throw err;
} finally { /* always */ }

// Result-style idiomatic in TS:
type Result<T> = { ok: true; value: T } | { ok: false; error: string };
```

### Custom errors

```csharp
public class NotFoundException(string id)
  : Exception($"User {id} not found") { public string Id => id; }
throw new NotFoundException("1");
```

```ts
export class NotFoundError extends Error {
  override name = "NotFoundError";
  constructor(readonly id: string) { super(`User ${id} not found`); }
}
throw new NotFoundError("1");
// instanceof works if prototype chain intact (extends Error is fine in ES2022+)
```

- C# catches by type + `when` guards. TS has one catch — discriminate with `instanceof`.
- No checked exceptions in either (unlike Java). Document expected failures in XML docs / JSDoc or return `Result`.
