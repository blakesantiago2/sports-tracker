import { Router } from 'express';
const router = Router();
import { getAllPlayers, getPlayerById } from '../controllers/playerController.js';


router.get('/', getAllPlayers);

router.get('/: playerId', getPlayerById);






export default router;