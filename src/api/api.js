const BASE_URL = 'http://localhost:5000'; // Backend server URL

export const fetchOdds = async () => {
    const response = await fetch(`${BASE_URL}/api/odds`);
    if (!response.ok) {
        throw new Error('Failed to fetch odds');
    }
    return response.json();
};
