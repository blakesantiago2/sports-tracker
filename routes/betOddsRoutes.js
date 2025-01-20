import { Router } from 'express';
const router = Router();
import { getOddsByGame, getOddsByTeam } from '../controllers/betOddsController.js';

// Route to get odds for a specific game
router.get('/odds/game/:homeTeam/:awayTeam/:gameDate', getOddsByGame);

// Route to get all odds for a specific team across games
router.get('/odds/team/:team', getOddsByTeam);

export default router;
