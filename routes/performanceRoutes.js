// routes/performanceRoutes.js
import express from 'express';
const router = express.Router();
import { getPlayerPerformance, getTeamPerformance } from '../controllers/performanceController.js';

// Get player performance against a specific team in the past 5 years
router.get('/players/:playerId/performance/:opponentTeamId', getPlayerPerformance);

// Get team performance against a specific team in the past 5 years
router.get('/teams/:teamId/performance/:opponentTeamId', getTeamPerformance);

export default router;
