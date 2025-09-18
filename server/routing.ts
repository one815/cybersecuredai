import type { InvokeRequest } from '../types/invokeSchema.js';

export function pickProvider(req: InvokeRequest): string {
  const { task, options } = req;
  const tokens = options?.tokens ?? 0;
  const mode = options?.mode;

  if (task === 'code') return 'gpt5';
  if (task === 'reasoning_long' || tokens > 200_000) return 'gemini';
  if (task === 'reasoning_cost_sensitive' || mode === 'think') return 'deepseek';
  if (task === 'chat_general') return 'claude';
  if (task === 'image_generate') return options?.image?.provider ?? 'vertex';

  return 'claude';
}
