import { defineCollection, z } from "astro:content";

const topics = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().int().positive(),
  }),
});

const overview = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    order: z.number().int().positive(),
  }),
});

const site = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { topics, overview, site };
