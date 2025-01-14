const express = require('express');
const mongoose = require('./config/db'); // MongoDB connection
const teamRoutes = require('./routes/teamRoutes');
const playerRoutes = require('./routes/playerRoutes');
const matchRoutes = require('./routes/matchRoutes');
const cronJobs = require('./cron/updateSuccessRates');
const performanceRoutes = require('./routes/performanceRoutes');
const betPredictionRoutes = require('./routes/betPredictionRoutes')
const betOddsRoutes = require('./routes/betOddsRoutes');
const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

const betRoutes = require('./routes/betRoutes');
const BetPrediction = require('./models/BetPrediction');
app.use('/api/bets', betRoutes);

// Use the routes
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api', performanceRoutes);
app.use('/api', betRoutes);
app.use('/api', betPredictionRoutes);
app.use('/api', betOddsRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
