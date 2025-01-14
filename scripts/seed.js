const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const Player = require('../models/Player');
const Team = require('../models/Team');
const GameStats = require('../models/GameStats');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

const seedData = async () => {
    try {
        // Clear existing data
        await Player.deleteMany({});
        await Team.deleteMany({});
        await GameStats.deleteMany({});

        // Add sample teams
        const teamA = await Team.create({ name: 'Team A', league: 'League 1', wins: 15, losses: 8, sport: 'NFL' });
        const teamB = await Team.create({ name: 'Team B', league: 'League 1', wins: 12, losses: 10, sport: 'NFL' });

        // Add sample players for each team
        const player1 = await Player.create({ name: 'Player One', team: teamA._id, position: 'Forward' });
        const player2 = await Player.create({ name: 'Player Two', team: teamB._id, position: 'Guard' });

        // Add sample game stats between Team A and Team B for the past five years
        const sampleGames = [
            { player: player1._id, team: teamA._id, opponentTeam: teamB._id, gameDate: new Date('2020-01-10'), points: 30, rebounds: 8, assists: 5, outcome: 'win' },
            { player: player2._id, team: teamB._id, opponentTeam: teamA._id, gameDate: new Date('2020-01-10'), points: 25, rebounds: 6, assists: 4, outcome: 'loss' },
            { player: player1._id, team: teamA._id, opponentTeam: teamB._id, gameDate: new Date('2021-02-15'), points: 28, rebounds: 9, assists: 7, outcome: 'win' },
            { player: player2._id, team: teamB._id, opponentTeam: teamA._id, gameDate: new Date('2021-02-15'), points: 20, rebounds: 5, assists: 6, outcome: 'loss' }
            // Add more games if needed
        ];

        await GameStats.create(sampleGames);

        console.log("Database seeded with sample data successfully");
    } catch (err) {
        console.error("Error seeding data:", err);
    } finally {
        mongoose.connection.close();
    }
};

seedData();
