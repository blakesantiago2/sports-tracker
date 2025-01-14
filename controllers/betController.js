const Bet = require('../models/bet');
const Player = require('../models/Player');
const Team = require('../models/Team');

// Get betting odds for a player
exports.getPlayerOdds = async (req, res) => {
    try {
        const player = await Player.findById(req.params.playerId);
        if (!player) return res.status(404).json({ message: 'Player not found' });
        
        // Calculate odds based on player stats (simplified example)
        const odds = calculatePlayerOdds(player);
        res.status(200).json({ player, odds });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get betting odds for a team
exports.getTeamOdds = async (req, res) => {
    try {
        const team = await Team.findById(req.params.teamId);
        if (!team) return res.status(404).json({ message: 'Team not found' });
        
        // Calculate odds based on team performance (simplified example)
        const odds = calculateTeamOdds(team);
        res.status(200).json({ team, odds });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Place a bet on a player
exports.placePlayerBet = async (req, res) => {
    try {
        const player = await Player.findById(req.params.playerId);
        if (!player) return res.status(404).json({ message: 'Player not found' });

        const bet = new Bet({
            user: req.body.userId,  // Assuming you have a user ID in the request body
            player: player._id,
            betType: req.body.betType,
            odds: req.body.odds,
            amount: req.body.amount
        });
        
        const savedBet = await bet.save();
        res.status(201).json(savedBet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all bets placed by a user
exports.getUserBets = async (req, res) => {
    try {
        const bets = await Bet.find({ user: req.params.userId }).populate('player team');
        res.status(200).json(bets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get the result of a specific bet
exports.getBetResult = async (req, res) => {
    try {
        const bet = await Bet.findById(req.params.betId).populate('player team');
        if (!bet) return res.status(404).json({ message: 'Bet not found' });

        res.status(200).json(bet.result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Place a bet on a team
exports.placeTeamBet = async (req, res) => {
    try {
        const team = await Team.findById(req.params.teamId);
        if (!team) return res.status(404).json({ message: 'Team not found' });

        const bet = new Bet({
            user: req.body.userId,
            team: team._id,
            betType: req.body.betType,
            odds: req.body.odds,
            amount: req.body.amount
        });

        const savedBet = await bet.save();
        res.status(201).json(savedBet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
