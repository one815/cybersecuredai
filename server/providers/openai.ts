import fetch from 'node-fetch';

export type InvokeOpts = { timeoutMs?: number };

export class OpenAIProvider {
  name = 'openai';

  async invoke(payload: any, opts: InvokeOpts = {}) {
    const input = payload.input;
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), opts.timeoutMs ?? 20000);
    try {
      const r = await fetch(`${process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1'}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY || ''}`
        },
        body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'user', content: input }] }),
        signal: ctrl.signal as any
      });
      if (!r.ok) throw new Error(`openai ${r.status} ${r.statusText}`);
      const json = await r.json();
      const output = json.choices?.[0]?.message?.content ?? '';
      const usage = json.usage ?? null;
      return { output, usage };
    } finally {
      clearTimeout(t);
    }
  }

  getFallback(): string | null {
    return 'claude';
  }
}
