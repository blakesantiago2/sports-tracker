// services/predictionService.js

import GameStats from '../models/GameStats.js'; // Correct model import
import BetPrediction from '../models/BetPrediction.js'; // Correct model import

// Helper function to calculate success rate
const calculateSuccessRate = (gamesWon, gamesPlayed) => {
    return gamesPlayed > 0 ? (gamesWon / gamesPlayed) * 100 : 0;
};

// Function to calculate and update success rate for a player's bet
const updatePlayerBetSuccessRate = async (playerId) => {
    try {
        // Fetch games played by the player
        const games = await GameStats.find({ player: playerId });

        // Calculate games won and success rate
        const gamesWon = games.filter(game => game.outcome === 'win').length;
        const successRate = calculateSuccessRate(gamesWon, games.length);

        // Update the success rate in BetPrediction
        await BetPrediction.updateOne(
            { player: playerId, betType: 'win' },
            { successRate, lastUpdated: new Date() },
            { upsert: true } // Insert a new document if none exists
        );

        console.log(`Updated success rate for player ${playerId}: ${successRate.toFixed(2)}%`);
    } catch (error) {
        console.error(`Error updating success rate for player ${playerId}:`, error);
    }
};

// Export the functions
export { calculateSuccessRate, updatePlayerBetSuccessRate };
export default updatePlayerBetSuccessRate;

