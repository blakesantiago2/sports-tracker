// server.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require('./routes/userRoutes');
const logger = require('./middleware/logger');
const authenticateJWT = require('./middleware/auth');
const { validateBet } = require('./middleware/validation');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

// Initialize Express
const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Middleware imports



app.use(logger);

const betController = require('./controllers/betController');
app.post('/api/bets/place', authenticateJWT, validateBet, betController.placeBet);

app.use(errorHandler);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
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
