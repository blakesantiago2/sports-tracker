const express = require('express');
const router = express.Router();
const betOddsController = require('../controllers/betOddsController');

// Route to get odds for a specific game
router.get('/odds/game/:homeTeam/:awayTeam/:gameDate', betOddsController.getOddsByGame);

// Route to get all odds for a specific team across games
router.get('/odds/team/:team', betOddsController.getOddsByTeam);

module.exports = router;
