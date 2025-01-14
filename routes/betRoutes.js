const express = require('express');
const router = express.Router();
const betController = require('../controllers/betController');

// Get betting odds for a specific player
router.get('/player/:playerId/odds', betController.getPlayerOdds);

// Get betting odds for a specific team
router.get('/team/:teamId/odds', betController.getTeamOdds);

// Place a bet on a player
router.post('/player/:playerId/bet', betController.placePlayerBet);

// Place a bet on a team
router.post('/team/:teamId/bet', betController.placeTeamBet);

// Get all bets placed by a user
router.get('/user/:userId/bets', betController.getUserBets);

// Get results for a specific bet
router.get('/bet/:betId/result', betController.getBetResult);

module.exports = router;
