// import { findOne, find } from '../models/BetOdds.js';
import BetOdds from '../models/BetOdds.js';




// Get betting odds for a specific game by teams and date
export async function getOddsByGame(req, res) {
    const { homeTeam, awayTeam, gameDate } = req.params;

    try {
        const odds = await findOne({
            homeTeam,
            awayTeam,
            gameDate: new Date(gameDate) // Ensure date format matches
        });

        if (!odds) {
            return res.status(404).json({ message: "Odds not found for this game." });
        }

        res.status(200).json(odds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all odds for a given team across all games
export async function getOddsByTeam(req, res) {
    const { team } = req.params;

    try {
        const odds = await find({
            $or: [{ homeTeam: team }, { awayTeam: team }]
        });

        if (!odds.length) {
            return res.status(404).json({ message: "No odds found for this team." });
        }

        res.status(200).json(odds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
