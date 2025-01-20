import express from 'express';
import { getAllBetSuccessRates, getBetSuccessRate } from '../controllers/betPredictionController.js';
const router = express.Router();
// Get success rate predictions for all bets
router.get('/bets/success-rates', getAllBetSuccessRates);

// Get a success rate prediction for a specific bet.
router.get('/bets/:betType/success-rate', getBetSuccessRate);

export default router;
