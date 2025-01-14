// services/predictionService.js

const GameStats = require('../models/GameStats');
const BetPrediction = require('../models/BetPrediction');

// Helper function to calculate success rate
const calculateSuccessRate = (gamesWon, gamesPlayed) => {
    return (gamesPlayed > 0) ? ((gamesWon / gamesPlayed) * 100) : 0;
};

// Function to calculate and update success rate for a player's bet
const updatePlayerBetSuccessRate = async (playerId) => {
    const games = await GameStats.find({ player: playerId });

    const gamesWon = games.filter(game => game.outcome === 'win').length;
    const successRate = calculateSuccessRate(gamesWon, games.length);

    await BetPrediction.updateOne(
        { player: playerId, betType: 'win' },
        { successRate, lastUpdated: new Date() },
        { upsert: true }
    );
};

module.exports = { calculateSuccessRate, updatePlayerBetSuccessRate };
