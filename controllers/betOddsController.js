// import { findOne, find } from '../models/BetOdds.js';
import BetOdds from '../models/BetOdds.js';




// Get betting odds for a specific game by teams and date
// export async function getOddsByGame(req, res) {
//     const { homeTeam, awayTeam, gameDate } = req.params;

//     try {
//         const odds = await BetOdds.findOne({
//             homeTeam,
//             awayTeam,
//             gameDate: new Date(gameDate) // Ensure date format matches
//         });

//         if (!odds) {
//             return res.status(404).json({ message: "Odds not found for this game." });
//         }

//         res.status(200).json(odds);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

export async function getOddsByGame(req, res) {
    const { homeTeam, awayTeam, gameDate } = req.params;

    console.log("🔍 Searching for game odds...");
    console.log("Home Team:", homeTeam);
    console.log("Away Team:", awayTeam);
    console.log("Game Date:", gameDate);

    try {
        const odds = await BetOdds.findOne({
            homeTeam: homeTeam,
            awayTeam: awayTeam,
            commenceTime: { 
                $gte: new Date(gameDate),  // Find games on or after this date
                $lt: new Date(new Date(gameDate).setDate(new Date(gameDate).getDate() + 1)) // Same day range
            }
        });

        if (!odds) {
            console.log("❌ No odds found for this game.");
            return res.status(404).json({ message: "Odds not found for this game." });
        }

        console.log("✅ Found odds:", odds);
        res.status(200).json(odds);
    } catch (error) {
        console.error("🔥 Error fetching odds:", error.message);
        res.status(500).json({ message: error.message });
    }
}


// Get all odds for a given team across all games
export async function getOddsByTeam(req, res) {
    const { team } = req.params;

    try {
        const odds = await BetOdds.find({
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
