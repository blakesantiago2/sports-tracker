// // import Team, { find, findById } from '../models/Team.js';
// import fetchAndSaveNFLData from '../services/saveNflData.js';
import fetchNFLData from '../services/saveNflData.js'; // Example service import
import Team from '../models/Team.js';
// Get all teams
export async function getTeams(req, res) {
    try {
        const teams = await find();
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get a team by ID
export async function getTeamById(req, res) {
    try {
        const team = await findById(req.params.teamId);
        if (!team) return res.status(404).json({ message: 'Team not found' });
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Create a new team
export async function createTeam(req, res) {
    const { name, sport, stadium } = req.body;
    const team = new Team({ name, sport, stadium });

    try {
        const newTeam = await team.save();
        res.status(201).json(newTeam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const fetchNFLDataController = async (req, res) => {
    try {
        const nflData = await fetchNFLData();
        res.status(200).json(nflData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching NFL data', error });
    }
};
// async function fetchNFLDataController(req, res) {
//     try {
//         console.log('Fetching NFL data from the API...');
//         await fetchAndSaveNFLData(); // Fetch and save the data
//         res.status(200).json({ message: 'NFL data successfully fetched and saved.' });
//     } catch (error) {
//         console.error('Error in fetchNFLDataController:', error);
//         res.status(500).json({ error: 'Failed to fetch NFL data.' });
//     }
// }

export default { fetchNFLDataController };