import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const seoFields = {
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
};

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(true),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    ...seoFields,
  }),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    featured: z.boolean().default(false),
    date: z.string(),
    role: z.string(),
    status: z.string(),
    stack: z.array(z.string()).default([]),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string().url(),
        }),
      )
      .default([]),
    ...seoFields,
  }),
});

const library = defineCollection({
  loader: glob({ base: "./src/content/library", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(["book", "reading", "thought"]),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    externalUrl: z.string().url().optional(),
    author: z.string().optional(),
    status: z.string().optional(),
    ...seoFields,
  }),
});

export const collections = { blog, projects, library };
