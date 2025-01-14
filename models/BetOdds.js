const mongoose = require('mongoose');

const betOddsSchema = new mongoose.Schema({
    gameDate: { type: Date, required: true },
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    spread: {
        home: { type: Number, required: true },
        away: { type: Number, required: true }
    },
    total: {
        over: { type: Number, required: true },
        under: { type: Number, required: true }
    },
    moneyline: {
        home: { type: Number, required: true },
        away: { type: Number, required: true }
    }
}, { timestamps: true });

module.exports = mongoose.model('BetOdds', betOddsSchema);
