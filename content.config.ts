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
        sitemap: defineSitemapSchema(),
      }),
    }),
    articles: defineCollection({
      source: "articles/**",
      type: "data",
      schema: z.object({
        title: z.string(),
        url: z.string(),
        date: z.string(),
      }),
    }),
    timeline: defineCollection({
      source: "timeline/**",
      type: "data",
      schema: z.object({
        start: z.string(),
        end: z.string().nullable(),
        title: z.string(),
        description: z.string().nullable(),
        src: z.string().nullable(),
      }),
    }),
    certifications: defineCollection({
      source: "certifications/**",
      type: "data",
      schema: z.object({
        date: z.string(),
        title: z.string(),
      }),
    }),
  },
});
