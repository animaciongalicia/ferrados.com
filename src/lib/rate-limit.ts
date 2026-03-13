/**
 * Simple in-memory rate limiter.
 * Tracks request timestamps per IP and rejects requests that exceed the limit.
 */

const requests = new Map<string, number[]>();

// Clean up old entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, timestamps] of requests) {
    const valid = timestamps.filter((t) => now - t < windowMs);
    if (valid.length === 0) {
      requests.delete(key);
    } else {
      requests.set(key, valid);
    }
  }
}

export function rateLimit(
  ip: string,
  { maxRequests = 5, windowMs = 60_000 } = {}
): { allowed: boolean; remaining: number } {
  cleanup(windowMs);

  const now = Date.now();
  const timestamps = requests.get(ip) ?? [];
  const valid = timestamps.filter((t) => now - t < windowMs);

  if (valid.length >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  valid.push(now);
  requests.set(ip, valid);

  return { allowed: true, remaining: maxRequests - valid.length };
}
