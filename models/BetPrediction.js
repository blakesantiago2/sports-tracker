// import { Schema, model } from 'mongoose';
import mongoose from "mongoose";

const { Schema, model } = mongoose; // Import Schema and model
const betPredictionSchema = new Schema ({
    betType: String,   // e.g., 'win', 'loss', 'pointSpread'
    player: { type: Schema.Types.ObjectId, ref: 'Player' },  // Link to a player (optional)
    team: { type: Schema.Types.ObjectId, ref: 'Team' },      // Link to a team (optional)
    successRate: Number,   // Predicted success rate as a percentage (e.g., 75 for 75%)
    odds: Number,          // Current odds for the bet
    lastUpdated: { type: Date, default: Date.now }  // Timestamp for last update
});

//export default model('BetPrediction', betPredictionSchema);

const BetPrediction = model('BetPrediction', betPredictionSchema); // Define the model

export default BetPrediction; // Export the model
