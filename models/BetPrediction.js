const mongoose = require('mongoose');

const betPredictionSchema = new mongoose.Schema({
    betType: String,   // e.g., 'win', 'loss', 'pointSpread'
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },  // Link to a player (optional)
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },      // Link to a team (optional)
    successRate: Number,   // Predicted success rate as a percentage (e.g., 75 for 75%)
    odds: Number,          // Current odds for the bet
    lastUpdated: { type: Date, default: Date.now }  // Timestamp for last update
});

module.exports = mongoose.model('BetPrediction', betPredictionSchema);
