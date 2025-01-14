// models/Bet.js
const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // If you have users
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },  // Player bet
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },  // Team bet
    betType: {
        type: String,
        enum: ['win', 'loss', 'over', 'under', 'pointSpread', 'performance'],
        required: true
    },
    odds: Number,  // Betting odds
    amount: Number,  // Bet amount placed by user
    result: {
        type: String,
        enum: ['pending', 'won', 'lost'],
        default: 'pending'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Bet', betSchema);
