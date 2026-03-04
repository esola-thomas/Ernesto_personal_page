import { defineCollection, z } from "astro:content";

const experience = defineCollection({
  type: "content",
  schema: z.object({
    role: z.string(),
    organization: z.string(),
    location: z.string().optional(),
    start: z.string(),
    end: z.string().optional(),
    summary: z.string(),
    highlights: z.array(z.string()).min(1),
    stack: z.array(z.string()).default([])
  })
});

const ventures = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    stage: z.enum(["concept", "in-market", "in-progress", "paused"]).default("in-progress"),
    focus: z.string(),
    founded: z.string().optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string().url()
        })
      )
      .default([]),
    metrics: z.array(z.string()).default([])
  })
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    category: z.enum(["hardware", "software", "research", "venture", "education"]).default("software"),
    timeframe: z.string(),
    status: z.enum(["active", "completed", "exploring"]).default("active"),
    summary: z.string(),
    stack: z.array(z.string()).default([]),
    impact: z.array(z.string()).default([]),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string()
        })
      )
      .default([]),
    // Optional case-study fields
    context: z.string().optional(),
    problem: z.string().optional(),
    constraints: z.string().optional(),
    approach: z.string().optional(),
    outcome: z.string().optional(),
    lessons: z.string().optional()
  })
});

const personal = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    order: z.number().default(0)
  })
});

const site = defineCollection({
  type: "data",
  schema: z.object({
    hero: z.object({
      name: z.string(),
      title: z.string(),
      tagline: z.string(),
      statements: z.array(z.string()),
      buildingNow: z.object({
        label: z.string(),
        name: z.string(),
        oneliner: z.string(),
        href: z.string()
      }).optional(),
      ctas: z.array(
        z.object({
          label: z.string(),
          href: z.string()
        })
      )
    }),
    quickFacts: z.array(z.object({ label: z.string(), value: z.string() })),
    contact: z.object({
      email: z.string(),
      calendly: z.string().optional(),
      location: z.string().optional()
    })
  })
});

const skills = defineCollection({
  type: "data",
  schema: z.array(
    z.object({
      label: z.string(),
      items: z.array(z.string())
    })
  )
});

export const collections = {
  experience,
  ventures,
  projects,
  personal,
  site,
  skills
};
