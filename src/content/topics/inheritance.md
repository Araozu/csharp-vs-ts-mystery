---
title: "Inheritance & polymorphism"
description: "10. Inheritance & polymorphism: side-by-side C# and TypeScript examples."
order: 10
---

**How to read:** left is C#, middle is TypeScript, right is blank Mystery (yours). Narrow screens stack.

## 10. Inheritance & polymorphism

```csharp
public abstract class Animal
{
  public abstract string Speak();
  public virtual string Move() => "walks";
}
public sealed class Dog : Animal
{
  public override string Speak() => "woof";
  public override string Move() => "runs";
}
Animal a = new Dog();
Console.WriteLine(a.Speak()); // woof
```

```ts
export abstract class Animal {
  abstract speak(): string;
  move(): string { return "walks"; }
}
export class Dog extends Animal {
  override speak(): string { return "woof"; }
  override move(): string { return "runs"; }
}
const a: Animal = new Dog();
console.log(a.speak()); // woof
```


```mystery

```
- `abstract → abstract`, `virtual → plain`, `override → override`, `sealed →` no keyword (don’t extend / lint rule).
- Both: single class inheritance + multiple interfaces. TS adds mixins via intersection + helper functions.
