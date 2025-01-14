const Player = require('../models/Player');

// Get all players
exports.getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find();
        res.status(200).json(players);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a player by ID
exports.getPlayerById = async (req, res) => {
    try {
        const player = await Player.findById(req.params.playerId);
        if (!player) return res.status(404).json({ message: 'Player not found' });
        res.status(200).json(player);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};