// const mongoose = require('mongoose');
import mongoose from "mongoose";
const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sport: { type: String, required: true },
    stadium: { type: String },
    wins: { type: Number},
    losses:{type: Number}
}, { timestamps: true });


// const teamSchema = new mongoose.Schema({
//     name: String,
//     league: String,
//     wins: Number,
//     losses: Number,
//     // Additional team information
// });

// const Team = mongoose.model('Team', teamSchema);

// // Function to insert default documents if none exist
// async function initializeTeams() {
//     try {
//         // Check if any teams exist
//         const teamCount = await Team.countDocuments();
//         if (teamCount === 0) {
//             console.log('No teams found. Inserting default teams...');
            
//             const defaultTeams = [
//                 {
//                     name: 'Los Angeles Lakers',
//                     sport: 'Basketball',
//                     stadium: 'Crypto.com Arena',
//                     wins: 17,
//                     losses: 7,
//                 },
//                 {
//                     name: 'Golden State Warriors',
//                     sport: 'Basketball',
//                     stadium: 'Chase Center',
//                     wins: 15,
//                     losses: 5,
//                 },
//                 {
//                     name: 'New York Yankees',
//                     sport: 'Baseball',
//                     stadium: 'Yankee Stadium',
//                     wins: 27,
//                     losses: 12,
//                 },
//             ];

//             // Insert default teams
//             await Team.insertMany(defaultTeams);
//             console.log('Default teams inserted successfully.');
//         } else {
//             console.log(`Teams already exist in the database. Total teams: ${teamCount}`);
//         }
//     } catch (error) {
//         console.error('Error initializing teams:', error);
//     }
// }

// Export both the model and the initialization function
// module.exports = { Team, initializeTeams };


// module.exports = mongoose.model('Team', teamSchema);
const Team = mongoose.model('Team', teamSchema);
//module.exports = Team;
export default Team;
