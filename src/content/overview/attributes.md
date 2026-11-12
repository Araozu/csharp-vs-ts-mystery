---
title: "28. Attributes, decorators, reflection"
order: 28
---

```csharp
[Obsolete("Use NewMethod instead")]
public void OldMethod() { /* ... */ }

[AttributeUsage(AttributeTargets.Class)]
public class RouteAttribute(string path) : Attribute
{ public string Path => path; }

[Route("/users")]
public class UsersController { }

var attr = typeof(UsersController)
  .GetCustomAttributes(typeof(RouteAttribute), false)
  .Cast<RouteAttribute>().First();

// source generators: compile-time codegen, AOT-safe
```

```ts
/** @deprecated Use newMethod instead. */
export function oldMethod() {}

// TC39 decorators (TS 5+)
function Route(path: string) {
  return function (target: Function) {
    Reflect.defineMetadata?.("route", path, target);
  };
}
@Route("/users")
export class UsersController { }

// reflection ≈ manual metadata + schemas
// runtime type info is NOT automatic like C#
// prefer Zod/Valibot over decorator magic for validation
```

- C# attributes + reflection are runtime-first (ASP.NET, serializers). TS decorators are syntax sugar — runtime types need explicit libraries.
