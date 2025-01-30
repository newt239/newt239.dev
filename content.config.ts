import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    works: defineCollection({
      source: "works/**",
      type: "page",
      schema: z.object({
        thumbnail: z.string(),
        tech: z.string(),
        creation: z.string(),
        github: z.string(),
        featured: z.boolean(),
        order: z.number(),
      }),
    }),
  },
});
