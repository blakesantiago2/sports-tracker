// models/Bet.js
import { Schema, model } from 'mongoose';

const betSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },  // If you have users
    player: { type: Schema.Types.ObjectId, ref: 'Player' },  // Player bet
    team: { type: Schema.Types.ObjectId, ref: 'Team' },  // Team bet
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

export default model('Bet', betSchema);
