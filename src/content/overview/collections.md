---
title: "15. Arrays & collections"
order: 15
---

| Need | C# | TypeScript |
| --- | --- | --- |
| Resizable list | `List<T>` | `T[]` / `Array<T>` |
| Dictionary | `Dictionary<K,V>` | `Map<K,V>` or `Record<K,V>` |
| Set | `HashSet<T>` | `Set<T>` |
| Queue / Stack | `Queue<T>` / `Stack<T>` | `Array` as queue (`push/pop/shift`) |
| Immutable view | `IReadOnlyList<T>` / `ImmutableList<T>` | `readonly T[]` / `Readonly<T>` |
| Lazy stream | `IEnumerable<T>` + `yield` | `Iterable<T>` / generators `function*` |

```csharp
var nums = new List<int> { 1, 2, 3 };
nums.Add(4);
int first = nums[0]; // throws if OOB

var byId = new Dictionary<string, string> { ["1"] = "Ada" };
byId["2"] = "Grace";
bool has = byId.ContainsKey("1");
bool ok = byId.TryGetValue("1", out var name);

var tags = new HashSet<string> { "a", "b" };
tags.Add("a"); // ignored duplicate

// slicing
int[] slice = nums.ToArray()[1..3]; // ranges
```

```ts
const nums: number[] = [1, 2, 3];
nums.push(4);
const first = nums[0]; // number (or undefined with noUncheckedIndexedAccess)

const byId = new Map<string, string>([["1", "Ada"]]);
byId.set("2", "Grace");
const has = byId.has("1");
const name = byId.get("1"); // string | undefined

const byId2: Record<string, string> = { "1": "Ada" };

const tags = new Set(["a", "b"]);
tags.add("a"); // ignored

// slicing (non-mutating)
const slice = nums.slice(1, 3);
const copy = [...nums];
```


```nara

```
- C# indexers throw on missing keys; TS `Map.get` returns `undefined`. Handle it.
- Enable `noUncheckedIndexedAccess` so `arr[0]` is `T | undefined`.
- TS `Array` doubles as stack+queue. For O(1) queues use a deque lib; C# `Queue/Stack` are purpose-built.
