import express from 'express';
import { getLeaderboard, getRank } from '../controllers/leaderboardController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const leaderboardRoutes = express.Router();
leaderboardRoutes.get('/games/:gameId/leaderboard', getLeaderboard);
leaderboardRoutes.get('/games/:gameId/rank', authMiddleware, getRank);

export default leaderboardRoutes;