export function estimateCost(_payload: any, provider: string) {
  // stubbed estimate: different providers have different per-token rates
  const rates: Record<string, number> = { gpt5: 0.0006, claude: 0.0005, gemini: 0.0004, deepseek: 0.0002 };
  const rate = rates[provider] ?? 0.0005;
  const tokens = _payload.options?.tokens ?? 10;
  return { estimate_usd: +(tokens * rate).toFixed(6) };
}
