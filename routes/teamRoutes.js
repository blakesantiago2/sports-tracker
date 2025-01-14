const express = require('express');
const { getTeams, getTeamById, createTeam } = require('../controllers/teamController');

const router = express.Router();

// Route for getting all teams
router.get('/', getTeams);

// Route for getting a specific team by ID
router.get('/:teamId', getTeamById);

// Route for creating a new team
router.post('/', createTeam);

module.exports = router;
