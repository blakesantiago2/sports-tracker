const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const BetOdds = require('../models/BetOdds');
dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

async function fetchAndSaveOdds() {
    try {
        const response = await axios.get(`https://api.example.com/odds`, {
            headers: { 'api-key': process.env.env.ODDS_API_KEY }
        });
        const oddsData = response.data;

        for (const game of oddsData.games) {
            const existingOdds = await BetOdds.findOne({
                homeTeam: game.homeTeam,
                awayTeam: game.awayTeam,
                gameDate: new Date(game.gameDate)
            });

            if (!existingOdds) {
                await BetOdds.create({
                    gameDate: game.gameDate,
                    homeTeam: game.homeTeam,
                    awayTeam: game.awayTeam,
                    spread: { home: game.spread.home, away: game.spread.away },
                    total: { over: game.total.over, under: game.total.under },
                    moneyline: { home: game.moneyline.home, away: game.moneyline.away }
                });
            }
        }

        console.log("Odds data fetched and stored.");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error fetching odds data:", error);
    }
}

fetchAndSaveOdds();
