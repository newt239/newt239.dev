import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    works: defineCollection({
      source: "works/**",
      type: "page",
      schema: z.object({
        thumbnail: z.string(),
        alt: z.string(),
        tech: z.array(z.string()),
        period: z.string(),
        github: z.string(),
        featured: z.boolean(),
        order: z.number(),
      }),
    }),
  },
});
