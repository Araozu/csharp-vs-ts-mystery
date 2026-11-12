---
title: "2. Projects & hello world"
order: 2
---

### 2a. Scaffold + run

```csharp
// dotnet new console -n HelloCs
// Program.cs — top-level statements
Console.WriteLine("Hello, C#");

// run:   dotnet run
// build: dotnet build -c Release
// test:  dotnet test
// pack:  dotnet pack
```

```csharp
// HelloCs.csproj
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>
</Project>
```

```ts
// npm init -y && npm i -D typescript @types/node
// hello.ts
console.log("Hello, TS");

// run (no build):  npx tsx hello.ts
// typecheck+emit:   npx tsc && node dist/hello.js
// watch:           npx tsc --watch
```

```ts
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "outDir": "dist",
    "declaration": true
  },
  "include": ["src/**/*.ts"]
}
```

### 2b. Entry points & top-level await

```csharp
// Top-level statements allowed (Program.cs)
// + top-level await since C# 9
string body = await new HttpClient()
  .GetStringAsync("https://example.com");
Console.WriteLine(body.Length);
```

```ts
// Top-level await allowed in ESM modules
const res = await fetch("https://example.com");
const body = await res.text();
console.log(body.length);
```

- `Nullable enable` ≈ `"strict": true`. Turn both on for new projects.
- `ImplicitUsings` ≈ TS auto-imports — both reduce boilerplate, both can confuse newcomers about where names come from.
- TS ESM imports need explicit `.js` extensions (`./point.js`) even though source is `.ts` — C# `using` needs no file extension at all.
