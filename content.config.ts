import { defineCollection, defineContentConfig, z } from "@nuxt/content";
import { defineSitemapSchema } from "@nuxtjs/sitemap/content";

export default defineContentConfig({
  collections: {
    works: defineCollection({
      source: "works/**",
      type: "page",
      schema: z.object({
        tech: z.array(z.string()),
        period: z.string(),
        github: z.string().optional(),
        order: z.number().optional(),
        images: z.array(
          z.object({
            src: z.string(),
            alt: z.string(),
          })
        ).min(1),
        sitemap: defineSitemapSchema({ z }),
      }),
    }),
  },
});
