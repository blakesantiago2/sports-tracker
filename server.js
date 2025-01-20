import dotenv from "dotenv";
import express, { json } from 'express';
// const mongoose = require('./config/db'); // MongoDB connection
import { connect } from 'mongoose';
import teamRoutes from './routes/teamRoutes.js';
import playerRoutes from './routes/playerRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import scheduleCronJobs from './cron/updateSuccessRates.js';
import betRoutes from './routes/betRoutes.js';
import performanceRoutes from './routes/performanceRoutes.js';
import betPredictionRoutes from './routes/betPredictionRoutes.js';
import betOddsRoutes from './routes/betOddsRoutes.js';
import fetchAndSaveNflData from './services/saveNflData.js';

// const { initializeTeams } = require('./models/Team');
scheduleCronJobs(); // Run the cron jobs
fetchAndSaveNflData(); // Call the function
const app = express();
app.use(express.json());
dotenv.config();
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
         await fetchAndSaveNflData(); // Call the function after connecting
    })
    .catch(err => console.error('MongoDB connection error:', err));



app.use('/api/bets', betRoutes);

// Use the routes
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api', performanceRoutes);
app.use('/api', betRoutes);
app.use('/api', betPredictionRoutes);
app.use('/api', betOddsRoutes);



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
