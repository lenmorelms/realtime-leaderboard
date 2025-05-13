import mongoose from "mongoose";

const ScoreSchema = mongoose.Schema(
    {
        userId: mongoose.Schema.Types.ObjectId,
        gameId: String,
        score: Number,
        createdAt: { type: Date, default: Date.now }
    }
);
const Score = mongoose.model('Score', ScoreSchema);
export default Score;
  