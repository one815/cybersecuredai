import { z } from 'zod';

export const InvokeSchema = z.object({
  task: z.enum(["code","reasoning_long","reasoning_cost_sensitive","chat_general","image_generate"]),
  input: z.string(),
  options: z.object({
    tokens: z.number().optional(),
    mode: z.enum(["think","fast"]).optional(),
    image: z.object({
      prompt: z.string().optional(),
      size: z.string().default("1024x1024").optional(),
      provider: z.enum(["vertex","stability","openai"]).optional()
    }).optional()
  }).optional()
});

