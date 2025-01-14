const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({

    name: {type: String, required: true, trim: true},
    team: {type: String, required: true, trim: true},
    position: {type: String, 
              required: true,
              enum: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
              trim: true
            },
    stats: { gamesPlayed: {type: Number, default: 0}, 
             pointsPerGame: {type: Number, default: 0},
             reboundsPerGame: {type: Number, default: 0},
             assistsPerGame: {type: Number, default: 0},
             stealsPerGame: {type: Number, default: 0},
             blocksPerGame: {type: Number, default: 0},
             fieldGoalPercentage: { type: Number, default: 0},
             freeThrowPercentage: {type: Number, default: 0},
             threePointPercentage: {type: Number, default: 0},
            }        
    

}, { timestamps: true }); 


// const playerSchema = new mongoose.Schema({
//   name: String,
//   team: String,
//   position: String,
//   stats: {
//       pointsPerGame: Number,
//       assistsPerGame: Number,
//       // Additional stats if needed
//   }
// });

module.exports = mongoose.model('Player', playerSchema);