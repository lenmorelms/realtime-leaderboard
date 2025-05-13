import express from 'express';
import { getLeaderboard, getRank } from '../controllers/leaderboardController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/games/:gameId/leaderboard', getLeaderboard);
router.get('/games/:gameId/rank', authMiddleware, getRank);

export default router;