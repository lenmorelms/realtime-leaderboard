import express from "express";
import topPlayersReport from "../controllers/reportController.js";

const router = express.Router();

router.get('/reports/top', topPlayersReport);

export default router;