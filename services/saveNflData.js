import fetch from 'node-fetch';
import Team from '../models/Team.js'; // Adjust the path based on your folder structure



const API_URL = 'https://api.the-odds-api.com/v4/sports';
const API_KEY = '8aaa395753ffa30c5587f98eff28f4e6';

export async function fetchNflData() {
    try {
        console.log('Fetching NFL data from the API...');

        // Make API call
        const response = await fetch(`${API_URL}?apiKey=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.statusText}`);
        }

        const sportsData = await response.json();

        // Filter only NFL information
        const nflData = sportsData.filter(sport => sport.key === 'americanfootball_nfl');

        if (nflData.length === 0) {
            console.log('No NFL data found.');
            return nflData;
        }

        // Map API data to your schema
        const teamsToInsert = nflData.map(team => ({
            name: team.title,
            sport: team.group,
            details: team.details,
            active: team.active,
        }));

        // Check if NFL data already exists in MongoDB
        const existingTeams = await Team.find({ sport: 'American Football' });
        if (existingTeams.length === 0) {
            // Insert new NFL data into the database
            await Team.insertMany(teamsToInsert);
            console.log('NFL data successfully saved to MongoDB.');
        } else {
            console.log('NFL data already exists in MongoDB.');
        }
    } catch (error) {
        console.error('Error fetching and saving NFL data:', error);
    }
}
 export default fetchNflData; // Export it as default