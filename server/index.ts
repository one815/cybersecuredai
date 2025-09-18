import { createApp } from './app.js';

const PORT = Number(process.env.PORT || 3000);

// create and start the production server when not testing
let serverInstance: any;
async function start() {
  serverInstance = await createApp();
  try {
    await serverInstance.listen({ port: PORT, host: '0.0.0.0' });
    serverInstance.log.info({ msg: 'server started', port: PORT });
  } catch (err) {
    serverInstance.log.error({ err, msg: 'server failed to start' });
    process.exit(1);
  }
}

if (process.env.NODE_ENV !== 'test') start();

export default serverInstance ?? (await createApp());
