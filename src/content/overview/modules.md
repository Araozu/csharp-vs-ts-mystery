---
title: "22. Namespaces & modules"
order: 22
---

```csharp
// Geometry/Point.cs
namespace Geometry;
public class Point(int x, int y)
{ public int X => x; public int Y => y; }

// usage — namespace, not file path
using Geometry;
var p = new Point(1, 2);

// internal visibility stays in-assembly
internal class Helper { }
```

```ts
// geometry/point.ts
export class Point {
  constructor(readonly x: number, readonly y: number) {}
}
// geometry/index.ts — barrel
export * from "./point.js";

// usage — file path, not namespace
import { Point } from "./geometry/point.js";

// module-private: just don't export
class Helper {}
```


```nara

```
- C# organizes by namespace + assembly. TS organizes by file + explicit `import/export`.
- TS needs `.js` in relative ESM imports under `NodeNext`. C# `using` never mentions files.
- TS `namespace` exists but is legacy — use ES modules + barrels.
