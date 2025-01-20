// const mongoose = require('mongoose');

// const gameStatsSchema = new mongoose.Schema({
//     player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
//     team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
//     pointsScored: Number,
//     rebounds: Number,
//     assists: Number,
//     gameDate: Date,
//     outcome: String, // win, loss
// });

// module.exports = mongoose.model('GameStats', gameStatsSchema);

// models/GameStats.js
// import { Schema, model } from 'mongoose';
import mongoose from "mongoose";

const { Schema, model} = mongoose; // Destructure Schema from mongoose

const gameStatsSchema = new Schema({
    player: { type: Schema.Types.ObjectId, ref: 'Player' }, // Reference to player
    team: { type: Schema.Types.ObjectId, ref: 'Team' },     // Team the player belongs to
    opponentTeam: { type: Schema.Types.ObjectId, ref: 'Team' }, // Opponent team
    gameDate: Date,   // Date of the game
    points: Number,   // Points scored by the player
    rebounds: Number, // Rebounds made by the player
    assists: Number,  // Assists made by the player
    outcome: String   // 'win' or 'loss'
});

const GameStats = model('GameStats', gameStatsSchema);
// export default model('GameStats', gameStatsSchema);

export default GameStats;