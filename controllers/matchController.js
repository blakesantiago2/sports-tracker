// // import { find } from '../models/match.js';

// import Match from '../models/match.js';

// // Get all match
// export async function getAllMatches(req, res) {
//     try {
//         const matches = await find();
//         res.status(200).json(matches);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }

// // Get a match by ID
// export async function getMatchById(req, res) {
//     try {
//         const match = await match.findById(req.params.matchId);
//         if (!match) return res.status(404).json({ message: 'match not found' });
//         res.status(200).json(match);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }



// Get all matches
// export async function getAllMatches(req, res) {
//     try {
//         const matches = await Match.find(); // Use Match.find() to fetch all matches
//         res.status(200).json(matches);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }

// // Get a match by ID
// export async function getMatchById(req, res) {
//     try {
//         const match = await Match.findById(req.params.matchId); // Use Match.findById() correctly
//         if (!match) return res.status(404).json({ message: 'Match not found' });
//         res.status(200).json(match);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }

import Match from '../models/match.js';
// Get all matches
export const getAllMatches = async (req, res) => {
    try {
        const matches = await Match.find();
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching matches', error });
    }
};

// Get a match by ID
export const getMatchById = async (req, res) => {
    try {
        const match = await Match.findById(req.params.matchId);
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }
        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching match', error });
    }
};