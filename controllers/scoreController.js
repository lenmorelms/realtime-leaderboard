import Score from '../models/Score.js';
import { getRedisClient } from '../config/redis.js';
import { io } from '../sockets/socketHandler.js';

const submitScore = async (req, res) => {
  const { gameId } = req.params;
  const { score } = req.body;
  const userId = req.user.id;

  await Score.create({ userId, gameId, score });

  const redis = getRedisClient();
  await redis.zAdd(`leaderboard:game:${gameId}`, {
    score,
    value: userId
  });

  const topPlayers = await redis.zRevRangeWithScores(`leaderboard:game:${gameId}`, 0, 9);
  io.emit('leaderboardUpdate', { gameId, leaderboard: topPlayers });

  res.json({ message: 'Score submitted' });
};

export default submitScore;
