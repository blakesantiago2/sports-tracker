const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({

    homeTeam: {type: String, required: true, trim: true},
    awayTeam: {type: String, required: true, trim: true},
    homeScore: {type: String, required: true, trim: true},
    awayScore: {type: String, required: true, trim: true},
    date: {type: Date, required: true},
    status:{type: String, enum: ['Scheduled', 'Ongoing', 'Completed'], default: 'Scheduled'},//current status of game 
     
}, { timestamps: true });




module.exports = mongoose.model('match', matchSchema);