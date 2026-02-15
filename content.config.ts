import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    works: defineCollection({
      source: "works/**",
      type: "page",
      schema: z.object({
        tech: z.array(z.string()),
        period: z.string(),
        github: z.string(),
        order: z.number().optional(),
        images: z.array(
          z.object({
            src: z.string(),
            alt: z.string(),
          })
        ).min(1),
      }),
    }),
  },
});
