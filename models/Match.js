// import { Schema, model } from 'mongoose';

import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({

    homeTeam: {type: String, required: true, trim: true},
    awayTeam: {type: String, required: true, trim: true},
    homeScore: {type: String, required: false, trim: true},
    awayScore: {type: String, required: false, trim: true},
    date: {type: Date, required: true},
    status:{type: String, enum: ['scheduled', 'ongoing', 'completed'], default: 'scheduled'},//current status of game 
     
}, { timestamps: true });




// export default model('match', matchSchema);

const Match = mongoose.model('Match', matchSchema);

export default Match;
