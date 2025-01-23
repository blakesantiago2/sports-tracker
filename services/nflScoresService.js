import fetch from 'node-fetch';
import Match from '../models/match.js'; // Import the Match model

const API_URL = 'https://api.the-odds-api.com/v4/sports/americanfootball_nfl/scores/';
const API_KEY = '8aaa395753ffa30c5587f98eff28f4e6'

/**
 * Fetch and save NFL scores
 * @param {number} daysFrom - Number of days to fetch scores for (past/future).
 */
export async function fetchAndSaveNflScores(daysFrom = 3) {
    try {
        console.log('Fetching NFL scores from the API...');

        // Construct API URL with parameters
        const url = `${API_URL}?apiKey=${API_KEY}&daysFrom=${daysFrom}&dateFormat=iso`;

        // Fetch data from the API
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.statusText}`);
        }

        const scores = await response.json();

        // Save scores to MongoDB
        for (const game of scores) {
            // Check if the game already exists in the database
            const existingGame = await Match.findOne({
                date: game.commence_time,
                homeTeam: game.home_team,
                awayTeam: game.away_team,
            });

            if (!existingGame) {
                await Match.create({
                    homeTeam: game.home_team,
                    awayTeam: game.away_team,
                    homeScore: game.scores?.find((s) => s.name === game.home_team)?.score || null,
                    awayScore: game.scores?.find((s) => s.name === game.away_team)?.score || null,
                    date: game.commence_time,
                    status: game.completed ? 'completed' : 'scheduled',
                });
            }
        }

        console.log('NFL scores fetched and saved successfully.');
    } catch (error) {
        console.error('Error fetching and saving NFL scores:', error.message);
    }
}
