
// src/services/playerService.js

export const updatePlayer = async (playerId, updateData) => {
    try {
        const response = await fetch(`http://localhost:5001/api/players/${playerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        if (!response.ok) {
            throw new Error('Failed to update player');
        }

        const result = await response.json();
        console.log('Player updated:', result);
        return result; // Return the updated player data
    } catch (error) {
        console.error('Error updating player:', error.message);
        throw error; // Re-throw the error for handling in the caller
    }
};
