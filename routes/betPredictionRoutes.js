const express = require('express');
const router = express.Router();
const betPredictionController = require('../controllers/betPredictionController');

// Get success rate predictions for all bets
router.get('/bets/success-rates', betPredictionController.getAllBetSuccessRates);

// Get a success rate prediction for a specific bet.
router.get('/bets/:betType/success-rate', betPredictionController.getBetSuccessRate);

module.exports = router;
