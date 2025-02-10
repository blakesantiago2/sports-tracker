import React from 'react';
import { Link } from "react-router-dom";
import "../styles.css";

const HomePage = () => {
    return (
            <div className="header"> {/* Black Border at the Top */}
            <nav className="nav-menu"> 
             <span>Games</span>
             <Link to= "players" className="nav-link">Players</Link> 
             <span>News</span>   
            </nav>
            
            
        </div>
    );
};

export default HomePage;