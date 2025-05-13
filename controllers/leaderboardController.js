import { getRedisClient } from '../config/redis.js';

export const getLeaderboard = async (req, res) => {
  const { gameId } = req.params;
  const redis = getRedisClient();

  const leaderboard = await redis.zRevRangeWithScores(`leaderboard:game:${gameId}`, 0, 9);
  res.json(leaderboard);
};

export const getRank = async (req, res) => {
  const { gameId } = req.params;
  const userId = req.user.id;
  const redis = getRedisClient();

  const rank = await redis.zRevRank(`leaderboard:game:${gameId}`, userId);
  res.json({ rank: rank !== null ? rank + 1 : 'Unranked' });
};
