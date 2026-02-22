type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  reset: number;
};

type RateLimitEntry = {
  count: number;
  reset: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

export const checkRateLimit = (
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult => {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || existing.reset <= now) {
    rateLimitStore.set(key, { count: 1, reset: now + windowMs });
    return { allowed: true, remaining: limit - 1, reset: now + windowMs };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      reset: existing.reset,
    };
  }

  const nextCount = existing.count + 1;
  rateLimitStore.set(key, { count: nextCount, reset: existing.reset });
  return {
    allowed: true,
    remaining: limit - nextCount,
    reset: existing.reset,
  };
};
