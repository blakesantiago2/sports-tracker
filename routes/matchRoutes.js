import express from 'express';
const router = express.Router();
import { getAllMatches, getMatchById } from '../controllers/matchController.js';


router.get('/mactches', getAllMatches);

router.get('/matches/: matchId', getMatchById);

export default router;    