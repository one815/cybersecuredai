# Multi-Model Router

A minimal, production-ready multi-model router for GPT‑5, Claude, Gemini 2.5 Pro, DeepSeek V3.1, plus text‑to‑image via Vertex Imagen, Stability, and OpenAI Images. Optimized for reliability, cost, and latency.

- Spec: See SPEC.md
- Status: v0.1 Draft
- Owner: Sam Bascal

## Quick Start

Prereqs: Node 20+, npm 10+, Docker optional.

```bash
npm ci
cp .env.example .env
# Fill in API keys (see Environment)
npm run build
npm run start
# or for dev
npm run dev
```

Health check:

```bash
curl -s http://localhost:3000/health
```

Invoke example:

```bash
curl -s -X POST http://localhost:3000/invoke \
-H "Content-Type: application/json" \
-d '{
  "task":"chat_general",
  "input":"Summarize why routing across providers helps cost and latency.",
  "options":{"mode":"fast"}
}'
```

Image example (provider selectable):

```bash
curl -s -X POST http://localhost:3000/image \
-H "Content-Type: application/json" \
-d '{
  "task":"image_generate",
  "input":"A minimalist shield logo",
  "options":{"image":{"provider":"openai","size":"1024x1024"}}
}'
```

## Environment

Create `.env`:

```
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GEMINI_API_KEY=
DEEPSEEK_API_KEY=
DEEPSEEK_BASE_URL=https://api.deepseek.com # or your gateway
LOG_LEVEL=info
PORT=3000
# For Vertex: provide service account JSON via file mount or secret manager
GOOGLE_APPLICATION_CREDENTIALS=/secrets/vertex-sa.json
```

## Project Layout

```
app/
server.ts
router.ts
providers/
gpt5.ts
claude.ts
gemini.ts
deepseek.ts
images/
vertex.ts
stability.ts
openai.ts
utils/
googleAuth.ts
logging.ts
cost.ts
types.ts
requests/
postman_collection.json
insomnia.yaml
Dockerfile
docker-compose.yml
package.json
tsconfig.json
.env.example
```

## API Overview

- POST /invoke → { id, provider, output, usage?, cost_estimate? }
- POST /image → { id, provider, url|b64, metadata }
- GET /health → { status: "ok" }

Validation: zod schema in SPEC.md.

## Routing Matrix (v0.1)

| Task / Condition | Primary | Fallback | Notes |
|---|---|---|---|
| code | GPT‑5 | Claude | Prefers GPT‑5 |
| reasoning_long or tokens > 200k | Gemini 2.5 Pro | — | Large context |
| reasoning_cost_sensitive or mode=think | DeepSeek (think) | — | Lower cost |
| chat_general | Claude | GPT‑5 | Quality and latency |
| image_generate (vertex|stability|openai) | Selected | Alternate | Provider params vary |

## Development Notes

- Logging: pino JSON with request id and provider
- Errors: typed; single retry to alternate provider when safe
- Security: no persistence; redact secrets; CORS off by default
- Deployment: Node 20-slim Dockerfile; docker-compose; Cloud Run/ECS/K8s
- Testing: unit for routing and schema; integration per provider; smoke and load baselines

### Testing with injected providers
For unit and integration tests we avoid network calls by injecting fake providers.

- Provider DI: `createApp({ providers })` accepts a bag of providers implementing `{ name, invoke() }`.
- Example fake provider:

```ts
const fake = { name: 'openai', invoke: async (payload) => ({ output: `ok:${payload.input}` }) };
const app = await createApp({ providers: { openai: fake, claude: fake, gemini: fake, deepseek: fake } });
```

- Fallback tests: simulate a failing primary by throwing inside `invoke()` and assert the router executes the configured fallback provider from the bag.

## Roadmap

- Streaming and SSE
- Prometheus metrics and OTel tracing
- Vertex auth helper and image provider parity
- Cost estimator pricing updates
 
TODOs:
- Implement real provider adapters: GPT-5, Claude, Gemini, DeepSeek
- Implement POST /image provider wiring and auth
- Add metrics and tracing

## Contributing

- PRs to `ci/cleanup` initially; protected `main`
- Conventional commits preferred
