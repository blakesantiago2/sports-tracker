// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/homePage.js';
// import PlayerPage from './pages/playerPage.js';
// import GameStats from "./components/GameStats.js"
// import BettingOdds from "./components/BettingOdds.js";
// import './styles.css';  // Global styles

// const App = () => {
//   return (
//     <Router>
//         <div className="container">
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/player/:id" element={<PlayerPage />} />
//       </Routes>
//       <GameStats />
//       </div>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/homePage.js";
import PlayerPage from "./pages/playerPage.js";
import Navbar from "./components/Navbar.js";
import GameStats from "./components/GameStats.js";
import BettingOdds from "./components/BettingOdds.js";
import "./styles.css"; // Global styles

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar always visible */}
      <MainContent /> {/* Handles conditional rendering */}
    </Router>
  );
};

// This function controls what components are displayed on different pages
const MainContent = () => {
  const location = useLocation(); // Get the current URL path

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/players" element={<PlayerPage />} />
      </Routes>

      {/* Show GameStats and BettingOdds only on HomePage */}
      {location.pathname === "/" && (
        <>
          <GameStats />
          <BettingOdds 
            homeTeam="Philadelphia Eagles" 
            awayTeam="Kansas City Chiefs" 
            gameDate="2025-02-09" 
          />
        </>
      )}
    </div>
  );
};

export default App;
