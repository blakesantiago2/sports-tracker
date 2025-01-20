import { schedule } from 'node-cron';
import Player from '../models/Player.js';
// const updatePlayerBetSuccessRate = require('./path-to-update-function');
import { updatePlayerBetSuccessRate } from '../services/predictionService.js';


function scheduleCronJobs() {
    // console.log('Cron jobs scheduled.');

schedule('0 0 * * *', async () => {
    console.log('Starting cron job to update player success rates...');
    try {
        const players = await Player.find(); // Fetch all players
        for (const player of players) {
            await updatePlayerBetSuccessRate(player._id); // Update success rate for each player
            console.log(`Updated success rate for player: ${player._id}`);
        }
        console.log('Cron job completed successfully.');
    } catch (err) {
        console.error('Error running cron job:', err);
    }
});
}
export default scheduleCronJobs;

// import predictionService from '../services/predictionService.js';
// Schedule to run every day at midnight
// schedule('0 0 * * *', async () => {
//     const players = await Player.find();
//     players.forEach(player => {
//         updatePlayerBetSuccessRate(player._id);  // Update success rate for each player
//     });
// });


// controllers/predictionController.js or cron/updateSuccessRates.js

// const { updatePlayerBetSuccessRate } = require('../services/predictionService');

// Example usage in a controller or cron job
// const updateAllPlayerSuccessRates = async () => {
//     const players = await Player.find();
//     for (const player of players) {
//         await updatePlayerBetSuccessRate(player._id);
//     }
// };
