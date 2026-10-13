import { defineCollection, z } from 'astro:content';

const resourceSchema = z.object({
  type: z.enum(['simulator', 'video', 'reading', 'audio']),
  title: z.string(),
  url: z.string().url(),
  provider: z.string().optional(),
  language: z.string().optional(),
});

const lessons = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string().regex(/^l\d{2,}$/),
    route: z.string().min(1),
    title: z.string().min(1),
    pillar: z.enum(['motion', 'fields', 'energy', 'micro']),
    stage: z.number().int().min(1).max(3),
    age_range: z.enum(['7-8', '9-10', '11-12']),
    loop_depth: z.number().int().min(1),
    order: z.number().int().min(1),
    summary: z.string().max(160).optional(),
    prerequisites: z.array(z.string()).default([]),
    next_lesson_id: z.string().optional(),
    resources: z.array(resourceSchema).default([]),
  }),
});

export const collections = { lessons };
