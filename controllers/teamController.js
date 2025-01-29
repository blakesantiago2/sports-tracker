// // // import Team, { find, findById } from '../models/Team.js';
// // import fetchAndSaveNFLData from '../services/saveNflData.js';
// import fetchNflData from '../services/saveNflData.js'; // Example service import
// import Team from '../models/Team.js';
// // Get all teams
// export async function getTeams(req, res) {
//     try {
//         const teams = await Team.find();
//         res.status(200).json(teams);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// // Get a team by ID
// export async function getTeamById(req, res) {
//     try {
//         const team = await Team.findById(req.params.teamId);
//         if (!team) return res.status(404).json({ message: 'Team not found' });
//         res.status(200).json(team);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// // Create a new team
// export async function createTeam(req, res) {
//     const { name, sport, stadium } = req.body;
//     const team = new Team({ name, sport, stadium });

//     try {
//         const newTeam = await team.save();
//         res.status(201).json(newTeam);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

// export const fetchNFLDataController = async (req, res) => {
//     try {
//         const nflData = await fetchNflData();
//         console.log('fetch NFL data:', nflData)
//         res.status(200).json(nflData);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching NFL data', error });
//     }
// };

import fetchNflData from '../services/saveNflData.js'; // Service import
import Team from '../models/Team.js';

// Get all teams
export const getTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a team by ID
export const getTeamById = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id); // Ensure your route uses :id
        if (!team) return res.status(404).json({ message: 'Team not found' });
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new team
export const createTeam = async (req, res) => {
    const { name, sport, stadium } = req.body;
    const team = new Team({ name, sport, stadium });

    try {
        const newTeam = await team.save();
        res.status(201).json(newTeam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Fetch and Save NFL Data
export const fetchNFLDataController = async (req, res) => {
    try {
        const nflData = await fetchNflData();
        if (!nflData || nflData.length === 0) {
            return res.status(404).json({ message: 'No NFL data found.' });
        }
        res.status(200).json(nflData);
    } catch (error) {
        console.error('Error in fetchNFLDataController:', error.message);
        res.status(500).json({ message: 'An error occurred while fetching NFL data.' });
    }
};

// Export all functions


export default { getTeams, getTeamById, createTeam, fetchNFLDataController };