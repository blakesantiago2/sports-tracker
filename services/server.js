// server.js
import { config } from "dotenv";
import express, { json } from "express";
import { connect } from "mongoose";
import userroutes from './services/userroutes.js';
import logger from './middleware/logger';
import authenticateJWT from './middleware/auth';
import { validateBet } from './middleware/validation';
import errorHandler from './middleware/errorHandler';

config();

// Initialize Express
const app = express();

// Middleware to parse JSON data
app.use(json());

// Middleware imports



app.use(logger);

import { placeBet } from './controllers/betController';
app.post('/api/bets/place', authenticateJWT, validateBet, placeBet);

app.use(errorHandler);

// MongoDB Connection
connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection failed:", err));

// Basic route
app.get("/", (req, res) => {
    res.send("Backend API is running");
});

// Set port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
