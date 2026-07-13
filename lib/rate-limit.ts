/**
 * Rate limiter simples em memória, por IP.
 *
 * Suficiente para um único servidor Next.js na Vercel em baixo volume.
 * Se o tráfego crescer para múltiplas instâncias/regiões, trocar por um
 * armazenamento compartilhado (ex: Upstash Redis) — a interface abaixo
 * já foi desenhada para isso ser uma troca isolada.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const MAX_REQUESTS = 5; // 5 envios por IP a cada 10 minutos

export function checkRateLimit(identifier: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const bucket = buckets.get(identifier);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { allowed: true };
}

// Limpeza periódica para não acumular memória indefinidamente.
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets.entries()) {
      if (now > bucket.resetAt) buckets.delete(key);
    }
  }, WINDOW_MS).unref?.();
}
