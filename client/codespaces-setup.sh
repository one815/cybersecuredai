#!/usr/bin/env bash
# Codespaces-friendly setup script for CyberSecuredAI client
# - ensures Vite alias and tsconfig are correct
# - installs necessary dev deps and starts the dev server on $PORT (default 5173)

set -euo pipefail
PORT=${PORT:-5173}
ROOT="/workspaces/cybersecuredai"
CLIENT="$ROOT/client"
cd "$CLIENT"

echo "1) Ensure tsconfig paths"
cat > tsconfig.json <<'JSON'
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["src"]
}
JSON

echo "2) Ensure vite.config.ts"
cat > vite.config.ts <<'TS'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: Number(process.env.PORT || ${PORT}),
  },
});
TS

echo "3) Create toaster shim if missing"
mkdir -p src/components/ui
if [ ! -f src/components/ui/toaster.tsx ]; then
  cat > src/components/ui/toaster.tsx <<'TSX'
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
TSX
fi

echo "4) Install deps (fast)"
pnpm install --frozen-lockfile --ignore-scripts || pnpm install

echo "5) Kill stale vite and start dev server on 0.0.0.0:${PORT}"
pkill -f vite || true
pnpm exec vite --host 0.0.0.0 --port ${PORT} &


echo "Dev server started. Access on http://localhost:${PORT} or via Codespaces port forward." 

