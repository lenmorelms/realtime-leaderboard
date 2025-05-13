import express from 'express';
import submitScore from "../controllers/scoreController.js"
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/games/:gameId/score', authMiddleware, submitScore);

export default router;