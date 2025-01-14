const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sport: { type: String, required: true },
    stadium: { type: String },
    wins: { type: Number},
    losses:{type: Number}
}, { timestamps: true });


// const teamSchema = new mongoose.Schema({
//     name: String,
//     league: String,
//     wins: Number,
//     losses: Number,
//     // Additional team information
// });


module.exports = mongoose.model('Team', teamSchema);
