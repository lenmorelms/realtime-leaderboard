import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import scoreRoutes from './routes/score.js';
import leaderboardRoutes from './routes/leaderboard.js';
import reportRoutes from './routes/report.js';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', authRoutes);
app.use('/api', scoreRoutes);
app.use('/api', leaderboardRoutes);
app.use('/api', reportRoutes);

export default app;