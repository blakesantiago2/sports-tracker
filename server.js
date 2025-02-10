import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
// const mongoose = require('./config/db'); // MongoDB connection
import { connect } from 'mongoose';
import teamRoutes from './routes/teamRoutes.js';
import playerRoutes from './routes/playerRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import scheduleCronJobs from './cron/updateSuccessRates.js';
import betRoutes from './routes/betRoutes.js';
import gameStatsRoutes from './routes/gameStatsRoutes.js';
import betPredictionRoutes from './routes/betPredictionRoutes.js';
import betOddsRoutes from './routes/betOddsRoutes.js';
import fetchNflData from './services/saveNflData.js';
import { fetchAndSaveNflScores } from './services/nflScoresService.js';
import  fetchAndSaveAllNflOdds from './services/betOddsServices.js';
import fetchAndSaveGames from './services/nbaScoreService.js'
import events from 'events';



import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';


events.defaultMaxListeners = 15;
// const { initializeTeams } = require('./models/Team');
fetchAndSaveGames('basketball_nba');
scheduleCronJobs(); // Run the cron jobs

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
fetchAndSaveAllNflOdds();


connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        // await initializeTeams();
         await fetchNflData(); // Call the function after connecting
         await fetchAndSaveNflScores();
    })
    .catch(err => console.error('MongoDB connection error:', err));

//this loads the swagger YAML file
const swaggerDocument = YAML.load('./config/swaggerDef.yaml');

//setup swagger UI 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 

app.use('/api/bets', betRoutes);

// Use the routes
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/gameStats', gameStatsRoutes);
app.use('/api/bets', betRoutes);
app.use('/api/bet-predictions', betPredictionRoutes);
app.use('/api', betOddsRoutes);



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
