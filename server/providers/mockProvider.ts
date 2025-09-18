import { setTimeout as wait } from 'timers/promises';

export class MockProvider {
  name: string;
  constructor(opts: { name: string }) {
    this.name = opts.name;
  }

  async invoke(payload: any, opts: { timeoutMs?: number } = {}): Promise<{ output: string; usage?: any }> {
    const t = opts.timeoutMs ?? 3000;
    // simulate latency
    const delay = Math.min(200 + Math.random() * 200, t - 50);
    if (delay > t) throw new Error('timeout');
    await wait(delay);

    // simulate occasional failure for testing fallback
    if (payload.input && payload.input.includes('[fail]') && this.name === 'gpt5') {
      throw new Error('simulated provider failure');
    }

    return { output: `mock(${this.name}): ${payload.input}`, usage: { tokens: payload.options?.tokens ?? 10 } };
  }

  getFallback(): string | null {
    // small mapping
    if (this.name === 'gpt5') return 'claude';
    if (this.name === 'claude') return 'gpt5';
    return null;
  }
}
