// import Bet, { find, findById } from '../models/bet.js';
// import { findById as _findById } from '../models/Player.js';
// import { findById as __findById } from '../models/Team.js';
import Player from '../models/Player.js';
import Bet from '../models/Bet.js';
import Team from '../models/Team.js';
// Get betting odds for a player
export const getPlayerOdds = async (req, res) => {
    try {
        // Fetch the player by ID from the database
        const player = await Player.findById(req.params.playerId); // Assuming 'Player' is your Mongoose model
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }

        // Calculate odds based on player stats (this function must be defined elsewhere)
        const odds = calculatePlayerOdds(player);

        // Send the response with player info and calculated odds
        res.status(200).json({ player, odds });
    } catch (err) {
        // Handle any server errors
        res.status(500).json({ message: err.message });
    }
};


// Get betting odds for a team
export const getTeamOdds = async (req, res) => {
    try {
        const team = await __findById(req.params.teamId);
        if (!team) return res.status(404).json({ message: 'Team not found' });
        
        // Calculate odds based on team performance (simplified example)
        const odds = calculateTeamOdds(team);
        res.status(200).json({ team, odds });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Place a bet on a player
export const placePlayerBet = async (req, res) => {
    try {
        const player = await _findById(req.params.playerId);
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
}

// Get all bets placed by a user
export const getUserBets = async (req, res) => {
    try {
        const bets = await find({ user: req.params.userId }).populate('player team');
        res.status(200).json(bets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


// Place a bet on a team
export const placeTeamBet = async (req, res) => {
    try {
        const team = await __findById(req.params.teamId);
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
}

export const getBetResult = async (req, res) => {
    try {
        // Example logic to retrieve a bet result
        const betId = req.params.id;
        const bet = await Bet.findById(betId);
        if (!bet) return res.status(404).json({ message: 'Bet not found' });

        res.status(200).json({ result: bet.result });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving bet result', error });
    }
};

export const getTeamDetails = async (req, res) => {
    try {
        const teamId = req.params.teamId; // Extract the team ID from the request parameters
        const team = await Team.findById(teamId); // Assuming you have a Team model

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching team details', error });
    }
};