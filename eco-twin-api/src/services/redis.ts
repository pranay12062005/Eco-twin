import { createClient } from 'redis';

// In-memory fallback for local testing without Docker
const fallbackCache = new Map<string, string>();
let useFallback = false;

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => {
  console.warn('⚠️ Redis not available, using in-memory fallback for denylist.');
  useFallback = true;
});

export const connectRedis = async () => {
  try {
    if (!redisClient.isOpen && !useFallback) {
      await redisClient.connect();
      console.log('📦 Connected to Redis');
    }
  } catch (e) {
    useFallback = true;
    console.warn('⚠️ Failed to connect to Redis. Using in-memory fallback.');
  }
};

// Wrapper to seamlessly use Redis or the fallback Map
export const cache = {
  get: async (key: string) => {
    if (useFallback) return fallbackCache.get(key);
    return await redisClient.get(key);
  },
  setEx: async (key: string, seconds: number, value: string) => {
    if (useFallback) {
      fallbackCache.set(key, value);
      setTimeout(() => fallbackCache.delete(key), seconds * 1000);
      return 'OK';
    }
    return await redisClient.setEx(key, seconds, value);
  }
};

export default cache;
