import Score from '../models/Score.js';
import { getRedisClient } from '../config/redis.js';
import { getIO } from '../sockets/socketHandler.js';

const submitScore = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { score } = req.body;
    const userId = req.user?.userId || req.user?.id; // fallback for JWT structure

    // Input validation
    if (!userId || !gameId || typeof score !== 'number') {
      console.error('Invalid input:', { userId, gameId, score });
      return res.status(400).json({ message: 'Invalid userId, gameId, or score' });
    }

    // Save score in MongoDB
    await Score.create({ userId, gameId, score });

    // Update Redis leaderboard
    const redis = getRedisClient();

    await redis.zAdd(`leaderboard:game:${gameId}`, {
      score,
      value: userId.toString() // Redis needs string or Buffer
    });

    // Emit updated leaderboard to all clients
    const topPlayers = await redis.zRangeWithScores(`leaderboard:game:${gameId}`, 0, 9, { REV: true });
    const io = getIO();
    io.emit('leaderboardUpdate', { gameId, leaderboard: topPlayers });

    res.json({ message: 'Score submitted' });
  } catch (err) {
    console.error('Error submitting score:', err);
    res.status(500).json({ message: 'Server error submitting score' });
  }
};

export default submitScore;
