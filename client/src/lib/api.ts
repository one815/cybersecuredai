const RAW = import.meta.env.VITE_API_URL || "";
export const API_URL = RAW.replace(/\/$/, "");

type Json = Record<string, unknown> | unknown[];

async function api(path: string, init: RequestInit = {}) {
  const url = `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {})
    },
    ...init
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText}${body ? ` — ${body}` : ""}`);
  }
  return res;
}

export async function getJSON<T>(path: string): Promise<T> {
  const r = await api(path);
  return r.json() as Promise<T>;
}

export async function postJSON<T>(path: string, body: Json): Promise<T> {
  const r = await api(path, { method: "POST", body: JSON.stringify(body) });
  return r.json() as Promise<T>;
}

export const Api = {
  health: () => getJSON<{ status: "ok" }>("/health"),
  invoke: (payload: {
    task: "code" | "reasoning_long" | "reasoning_cost_sensitive" | "chat_general" | "image_generate";
    input: string;
    options?: Record<string, unknown>;
  }) => postJSON("/invoke", payload)
};
