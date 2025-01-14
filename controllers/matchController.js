const match = require('../models/match');

// Get all match
exports.getAllMatches = async (req, res) => {
    try {
        const matches = await match.find();
        res.status(200).json(matches);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a match by ID
exports.getMatchById = async (req, res) => {
    try {
        const match = await match.findById(req.params.matchId);
        if (!match) return res.status(404).json({ message: 'match not found' });
        res.status(200).json(match);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};