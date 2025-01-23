// import fetch from 'node-fetch';
// import BetOdds from '../models/BetOdds.js'; // Import the BetOdds model

// const API_BASE_URL = 'https://api.the-odds-api.com/v4/sports/americanfootball_nfl';
// const API_KEY = '8aaa395753ffa30c5587f98eff28f4e6';

// /**
//  * Fetch all NFL events and their odds
//  */
// export async function fetchAndSaveAllNflOdds() {
//     try {
//         console.log('Fetching all NFL events...');

//         // Fetch events
//         const eventsUrl = `${API_BASE_URL}/events/?apiKey=${API_KEY}&regions=us&markets=h2h,spreads,totals&oddsFormat=american&bookmarker`;
//         const eventsResponse = await fetch(eventsUrl);

//         if (!eventsResponse.ok) {
//             throw new Error(`Failed to fetch events: ${eventsResponse.statusText}`);
//         }

//         const events = await eventsResponse.json();

//         if (events.length === 0) {
//             console.log('No NFL events found.');
//             return;
//         }

//         console.log(`Found ${events.length} events. Fetching odds...`);

//         // Process each event
//         for (const event of events) {
//             const { commence_time, home_team, away_team, bookmakers } = event;

//             if (!bookmakers || bookmakers.length === 0) {
//                 console.log(`No bookmakers data available for event: ${home_team} vs ${away_team}`);
//                 continue;
//             }

//             const oddsData = {
//                 gameDate: commence_time,
//                 homeTeam: home_team,
//                 awayTeam: away_team,
//                 moneyline: {
//                     home: bookmakers[0]?.markets.find(m => m.key === 'moneyline')?.outcomes.find(o => o.name === home_team)?.price || null,
//                     away: bookmakers[0]?.markets.find(m => m.key === 'moneyline')?.outcomes.find(o => o.name === away_team)?.price || null,
//                 },
//                 spread: {
//                     home: bookmakers[0]?.markets.find(m => m.key === 'spreads')?.outcomes.find(o => o.name === home_team)?.point || null,
//                     away: bookmakers[0]?.markets.find(m => m.key === 'spreads')?.outcomes.find(o => o.name === away_team)?.point || null,
//                 },
//                 total: {
//                     over: bookmakers[0]?.markets.find(m => m.key === 'totals')?.outcomes.find(o => o.name === 'Over')?.price || null,
//                     under: bookmakers[0]?.markets.find(m => m.key === 'totals')?.outcomes.find(o => o.name === 'Under')?.price || null,
//                 },
//             };

//             // Check if odds already exist in the database
//             const existingBetOdds = await BetOdds.findOne({
//                 gameDate: commence_time,
//                 homeTeam: home_team,
//                 awayTeam: away_team,
//             });

//             if (!existingBetOdds) {
//                 await BetOdds.create(oddsData);
//                 console.log(`Saved odds for: ${home_team} vs ${away_team}`);
//             } else {
//                 console.log(`Odds already exist for: ${home_team} vs ${away_team}`);
//             }
//         }

//         console.log('All NFL odds have been fetched and saved.');
//     } catch (error) {
//         console.error('Error fetching and saving NFL odds:', error.message);
//     }
// }

// export default fetchAndSaveAllNflOdds;

// import fetch from 'node-fetch';
// import BetOdds from '../models/BetOdds.js'; // Import the BetOdds model

// const API_BASE_URL = 'https://api.the-odds-api.com/v4/sports/americanfootball_nfl';
// const API_KEY = '8aaa395753ffa30c5587f98eff28f4e6';
// const TARGET_BOOKMAKER = 'fanduel'; // Specify the bookmaker you want to use

// /**
//  * Fetch all NFL events and their odds for a specific bookmaker
//  */
// export async function fetchAndSaveAllNflOdds() {
//     try {
        // console.log('Fetching all NFL events...');

//         // Fetch events
//         const eventsUrl = `${API_BASE_URL}/events/?apiKey=${API_KEY}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`;
//         const eventsResponse = await fetch(eventsUrl);

//         if (!eventsResponse.ok) {
//             throw new Error(`Failed to fetch events: ${eventsResponse.statusText}`);
//         }

//         const events = await eventsResponse.json();

//         if (events.length === 0) {
//             console.log('No NFL events found.');
//             return;
//         }

//         console.log(`Found ${events.length} events. Fetching odds for ${TARGET_BOOKMAKER}...`);

//         // Process each event
//         for (const event of events) {
//             const { commence_time, home_team, away_team, bookmakers } = event;

//             // Find the specific bookmaker data
//             const bookmaker = bookmakers.find(b => b.key === TARGET_BOOKMAKER);

//             if (!bookmaker) {
//                 console.log(`No ${TARGET_BOOKMAKER} data available for event: ${home_team} vs ${away_team}`);
//                 continue;
//             }

//             const moneylineMarket = bookmaker.markets?.find(m => m.key === 'h2h');
//             const spreadsMarket = bookmaker.markets?.find(m => m.key === 'spreads');
//             const totalsMarket = bookmaker.markets?.find(m => m.key === 'totals');

//             const oddsData = {
//                 gameDate: commence_time,
//                 homeTeam: home_team,
//                 awayTeam: away_team,
//                 moneyline: {
//                     home: moneylineMarket?.outcomes?.find(o => o.name === home_team)?.price || null,
//                     away: moneylineMarket?.outcomes?.find(o => o.name === away_team)?.price || null,
//                 },
//                 spread: {
//                     home: spreadsMarket?.outcomes?.find(o => o.name === home_team)?.point || null,
//                     away: spreadsMarket?.outcomes?.find(o => o.name === away_team)?.point || null,
//                 },
//                 total: {
//                     over: totalsMarket?.outcomes?.find(o => o.name === 'Over')?.price || null,
//                     under: totalsMarket?.outcomes?.find(o => o.name === 'Under')?.price || null,
//                 },
//             };

//             // Check if odds already exist in the database
//             const existingBetOdds = await BetOdds.findOne({
//                 gameDate: commence_time,
//                 homeTeam: home_team,
//                 awayTeam: away_team,
//             });

//             if (!existingBetOdds) {
//                 await BetOdds.create(oddsData);
//                 console.log(`Saved odds for: ${home_team} vs ${away_team} (${TARGET_BOOKMAKER})`);
//             } else {
//                 console.log(`Odds already exist for: ${home_team} vs ${away_team} (${TARGET_BOOKMAKER})`);
//             }
//         }

//         console.log(`All NFL odds for ${TARGET_BOOKMAKER} have been fetched and saved.`);
//     } catch (error) {
//         console.error('Error fetching and saving NFL odds:', error.message);
//     }
// }

// export default fetchAndSaveAllNflOdds;

import fetch from 'node-fetch';
import BetOdds from '../models/BetOdds.js'; // Import your BetOdds model

const API_BASE_URL = 'https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/';
const API_KEY = '8aaa395753ffa30c5587f98eff28f4e6';

/**
 * Fetch and save NFL odds data
 * @param {string} region - The region to fetch odds for (e.g., "us").
 * @param {Array} markets - Array of markets to fetch (e.g., ["h2h", "spreads"]).
 * @param {string} oddsFormat - Format of odds (e.g., "american").
 */
export async function fetchAndSaveAllNflOdds (region = 'us', markets = ['h2h', 'spreads'], oddsFormat = 'american') {
    try {
        console.log('Fetching NFL odds data...');

        // Construct API URL
        const url = `${API_BASE_URL}?apiKey=${API_KEY}&regions=${region}&markets=${markets.join(',')}&oddsFormat=${oddsFormat}`;

        // Fetch data from the API
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.length === 0) {
            console.log('No NFL odds data found.');
            return;
        }

        // Save data into MongoDB
        for (const event of data) {
            const { id, sport_key, commence_time, home_team, away_team, bookmakers } = event;

            const oddsData = {
                eventId: id,
                sportKey: sport_key,
                commenceTime: commence_time,
                homeTeam: home_team,
                awayTeam: away_team,
                bookmakers: bookmakers.map(bookmaker => ({
                    key: bookmaker.key,
                    title: bookmaker.title,
                    last_update: bookmaker.last_update,
                    markets: bookmaker.markets.map(market => ({
                        key: market.key,
                        outcomes: market.outcomes.map(outcome => ({
                            name: outcome.name,
                            price: outcome.price,
                            point: outcome.point || null,
                        })),
                    })),
                })),
            };

            // Check if the data already exists in MongoDB
            const existingOdds = await BetOdds.findOne({
                eventId: id,
                home_team,
                away_team,
            });

            if (!existingOdds) {
                await BetOdds.create(oddsData);
                console.log(`Saved odds for: ${home_team} vs ${away_team}`);
            } else {
                console.log(`Odds already exist for: ${home_team} vs ${away_team}`);
            }
        }

        console.log('NFL odds data fetched and saved successfully.');
    } catch (error) {
        console.error('Error fetching and saving NFL odds:', error.message);
    }
}

export default fetchAndSaveAllNflOdds;