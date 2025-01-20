import express from 'express';
import { getTeams, getTeamById, createTeam } from '../controllers/teamController.js';
import { fetchNFLDataController } from '../controllers/teamController.js';


import { getTeamDetails } from '../controllers/betController.js';
const router = express.Router();


// Define a route for fetching NFL data
router.get('/nfl-data', fetchNFLDataController);
router.get('/team/:teamId', getTeamDetails); // Example route to fetch team details

// Route for getting all teams
router.get('/', getTeams);

// Route for getting a specific team by ID
router.get('/:id', getTeamById);

// Route for creating a new team
router.post('/', createTeam);

export default router;
