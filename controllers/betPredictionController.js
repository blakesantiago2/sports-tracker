// import { find } from '../models/BetPrediction.js';
// import BetPrediction from '../models/BetPrediction.js';


import BetPrediction from '../models/BetPrediction.js';
import GameStats from '../models/GameStats.js';

// Get success rates for all bets
export async function getAllBetSuccessRates(req, res) {
    try {
        // Use the `find` method on the BetPrediction model
        const predictions = await BetPrediction.find().sort({ successRate: -1 });  // Sort by highest success rates
        res.status(200).json(predictions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get success rate for a specific bet type (e.g., for a player or team)
export async function getBetSuccessRate(req, res) {
    try {
        const { betType } = req.params;  // Extract bet type from route parameters
        const predictions = await BetPrediction.find({ predictionType: betType }).sort({ successRate: -1 });

        res.status(200).json(predictions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
