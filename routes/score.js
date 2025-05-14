import express from 'express';
import submitScore from "../controllers/scoreController.js"
import authMiddleware from '../middleware/authMiddleware.js';

const scoreRoutes = express.Router();
scoreRoutes.post('/games/:gameId/score', authMiddleware, submitScore);

export default scoreRoutes;