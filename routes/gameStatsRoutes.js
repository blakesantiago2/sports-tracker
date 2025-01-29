// routes/performanceRoutes.js
import express from 'express';
const router = express.Router();
import { getPlayerPerformance, getTeamPerformance, getAllTeamScores} from '../controllers/gameStatsController.js';

// Get player performance against a specific team in the past 5 years
router.get('/players/:playerId/gameStats/:opponentTeamId', getPlayerPerformance);

// Get team performance against a specific team in the past 5 years
router.get('/teams/:teamId/gameStats/:opponentTeamId', getTeamPerformance);

router.get('/teams/scores', getAllTeamScores);
export default router;
