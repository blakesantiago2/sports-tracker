// import { Schema, model } from 'mongoose';

// const betOddsSchema = new mongoose.Schema({
//     gameDate: { type: Date, required: true },
//     homeTeam: { type: String, required: true },
//     awayTeam: { type: String, required: true },
//     spread: {
//         home: { type: Number, required: true },
//         away: { type: Number, required: true }
//     },
//     total: {
//         over: { type: Number, required: true },
//         under: { type: Number, required: true }
//     },
//     moneyline: {
//         home: { type: Number, required: true },
//         away: { type: Number, required: true }
//     }
// }, { timestamps: true });

// export default model('BetOdds', betOddsSchema);
import mongoose from 'mongoose'

const outcomeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    point: { type: Number }, // Optional for markets like "spreads"
  });
  
  const marketSchema = new mongoose.Schema({
    key: { type: String, required: true },
    outcomes: [outcomeSchema], // Array of outcomes
  });
  
  const bookmakerSchema = new mongoose.Schema({
    key: { type: String, required: true },
    title: { type: String, required: true },
    last_update: { type: Date, required: true },
    markets: [marketSchema], // Array of markets
  });
  
  const betOddsSchema = new mongoose.Schema({
    eventId: { type: String, required: true },
    sportKey: { type: String, required: true },
    commenceTime: { type: Date, required: true },
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    bookmakers: [bookmakerSchema], // Array of bookmakers
  }, { timestamps: true });
  
  

const BetOdds = mongoose.model('BetOdds', betOddsSchema);

export default BetOdds;










       