// import { find } from '../models/GameStats.js';
import GameStats from '../models/GameStats.js';
 import { startOfDay, subYears } from 'date-fns';


// Helper function to calculate averages
const calculateAverages = (games) => {
    const totalPoints = games.reduce((sum, game) => sum + game.points, 0);
    const totalRebounds = games.reduce((sum, game) => sum + game.rebounds, 0);
    const totalAssists = games.reduce((sum, game) => sum + game.assists, 0);

    return {
        averagePoints: totalPoints / games.length,
        averageRebounds: totalRebounds / games.length,
        averageAssists: totalAssists / games.length
    };
};

// Player performance against a specific team
export async function getPlayerPerformance(req, res) {
    try {
        const { playerId, opponentTeamId } = req.params;
        const fiveYearsAgo = subYears(startOfDay(new Date()), 5);

        // Find games played by the player against the opponent in the last 5 years
        const games = await find({
            player: playerId,
            opponentTeam: opponentTeamId,
            gameDate: { $gte: fiveYearsAgo }
        });

        if (games.length === 0) return res.status(404).json({ message: 'No games found for this player against the specified team' });

        // Calculate averages
        const averages = calculateAverages(games);

        res.status(200).json({
            playerId,
            opponentTeamId,
            gamesPlayed: games.length,
            ...averages
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Team performance against a specific team
export async function getTeamPerformance(req, res) {
    try {
        const { teamId, opponentTeamId } = req.params;
        const fiveYearsAgo = subYears(startOfDay(new Date()), 5);

        // Find games played by the team against the opponent in the last 5 years
        const games = await find({
            team: teamId,
            opponentTeam: opponentTeamId,
            gameDate: { $gte: fiveYearsAgo }
        });

        if (games.length === 0) return res.status(404).json({ message: 'No games found for this team against the specified opponent' });

        // Calculate averages and win rate
        const averages = calculateAverages(games);
        const gamesWon = games.filter(game => game.outcome === 'win').length;
        const winRate = (gamesWon / games.length) * 100;

        res.status(200).json({
            teamId,
            opponentTeamId,
            gamesPlayed: games.length,
            winRate,
            ...averages
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
