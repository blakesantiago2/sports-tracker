// routes/performanceRoutes.js
const express = require('express');
const router = express.Router();
const performanceController = require('../controllers/performanceController');

// Get player performance against a specific team in the past 5 years
router.get('/players/:playerId/performance/:opponentTeamId', performanceController.getPlayerPerformance);

// Get team performance against a specific team in the past 5 years
router.get('/teams/:teamId/performance/:opponentTeamId', performanceController.getTeamPerformance);

module.exports = router;
