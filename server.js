import dotenv from "dotenv";
import express, { json } from 'express';
// const mongoose = require('./config/db'); // MongoDB connection
import { connect } from 'mongoose';
import teamRoutes from './routes/teamRoutes.js';
import playerRoutes from './routes/playerRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import scheduleCronJobs from './cron/updateSuccessRates.js';
import betRoutes from './routes/betRoutes.js';
import gameStatsRoutes from './routes/GameStatsRoutes.js';
import betPredictionRoutes from './routes/betPredictionRoutes.js';
import betOddsRoutes from './routes/betOddsRoutes.js';
import fetchNflData from './services/saveNflData.js';
import { fetchAndSaveNflScores } from './services/nflScoresService.js';
import  fetchAndSaveAllNflOdds from './services/betOddsServices.js';
import fetchAndSaveGames from './services/nbaScoreService.js'
import events from 'events';
events.defaultMaxListeners = 15;
// const { initializeTeams } = require('./models/Team');
fetchAndSaveGames('basketball_nba');
scheduleCronJobs(); // Run the cron jobs
const app = express();
app.use(express.json());
dotenv.config();
fetchAndSaveAllNflOdds();
// MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('MongoDB connection error:', err));
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));


connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        // await initializeTeams();
         await fetchNflData(); // Call the function after connecting
         await fetchAndSaveNflScores();
    })
    .catch(err => console.error('MongoDB connection error:', err));



app.use('/api/bets', betRoutes);

// Use the routes
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/gameStats', gameStatsRoutes);
app.use('/api/bets', betRoutes);
app.use('/api/bet-predictions', betPredictionRoutes);
app.use('/api/bet-odds', betOddsRoutes);



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
