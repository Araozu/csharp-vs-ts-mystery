---
title: "Async: Task vs Promise — in depth"
description: "21. Async: Task vs Promise — in depth: side-by-side C# and TypeScript examples."
order: 21
---

**How to read:** left is C#, middle is TypeScript, right is blank Mystery (yours). Narrow screens stack.

## 21. Async: Task vs Promise — in depth

```csharp
async Task<string> FetchAsync(string url, CancellationToken ct)
{
  using var http = new HttpClient();
  return await http.GetStringAsync(url, ct);
}
string body = await FetchAsync(url, ct);

// parallel (both start immediately)
Task<string> a = FetchAsync(u1, ct);
Task<string> b = FetchAsync(u2, ct);
string[] both = await Task.WhenAll(a, b);

// fire-and-forget with safety:
_ = Task.Run(() => Background(ct));
```

```ts
async function fetchText(url: string, signal?: AbortSignal): Promise<string> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}
const body = await fetchText(url, signal);

// parallel
const [a, b] = await Promise.all([fetchText(u1, signal), fetchText(u2, signal)]);
// tolerant: Promise.allSettled([...])
// first-wins: Promise.race / Promise.any
```

| C# | TS |
| --- | --- |
| `Task<T>` | `Promise<T>` |
| `Task.WhenAll` | `Promise.all` |
| `Task.WhenAny` | `Promise.race` / `Promise.any` |
| `CancellationToken` | `AbortSignal` / `AbortController` |
| `IAsyncEnumerable<T>` + `await foreach` | `AsyncGenerator` + `for await...of` |
| `Parallel.ForEachAsync` | `p-limit` + `Promise.all` |

### Concurrency limits + cancellation

```csharp
// bounded parallelism built-in
await Parallel.ForEachAsync(urls, ct, async (u, t) =>
{ await FetchAsync(u, t); });

// cooperative cancellation
ct.ThrowIfCancellationRequested();
```

```ts
import pLimit from "p-limit";
const limit = pLimit(5);
await Promise.all(urls.map((u) => limit(() => fetchText(u, signal))));

const ctrl = new AbortController();
setTimeout(() => ctrl.abort(), 5000);
await fetchText(url, ctrl.signal); // throws AbortError
```

### Async streams

```csharp
await foreach (var item in StreamAsync(ct)) Console.WriteLine(item);

async IAsyncEnumerable<int> StreamAsync(
  [EnumeratorCancellation] CancellationToken ct)
{ for (int i = 0; i < 3; i++) yield return i; }
```

```ts
for await (const item of stream()) console.log(item);

async function* stream(): AsyncGenerator<number> {
  for (let i = 0; i < 3; i++) yield i;
}
```

- Both use `async/await`, but C# continuations run on the thread pool; TS runs on the event-loop microtask queue.
- Don’t block: C# `.Result/.Wait()` can deadlock; TS `await` never blocks the thread.
- Threads vs event loop: CPU-bound work needs threads in both — C# has them by default, TS needs `Worker` threads or offload.
