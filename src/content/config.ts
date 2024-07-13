import { defineCollection, z } from "astro:content";

const author = defineCollection({
  schema: z.object({
    name: z.string(),
    image: z.string(),
  }),
});

const article = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    author: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
    visible: z.boolean(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    images: z.array(z.string()),
  }),
});

export const collections = { author, article };
