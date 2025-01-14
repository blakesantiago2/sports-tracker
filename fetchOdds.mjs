// const fetch = require('node-fetch');
// console.log('API Key:', process.env.ODDS_API_KEY);

// const url = 'https://api.the-odds-api.com/v4/sports/?apiKey=' + process.env.ODDS_API_KEY;

// async function fetchOdds() {
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.error('Error fetching odds data:', error);
//     }
// }

// fetchOdds();


import fetch from 'node-fetch';

import dotenv from 'dotenv';
dotenv.config();


const url = `https://api.the-odds-api.com/v4/sports/?apiKey=${process.env.ODDS_API_KEY}`;

async function fetchOdds() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching odds data:', error);
    }
}

fetchOdds();
 