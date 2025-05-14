import http from 'http';
import app from './app.js';
import { initSocket } from './sockets/socketHandler.js';
import connectDB from './config/db.js';
import { createRedisClient } from './config/redis.js';

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB();
  await createRedisClient();
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
