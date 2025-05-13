import { createClient } from 'redis';

let client;

const createRedisClient = async () => {
  client = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
  });
  client.on('error', (err) => console.error('Redis error:', err));
  await client.connect();
  console.log('Redis connected');
};

const getRedisClient = () => client;

export { createRedisClient, getRedisClient };