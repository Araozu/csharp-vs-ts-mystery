export interface NavEntry {
  slug: string;
  title: string;
}

export const NAV: NavEntry[] = [
  { slug: "at-a-glance", title: "At a glance" },
  { slug: "projects", title: "Projects & hello world" },
  { slug: "variables", title: "Variables & mutability" },
  { slug: "primitives", title: "Primitive / built-in types" },
  { slug: "nullability", title: "Nullability & optionality" },
  { slug: "inference-casting", title: "Inference, any / unknown, casting" },
  { slug: "functions", title: "Functions" },
  { slug: "classes", title: "Classes & constructors" },
  { slug: "interfaces", title: "Interfaces & type aliases" },
  { slug: "inheritance", title: "Inheritance & polymorphism" },
  { slug: "properties", title: "Properties vs accessors" },
  { slug: "enums", title: "Enums" },
  { slug: "structs-records-tuples", title: "Structs, records, tuples" },
  { slug: "generics", title: "Generics" },
  { slug: "collections", title: "Arrays & collections" },
  { slug: "linq", title: "LINQ vs array methods" },
  { slug: "strings", title: "Strings, regex & dates" },
  { slug: "control-flow", title: "Conditionals, switches, loops" },
  { slug: "pattern-matching", title: "Pattern matching & narrowing" },
  { slug: "errors", title: "Error handling" },
  { slug: "async", title: "Async: Task vs Promise" },
  { slug: "modules", title: "Namespaces & modules" },
  { slug: "visibility", title: "Access modifiers" },
  { slug: "delegates", title: "Delegates, lambdas, events" },
  { slug: "overloads", title: "Overloads, optional & params" },
  { slug: "unions", title: "Unions & intersections" },
  { slug: "immutability", title: "Immutability & readonly" },
  { slug: "attributes", title: "Attributes, decorators, reflection" },
  { slug: "equality", title: "Equality & value vs reference" },
  { slug: "tooling", title: "Tooling & ecosystem" },
  { slug: "cheatsheet", title: "Cheat sheet" },
];

export function neighbors(slug: string): { prev?: NavEntry; next?: NavEntry } {
  const i = NAV.findIndex((e) => e.slug === slug);
  if (i === -1) return {};
  return {
    prev: i > 0 ? NAV[i - 1] : undefined,
    next: i < NAV.length - 1 ? NAV[i + 1] : undefined,
  };
}
