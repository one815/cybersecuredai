
# Multi-Model Router (minimal)

See `SPEC.md` for the full technical specification.

Run locally (dev):

```bash
# Install dependencies (npm or pnpm)
npm install

# Compile & run (production-like)
npx tsc -p tsconfig.json
node dist/app/server.js

# Or run in dev mode with ts-node-dev for fast iteration
npx ts-node-dev --respawn --transpile-only app/server.ts
```

Endpoints:

- GET / -> basic API info
- GET /health -> {"status":"ok"}
- POST /invoke -> invoke LLM routing (see SPEC.md)
- POST /image -> image generation

### Quick start

- Requirements
	- Node 22
	- pnpm or npm
- Install and run
	- pnpm install
	- pnpm dev
- Health
	- GET /health → {"status":"ok"}

### Environment (.env)

Do not commit `.env`. Create it from `.env.example` and fill only the keys you have.

Use placeholders locally if you don't want to store real secrets in the repo. Example variables (DO NOT copy real keys into version control):

- OPENAI_API_KEY=REDACTED
- ANTHROPIC_API_KEY=REDACTED
- GEMINI_API_KEY=REDACTED
- DEEPSEEK_API_KEY=REDACTED
- DEEPSEEK_BASE_URL=
- STABILITY_API_KEY=REDACTED
- GOOGLE_PROJECT=
- GOOGLE_LOCATION=

For CI, add these values to your repository secrets and the workflow will forward them to the test job.

Curl examples:

```bash
curl http://localhost:3000/

curl http://localhost:3000/health

curl -X POST http://localhost:3000/invoke \
	-H 'Content-Type: application/json' \
	-d '{"task":"code","input":"generate a function to add two numbers"}'
```

Environment variables (see `.env.example`):
- PORT (default 3000)
- LOG_LEVEL
- OPENAI_API_KEY, ANTHROPIC_API_KEY, GEMINI_API_KEY, DEEPSEEK_API_KEY, DEEPSEEK_BASE_URL

Next steps / Open issues:
- Wire real provider adapters behind feature flags (OpenAI, Anthropic, Gemini, DeepSeek)
- Image provider auth (Vertex SA JSON)
- Observability: Prometheus metrics + OpenTelemetry
- Cost estimator and retry/fallback policies

