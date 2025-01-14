const BetPrediction = require('../models/BetPrediction');
const GameStats = require('../models/GameStats');

// Get success rates for all bets
exports.getAllBetSuccessRates = async (req, res) => {
    try {
        const predictions = await BetPrediction.find().sort({ successRate: -1 });  // Highest success rates first
        res.status(200).json(predictions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get success rate for a specific bet type (e.g., for a player or team)
exports.getBetSuccessRate = async (req, res) => {
    try {
        const betType = req.params.betType;
        const predictions = await BetPrediction.find({ betType }).sort({ successRate: -1 });

        res.status(200).json(predictions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
