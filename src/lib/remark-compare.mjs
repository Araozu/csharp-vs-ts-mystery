// Turns side-by-side markdown into a three-column compare container.
// Astro only maps components onto .mdx, so the container markup is emitted here, with Tailwind classes.
//
// Authoring rules:
// - A ```csharp fence goes in the C# column, a ```ts fence in the TypeScript column,
//   a ```nara fence in the nara column. Consecutive fences form one comparison.
// - Any other block (list, paragraph, table) ends the comparison, unless it is
//   preceded by a marker: <!-- col:csharp -->, <!-- col:ts --> or <!-- col:nara -->.
// - Optional label: ```csharp label="..." or <!-- col:ts label="..." -->.
// - Two comparisons that touch need <!-- --> between them.
// - The nara column comes from the MDs too (currently an empty ```nara block,
//   ready to be filled).

const COLUMNS = new Set(["csharp", "ts", "nara"]);
const MARKER = /^<!--\s*col:(\w+)(?:\s+label="([^"]*)")?\s*-->$/;
const COMMENT = /^<!--[\s\S]*-->$/;

const NAMES = { csharp: "C#", ts: "TypeScript", nara: "nara (yours)" };

const GROUP = "my-12 grid gap-y-10 md:grid-cols-3 md:gap-y-0";
const COLUMN = {
  csharp: "md:pr-8",
  ts: "border-t border-rule pt-8 md:border-t-0 md:pt-0 md:border-l md:px-8",
  nara: "border-t border-rule pt-8 md:border-t-0 md:pt-0 md:border-l md:pl-8",
};
const LABEL = {
  csharp: "text-csharp",
  ts: "text-ts",
  nara: "text-nara",
};

const box = (classes, children = [], attrs = {}) => ({
  type: "compareBox",
  data: { hName: "div", hProperties: { className: classes.split(" "), ...attrs } },
  children,
});

const labelFrom = (meta) => meta?.match(/label="([^"]*)"/)?.[1];

const newGroup = () => ({ columns: { csharp: [], ts: [], nara: [] }, labels: {} });

function column(lang, group) {
  const label = box(
    `border-b-2 border-current pb-2 font-display text-[1.2rem] font-semibold leading-tight ${LABEL[lang]}`,
    [{ type: "text", value: group.labels[lang] ?? NAMES[lang] }],
  );
  const body = box("min-w-0 flex flex-col gap-5", group.columns[lang]);
  return box(`flex min-w-0 flex-col gap-5 ${COLUMN[lang]}`, [label, body], { "data-lang": lang });
}

function toGroupNode(group) {
  return box(GROUP, [column("csharp", group), column("ts", group), column("nara", group)], {
    "data-compare": "",
  });
}

function groupChildren(children) {
  const out = [];
  let group = null;
  let pending = null;
  const flush = () => {
    if (group) out.push(toGroupNode(group));
    group = null;
  };

  for (const child of children) {
    if (child.type === "html") {
      const value = child.value.trim();
      const marker = value.match(MARKER);
      if (marker) {
        pending = { lang: marker[1], label: marker[2] };
        continue;
      }
      if (COMMENT.test(value)) {
        flush();
        continue;
      }
    }

    let lang = null;
    let label;
    if (pending) {
      ({ lang, label } = pending);
      pending = null;
      if (!COLUMNS.has(lang)) throw new Error(`remark-compare: unknown column "${lang}"`);
    } else if (child.type === "code" && COLUMNS.has(child.lang)) {
      lang = child.lang;
      label = labelFrom(child.meta);
    }

    if (lang) {
      group ??= newGroup();
      group.columns[lang].push(child);
      if (label && !group.labels[lang]) group.labels[lang] = label;
    } else {
      flush();
      out.push(child);
    }
  }
  flush();
  return out;
}

function visit(node) {
  if (!node.children) return;
  node.children = groupChildren(node.children);
  for (const child of node.children) {
    if (child.type !== "compareBox") visit(child);
  }
}

export function remarkCompare() {
  return (tree) => visit(tree);
}

export default remarkCompare;
