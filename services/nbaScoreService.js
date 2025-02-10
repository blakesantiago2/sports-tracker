// services/fetchGames.js
// import fetch from 'node-fetch';
// import GameStats from '../models/GameStats.js';

// const API_BASE_URL = 'https://api.the-odds-api.com/v4/sports';
// const API_KEY = '8aaa395753ffa30c5587f98eff28f4e6';

// /**
//  * Fetch and save games for a specific sport.
//  * @param {string} sportKey - The sport key (e.g., "basketball_nba").
//  */
// export default async function fetchAndSaveGames(sportKey) {
//     try {
//         console.log(`Fetching games for sport: ${sportKey}...`);

//         const url = `${API_BASE_URL}/${sportKey}/scores/?apiKey=${API_KEY}&daysFrom=3&dateFormat=iso`;
//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error(`API call failed with status: ${response.statusText}`);
//         }

//         const games = await response.json();

//         // Save or update games in MongoDB
//         for (const game of games) {
//             const existingGame = await GameStats.findOne({ id: game.id });

//             if (!existingGame) {
//                 await GameStats.create({
//                     id: game.id,
//                     sportKey: game.sport_key,
//                     sportTitle: game.sport_title,
//                     commenceTime: game.commence_time,
//                     completed: game.completed,
//                     homeTeam: game.home_team,
//                     awayTeam: game.away_team,
//                     scores: game.scores.map(score => ({
//                         name: score.name,
//                         score: parseInt(score.score, 10),
//                     })),
//                     lastUpdate: game.last_update,
//                 });
//                 console.log(`Saved new game: ${game.home_team} vs ${game.away_team}`);
//             } else {
//                 console.log(`Game already exists: ${game.home_team} vs ${game.away_team}`);
//             }
//         }

//         console.log('Games fetched and saved successfully.');
//     } catch (error) {
//         console.error('Error fetching and saving games:', error.message);
//     }
// }

// services/fetchGames.js
import fetch from 'node-fetch';
import GameStats from '../models/GameStats.js';

const API_BASE_URL = 'https://api.the-odds-api.com/v4/sports';
const API_KEY = '8aaa395753ffa30c5587f98eff28f4e6';

/**
 * Fetch and save games for a specific sport.
 * @param {string} sportKey - The sport key (e.g., "basketball_nba").
 */
// export default async function fetchAndSaveGames(sportKey) {
//     try {
//         console.log(`Fetching games for sport: ${sportKey}...`);

//         const url = `${API_BASE_URL}/${sportKey}/scores/?apiKey=${API_KEY}&daysFrom=3&dateFormat=iso`;
//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error(`API call failed with status: ${response.statusText}`);
//         }

//         const games = await response.json();

//         if (!Array.isArray(games) || games.length === 0) {
//             console.log('No games found in the API response.');
//             return;
//         }

//         // Save or update games in MongoDB
//         for (const game of games) {
//             const existingGame = await GameStats.findOne({ id: game.id });

//             if (!existingGame) {
//                 await GameStats.create({
//                     id: game.id,
//                     sportKey: game.sport_key,
//                     sportTitle: game.sport_title,
//                     commenceTime: game.commence_time,
//                     completed: game.completed,
//                     homeTeam: game.home_team,
//                     awayTeam: game.away_team,
//                     // Check if `scores` is an array before mapping
//                     scores: Array.isArray(game.scores)
//                         ? game.scores.map(score => ({
//                               name: score.name || 'Unknown',
//                               score: parseInt(score.score, 10) || 0, // Default to 0 if score is invalid
//                           }))
//                         : [], // Default to an empty array if `scores` is null or not an array
//                     lastUpdate: game.last_update,
//                 });
//                 console.log(`Saved new game: ${game.home_team} vs ${game.away_team}`);
//             } else {
//                 console.log(`Game already exists: ${game.home_team} vs ${game.away_team}`);
//             }
//         }

//         console.log('Games fetched and saved successfully.');
//     } catch (error) {
//         console.error('Error fetching and saving games:', error.message);
//     }
// }

export default async function fetchAndSaveGames(sportKey) {
    try {
        console.log(`Fetching games for sport: ${sportKey}...`);

        const url = `${API_BASE_URL}/${sportKey}/scores/?apiKey=${API_KEY}&daysFrom=3&dateFormat=iso`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.statusText}`);
        }

        const games = await response.json();

        // Log the API response before saving
        console.log("API Response:", JSON.stringify(games, null, 2));

        if (!Array.isArray(games) || games.length === 0) {
            console.log("No games found in the API response.");
            return;
        }

        for (const game of games) {
            if (!game.home_team || !game.away_team || !game.commence_time || !game.sport_title || !game.sport_key) {
                console.error("Skipping invalid game data:", game);
                continue;
            }

            const existingGame = await GameStats.findOne({ id: game.id });

            if (!existingGame) {
                await GameStats.create({
                    id: game.id,
                    sport_key: game.sport_key,
                    sport_title: game.sport_title,
                    commence_time: game.commence_time,
                    completed: game.completed,
                    home_team: game.home_team,
                    away_team: game.away_team,
                    scores: game.scores?.map(score => ({
                        name: score.name || "Unknown",
                        score: parseInt(score.score, 10) || 0,
                    })) || [],
                    lastUpdate: game.last_update,
                });

                console.log(`Saved new game: ${game.home_team} vs ${game.away_team}`);
            } else {
                console.log(`Game already exists: ${game.home_team} vs ${game.away_team}`);
            }
        }

        console.log("Games fetched and saved successfully.");
    } catch (error) {
        console.error("Error fetching and saving games:", error.message);
    }
}
