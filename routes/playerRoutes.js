const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');


router.get('/', playerController.getAllPlayers);

router.get('/: playerId', playerController.getPlayerById);






module.exports = router;