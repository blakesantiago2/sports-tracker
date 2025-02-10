// import React, { useState, useEffect } from "react";

// const GameStats = () => {
//   const [games, setGames] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5001/api/gameStats") // Ensure this is the correct API
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("API Response:", data); // Debugging line to check what API returns
//         setGames(data);
//       })
//       .catch((error) => console.error("Error fetching game stats:", error));
//   }, []);

//   return (
//     <div className="game-stats-container">
//       {games.length > 0 ? (
//         games.map((game, index) => (
//           <div key={index} className="game-card">
//             <p className="status">FINAL</p>

//             {/* Home Team */}
//             <div className="team">
//               <span className="team-name">
//                 {game.homeTeam ?? "Team Name Unavailable"}
//               </span>
//               <span className="team-score">
//                 {game.scores?.[0]?.score ?? "N/A"}
//               </span>
//             </div>

//             {/* Away Team */}
//             <div className="team">
//               <span className="team-name">
//                 {game.awayTeam ?? "Team Name Unavailable"}
//               </span>
//               <span className="team-score">
//                 {game.scores?.[1]?.score ?? "N/A"}
//               </span>
//             </div>

//             {/* Game Time - Ensure it's a valid date */}
//             <div className="game-time">
//               {game.commenceTime
//                 ? new Date(game.commenceTime).toLocaleString("en-US", {
//                     weekday: "short",
//                     year: "numeric",
//                     month: "short",
//                     day: "numeric",
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })
//                 : "Time Unavailable"}
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="loading-message">Loading games...</p>
//       )}
//     </div>
//   );
// };

// export default GameStats;

import React, { useState, useEffect } from "react";

const GameStats = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/gameStats") // Ensure this is correct
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Error fetching game stats:", error));
  }, []);

  return (
    <div className="game-stats-container">
      {games.map((game, index) => {
        // Extract team names and scores safely
        const homeTeam = game.scores?.[0]?.name || "Home Team Unavailable";
        const awayTeam = game.scores?.[1]?.name || "Away Team Unavailable";
        const homeScore = game.scores?.[0]?.score ?? "N/A";
        const awayScore = game.scores?.[1]?.score ?? "N/A";

        // Format game time
        const gameTime = game.commence_time
          ? new Date(game.commence_time).toLocaleString()
          : "Time Unavailable";

        return (
          <div key={index} className="game-card">
            <p className="status">FINAL</p>
            <div className="teams">
              {/* Home Team */}
              <div className="team">
                <span className="team-name">{homeTeam}</span>
                <span className="team-score">{homeScore}</span>
              </div>

              {/* Away Team */}
              <div className="team">
                <span className="team-name">{awayTeam}</span>
                <span className="team-score">{awayScore}</span>
              </div>

              {/* Game Time */}
              <p className="game-time">{gameTime}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GameStats;


