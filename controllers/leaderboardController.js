import { getRedisClient } from '../config/redis.js';

export const getLeaderboard = async (req, res) => {
  try {
    const { gameId } = req.params;
    const redis = getRedisClient();

    if (!gameId) {
      return res.status(400).json({ message: 'Missing gameId parameter' });
    }

    const leaderboard = await redis.zRangeWithScores(`leaderboard:game:${gameId}`, 0, 9, { REV: true });

    res.json(leaderboard);
  } catch (err) {
    console.error('Error getting leaderboard:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRank = async (req, res) => {
  try {
    const { gameId } = req.params;
    const userId = req.user?.userId || req.user?.id; // fallback if JWT is structured differently

    const redis = getRedisClient();

    if (!gameId || !userId) {
      return res.status(400).json({ message: 'Missing gameId or userId' });
    }

    const rank = await redis.zRevRank(`leaderboard:game:${gameId}`, userId.toString());

    res.json({ rank: rank !== null ? rank + 1 : 'Unranked' });
  } catch (err) {
    console.error('Error getting rank:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
