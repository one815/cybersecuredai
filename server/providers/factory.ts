import { OpenAIProvider } from './openai.js';
import { MockProvider } from './mockProvider.js';

export type LlmProvider = {
  name: string;
  invoke: (payload: any, opts?: any) => Promise<{ output: string; usage?: any }>;
  getFallback?: () => string | null;
};

export type ProviderBag = {
  openai?: LlmProvider;
  claude: LlmProvider;
  gpt5: LlmProvider;
  gemini: LlmProvider;
  deepseek: LlmProvider;
  image?: Record<string, LlmProvider>;
};

export function defaultProviders(): ProviderBag {
  const claude = new MockProvider({ name: 'claude' });
  const gpt5 = new MockProvider({ name: 'gpt5' });
  const gemini = new MockProvider({ name: 'gemini' });
  const deepseek = new MockProvider({ name: 'deepseek' });
  const image: Record<string, LlmProvider> = { vertex: new MockProvider({ name: 'vertex' }) };

  const bag: ProviderBag = {
    claude,
    gpt5,
    gemini,
    deepseek,
    image
  };

  if (process.env.OPENAI_API_KEY) {
    bag.openai = new OpenAIProvider();
  }

  return bag;
}
