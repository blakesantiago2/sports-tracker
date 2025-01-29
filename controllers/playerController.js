import Player from '../models/Player.js';
import mongoose from 'mongoose';
// //update player information 
//  @param {Object} req //- Request object.
//  @param {Object} res //- Response object.

// Get all players
export async function getAllPlayers(req, res) {
    try {
        const players = await Player.find();
        res.status(200).json(players);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get a player by ID
export async function getPlayerById(req, res) {
    try {
        const player = await Player.findById(req.params.playerId);
        if (!player) return res.status(404).json({ message: 'Player not found' });
        res.status(200).json(player);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// export async function updatePlayer(req, res) {
//     try {
//         const { playerId } = req.params; // Extract playerId from the route
//         const updateData = req.body; // Data sent from the client

//         // Find and update the player
//         const updatedPlayer = await Player.findByIdAndUpdate(playerId, updateData, {
//             new: true, // Return the updated document
//             runValidators: true, // Ensure validation rules are applied
//         });

//         if (!updatedPlayer) {
//             return res.status(404).json({ message: 'Player not found' });
//         }

//         res.status(200).json({
//             message: 'Player updated successfully',
//             player: updatedPlayer,
//         });
//     } catch (error) {
//         console.error('Error updating player:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// ✅ Add a new player
export const addPlayer = async (req, res) => {
    try {
        const { name, team, position, stats } = req.body;

        // Create a new player document
        const newPlayer = new Player({ name, team, position, stats });
        await newPlayer.save();

        res.status(201).json({ message: 'Player created successfully', player: newPlayer });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



// Update player by ID
export async function updatePlayer(req, res) {
    try {
        const { playerId } = req.params; 
        const updateData = req.body; 

        if (!mongoose.Types.ObjectId.isValid(playerId)) {
            return res.status(400).json({ message: 'Invalid player ID format' });
        }

        const updatedPlayer = await Player.findByIdAndUpdate(
            playerId,
            { ...updateData, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!updatedPlayer) {
            return res.status(404).json({ message: 'Player not found' });
        }

        res.status(200).json({
            message: 'Player updated successfully',
            player: updatedPlayer,
        });
    } catch (error) {
        console.error('Error updating player:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Update player by an attribute (e.g., name, team)
export async function updatePlayerByAttribute(req, res) {
    try {
        const { searchKey, searchValue, updateData } = req.body; // Accept a unique key-value pair

        if (!searchKey || !searchValue) {
            return res.status(400).json({ message: 'Search key and value are required' });
        }

        const filter = { [searchKey]: searchValue }; // Dynamic filter
        const updatedPlayer = await Player.findOneAndUpdate(filter, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedPlayer) {
            return res.status(404).json({ message: 'Player not found' });
        }

        res.status(200).json({
            message: 'Player updated successfully',
            player: updatedPlayer,
        });
    } catch (error) {
        console.error('Error updating player:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}
