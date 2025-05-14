import express from "express";
import topPlayersReport from "../controllers/reportController.js";

const reportRoutes = express.Router();

reportRoutes.get('/reports/top', topPlayersReport);

export default reportRoutes;