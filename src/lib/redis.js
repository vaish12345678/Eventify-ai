import { Redis } from "ioredis";

// To prevent multiple connections in dev mode (Next.js HMR)
const globalForRedis = global;

const redisClient = globalForRedis.redis || new Redis();

if (process.env.NODE_ENV !== "production") {
  globalForRedis.redis = redisClient;
}

export default redisClient;
