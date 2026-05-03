import { defineCollection, z } from 'astro:content';

// ── LESSONS ──────────────────────────────────────────────
const lessons = defineCollection({
  type: 'content',
  schema: z.object({
    id:          z.string(),
    title:       z.string(),
    domain:      z.enum(['d0','d1','d2','d3','d4','d5','d6']),
    taskRef:     z.string().optional(),   // e.g. "T1.1"
    order:       z.number(),
    xp:          z.number(),
    tag:         z.string(),              // "Core", "Beginner", "⚡ MOST TESTED"
    duration:    z.string(),              // "5 min"
    analogy:     z.string(),
    examTrap:    z.string().optional(),   // the specific wrong answer people choose
    keyPoints:   z.array(z.string()),     // 3-5 bullet takeaways
    antiPatterns: z.array(z.string()).optional(),
    tbChallenge: z.string().optional(),   // teach-back prompt
  }),
});

// ── QUESTIONS ────────────────────────────────────────────
const questions = defineCollection({
  type: 'data',
  schema: z.object({
    id:          z.string(),
    scenario:    z.enum(['S1','S2','S3','S4','S5','S6']),
    scenarioName: z.string(),
    domain:      z.enum(['d1','d2','d3','d4','d5']),
    difficulty:  z.enum(['Easy','Medium','Hard','Expert']),
    taskRef:     z.string(),
    question:    z.string(),
    options:     z.array(z.string()).length(4),
    correct:     z.number().min(0).max(3),
    xp:          z.number(),
    explanation: z.string(),
    whyWrong:    z.array(z.string()).length(3).optional(), // why each wrong answer is wrong
    docRef:      z.string().optional(),  // link to official Anthropic docs
  }),
});

// ── FLASHCARDS ───────────────────────────────────────────
const flashcards = defineCollection({
  type: 'data',
  schema: z.object({
    id:     z.string(),
    domain: z.enum(['d1','d2','d3','d4','d5','d6']),
    front:  z.string(),
    back:   z.string(),
    tag:    z.string().optional(),  // "Anti-Pattern", "Decision Rule", "Fact"
  }),
});

export const collections = { lessons, questions, flashcards };
