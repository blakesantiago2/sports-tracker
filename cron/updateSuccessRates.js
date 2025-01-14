const cron = require('node-cron');
// const updatePlayerBetSuccessRate = require('./path-to-update-function');
const { updatePlayerBetSuccessRate } = require('../services/predictionService');
// Schedule to run every day at midnight
cron.schedule('0 0 * * *', async () => {
    const players = await Player.find();
    players.forEach(player => {
        updatePlayerBetSuccessRate(player._id);  // Update success rate for each player
    });
});


// controllers/predictionController.js or cron/updateSuccessRates.js

// const { updatePlayerBetSuccessRate } = require('../services/predictionService');

// Example usage in a controller or cron job
const updateAllPlayerSuccessRates = async () => {
    const players = await Player.find();
    for (const player of players) {
        await updatePlayerBetSuccessRate(player._id);
    }
};
