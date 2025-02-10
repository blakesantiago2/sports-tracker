// import React from 'react';
// import { useParams } from 'react-router-dom';

// const PlayerPage = () => {
//   const { id } = useParams();

//   return (
//     <div>
//       <h1>Player Details</h1>
//       <p>Player ID: {id}</p>
//     </div>
//   );
// };

// export default PlayerPage;
import React, { useState, useEffect } from "react";
import "./PlayerPage.css"; // Import styles

const PlayerPage = () => {
  const [players, setPlayers] = useState([]); // Store players
  const [newPlayer, setNewPlayer] = useState({ name: "", team: "", number: "", position: "" });

  // Fetch existing players from API (mocking for now)
  useEffect(() => {
    fetch("http://localhost:5001/api/players") // Adjust API URL if needed
      .then((res) => res.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error("Error fetching players:", error));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setNewPlayer({ ...newPlayer, [e.target.name]: e.target.value });
  };

  // Add new player
  const addPlayer = async (e) => {
    e.preventDefault();
    if (!newPlayer.name || !newPlayer.team || !newPlayer.number || !newPlayer.position) return;

    const response = await fetch("http://localhost:5001/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlayer),
    });

    if (response.ok) {
      const addedPlayer = await response.json();
      setPlayers([...players, addedPlayer]); // Update state dynamically
      setNewPlayer({ name: "", team: "", number: "", position: "" }); // Reset form
    }
  };

  return (
    <div className="players-container">
      <h2>🏀 Add Players </h2>

      {/* Form to add new players */}
      <form onSubmit={addPlayer} className="player-form">
        <input type="text" name="name" placeholder="Player Name" value={newPlayer.name} onChange={handleChange} required />
        <input type="text" name="team" placeholder="Team Name" value={newPlayer.team} onChange={handleChange} required />
        <input type="number" name="number" placeholder="Jersey Number" value={newPlayer.number} onChange={handleChange} required />
        <input type="text" name="position" placeholder="Position" value={newPlayer.position} onChange={handleChange} required />
        <button type="submit">Add Player</button>
      </form>

      {/* Display Player Cards */}
      <div className="players-list">
        {players.map((player) => (
          <div key={player.id} className="player-card">
            <h3>{player.name}</h3>
            <p>🏀 Team: {player.team}</p>
            <p>🎽 Jersey: #{player.number}</p>
            <p>📍 Position: {player.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerPage;

