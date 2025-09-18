import Fastify from 'fastify';
import { routerPlugin } from './router.js';
import { createLogger } from './utils/logging.js';

const PORT = Number(process.env.PORT || 3000);
const logger = createLogger();

const server = Fastify({ logger });

server.register(routerPlugin);

const start = async () => {
  try {
    await server.listen({ port: PORT, host: '0.0.0.0' });
    logger.info({ msg: 'server started', port: PORT });
  } catch (err) {
    logger.error({ err, msg: 'server failed to start' });
    process.exit(1);
  }
};

if (process.env.NODE_ENV !== 'test') start();

export default server;
