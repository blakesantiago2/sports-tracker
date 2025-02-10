// import React, { useEffect, useState } from "react";

// const BettingOdds = ({ homeTeam, awayTeam, gameDate }) => {
//   const [odds, setOdds] = useState(null);
//   const [loading, setLoading] = useState(true);  // Loading state

//   useEffect(() => {
//     const fetchOdds = async () => {
//       try {
//         console.log(" Fetching odds...");
//         const response = await fetch(`http://localhost:5001/api/odds/game/${homeTeam}/${awayTeam}/${gameDate}`);
//         const data = await response.json();

//         if (!response.ok) throw new Error("Failed to fetch odds");

//         console.log("Betting Odds Data (Inside useEffect):", data);
//         setOdds(data);
//       } catch (error) {
//         console.error("Error fetching betting odds:", error);
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchOdds();
//   }, [homeTeam, awayTeam, gameDate]);

//   if (loading) return <p>Loading odds...</p>;
//   if (!odds) return <p>No odds available for this game.</p>;

//   return (
//     <div className="betting-odds-container">
//       <h2>Betting Odds</h2>
//       <p>{odds.homeTeam} vs. {odds.awayTeam}</p>
//       <p>Game Date: {new Date(odds.commenceTime).toLocaleString()}</p>

//       {odds.bookmakers && odds.bookmakers.length > 0 ? (
//         <div className="bookmakers">
//           {odds.bookmakers.map((bookmaker, index) => (
//             <div key={index} className="bookmaker">
//               <h3>{bookmaker.title}</h3>
//               {bookmaker.markets.map((market, i) => (
//                 <div key={i} className="market">
//                   <p>Market: {market.key}</p>
//                   {market.outcomes.map((outcome, j) => (
//                     <div key={j} className="outcome">
//                       <p>{outcome.name}: {outcome.price}</p>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No betting data available.</p>
//       )}
//     </div>
//   );
// };

// export default BettingOdds;


import React, { useEffect, useState } from "react";

const BettingOdds = ({ homeTeam, awayTeam, gameDate }) => {
  const [odds, setOdds] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        console.log("🔍 Fetching odds...");
        const response = await fetch(`http://localhost:5001/api/odds/game/${homeTeam}/${awayTeam}/${gameDate}`);
        const data = await response.json();

        if (!response.ok) throw new Error("Failed to fetch odds");

        console.log("✅ Betting Odds Data (Inside useEffect):", data);
        setOdds(data);
      } catch (error) {
        console.error("❌ Error fetching betting odds:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOdds();
  }, [homeTeam, awayTeam, gameDate]);

  if (loading) return <p>Loading odds...</p>;
  if (!odds || !odds.bookmakers || odds.bookmakers.length === 0) {
    return <p>No odds available for this game.</p>;
  }

  return (
    <div className="betting-odds-container">
      <h2>Betting Odds</h2>
      <p>{odds.homeTeam} vs. {odds.awayTeam}</p>
      <p>Game Date: {new Date(odds.commenceTime).toLocaleString()}</p>

      {odds.bookmakers.map((bookmaker, index) => (
        <div key={index} className="bookmaker">
          <h3>{bookmaker.title}</h3>
          {bookmaker.markets.map((market, i) => (
            <div key={i} className="market">
              <p><strong>Market:</strong> {market.key.toUpperCase()}</p>
              {market.outcomes.map((outcome, j) => (
                <div key={j} className="outcome">
                  <p>{outcome.name}: {outcome.price} {outcome.point !== null ? `(${outcome.point})` : ""}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BettingOdds;

