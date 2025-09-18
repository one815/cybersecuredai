import fp from 'fastify-plugin';
import { z } from 'zod';
import { InvokeSchema } from '../types/invokeSchema.js';
import server from './index.js';
import { pickProvider } from './routing.js';
import { MockProvider } from './providers/mockProvider.js';
import { OpenAIProvider } from './providers/openai.js';
import { createLogger } from './utils/logging.js';
import { estimateCost } from './utils/cost.js';
import { v4 as uuidv4 } from 'uuid';

const logger = createLogger();

export const routerPlugin = fp(async (fastify) => {
  fastify.get('/health', async () => ({ status: 'ok' }));

  fastify.post('/invoke', async (request, reply) => {
    const id = uuidv4();
    logger.info({ id, route: '/invoke' }, 'invoke:start');

    // validate
    const parse = InvokeSchema.safeParse(request.body);
    if (!parse.success) {
      logger.warn({ id, err: parse.error.format() }, 'invoke:invalid');
      return reply.status(400).send({ error: 'invalid request', details: parse.error.errors });
    }
    const payload = parse.data;

    // choose provider
    const providerName = pickProvider(payload);
    logger.info({ id, provider: providerName }, 'invoke:chosen_provider');

    // select provider implementation
    let provider: any;
    if (providerName === 'openai') {
      provider = new OpenAIProvider();
    } else {
      provider = new MockProvider({ name: providerName });
    }

    try {
      const res = await provider.invoke(payload, { timeoutMs: 3000 });
      const cost_estimate = estimateCost(payload, providerName);
      const out = { id, provider: providerName, output: res.output, usage: res.usage, cost_estimate };
      logger.info({ id, provider: providerName }, 'invoke:success');
      return out;
    } catch (err) {
      logger.error({ id, provider: providerName, err }, 'invoke:error');
      // fallback attempt if configured
      const fallback = provider.getFallback();
      if (fallback) {
        logger.info({ id, provider: fallback }, 'invoke:fallback');
        const provider2 = new MockProvider({ name: fallback });
        try {
          const res2 = await provider2.invoke(payload, { timeoutMs: 3000 });
          const cost_estimate = estimateCost(payload, fallback);
          return { id, provider: fallback, output: res2.output, usage: res2.usage, cost_estimate };
        } catch (err2) {
          logger.error({ id, err2 }, 'invoke:fallback_error');
          return reply.status(502).send({ error: 'provider_error', message: String(err2) });
        }
      }
      return reply.status(502).send({ error: 'provider_error', message: String(err) });
    }
  });
});
