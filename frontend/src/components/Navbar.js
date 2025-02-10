import React from "react";
import { Link } from "react-router-dom";  // Import Link for navigation

const Navbar = () => {
  return (
    <nav className="header">
      <div className="nav-menu">
        <Link to="/" className="nav-link">Games</Link>
        <span className="nav-item">Odds</span>
        <Link to="/players" className="nav-link">Players</Link>  {/* Make Players Clickable */}
      </div>
    </nav>
  );
};

export default Navbar;
