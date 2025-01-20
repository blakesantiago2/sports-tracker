// import { Router } from 'express';
// const router = express.Router();
import { getPlayerOdds, getTeamOdds, placePlayerBet, placeTeamBet, getUserBets, getBetResult } from '../controllers/betController.js';

import express from 'express';
const router = express.Router();




// Get betting odds for a specific player
router.get('/player/:playerId/odds', getPlayerOdds);

// Get betting odds for a specific team
router.get('/team/:teamId/odds', getTeamOdds);

// Place a bet on a player
router.post('/player/:playerId/bet', placePlayerBet);

// Place a bet on a team
router.post('/team/:teamId/bet', placeTeamBet);

// Get all bets placed by a user
router.get('/user/:userId/bets', getUserBets);

// Get results for a specific bet
router.get('/bet/:betId/result', getBetResult);

export default router;
