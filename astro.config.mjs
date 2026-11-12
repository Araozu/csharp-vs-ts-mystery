import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { remarkCompare } from "./src/lib/remark-compare.mjs";

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkCompare],
    shikiConfig: { theme: "css-variables" },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
