---
title: "30. Tooling & ecosystem"
order: 30
---

| Concern | C# | TypeScript |
| --- | --- | --- |
| SDK / compiler | `dotnet` CLI (SDK, runtime, build, test, publish) | `tsc` (check+emit), `tsx/bun` for running |
| Packages | NuGet (`dotnet add package X`) | npm / pnpm / yarn / bun + jsr |
| Test | xUnit, NUnit (`dotnet test`) | Vitest, Jest, Node runner, Playwright |
| Lint / format | Roslyn analyzers, `dotnet format` | ESLint, Biome, Prettier, `tsc --noEmit` |
| Web | ASP.NET Core (controllers, minimal APIs, Blazor) | Express, Fastify, Hono, Next/Nuxt/Astro (this site!) |
| ORM / data | EF Core, Dapper | Prisma, Drizzle, Kysely, TypeORM |
| Config | `appsettings.json`, env, user-secrets | `.env`, `process.env`, dotenv + zod schemas |

### JSON: typed vs validated

```csharp
using System.Text.Json;
var user = JsonSerializer.Deserialize<User>(json)!;
string back = JsonSerializer.Serialize(user);

// source-generated (AOT-friendly):
[JsonSerializable(typeof(User))]
partial class UserJsonContext : JsonSerializerContext { }
```

```ts
// JSON.parse returns any — always validate!
import { z } from "zod";
const User = z.object({ id: z.string(), name: z.string() });
type User = z.infer<typeof User>;
const user = User.parse(JSON.parse(json)); // throws if bad
const back = JSON.stringify(user);
```


```nara

```
### HTTP APIs

```csharp
// Minimal API (ASP.NET Core)
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
app.MapGet("/users/{id}", (string id) => Results.Ok(new { id }));
app.Run();
```

```ts
// Hono (or Express/Fastify — same shape)
import { Hono } from "hono";
const app = new Hono();
app.get("/users/:id", (c) => c.json({ id: c.req.param("id") }));
export default app;
```


```nara

```
### File I/O + DI + testing

```csharp
// sync + async files
string t = File.ReadAllText("a.txt");
string t2 = await File.ReadAllTextAsync("a.txt", ct);

// DI built-in
builder.Services.AddScoped<IRepo, Repo>();

// xUnit
[Fact] public async Task Creates() { Assert.Equal(1, 1); }
```

```ts
import { readFile } from "node:fs/promises";
const t = await readFile("a.txt", "utf8");
// sync version exists but blocks event loop — avoid

// DI: manual or tiny libs (no built-in container)
// Vitest (xUnit-like):
// import { test, expect } from "vitest";
test("creates", () => { expect(1).toBe(1); });
```


```nara

```
- C# serialization is typed end-to-end. TS `JSON.parse` is `any` — validate at the boundary.
- C# DI is built into ASP.NET; TS relies on constructor injection by hand or minimal helpers.
