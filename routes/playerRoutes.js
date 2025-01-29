import { Router } from 'express';
const router = Router();
import { getAllPlayers, getPlayerById, updatePlayer, updatePlayerByAttribute, addPlayer } from '../controllers/playerController.js';



router.post('/', addPlayer);
router.get('/', getAllPlayers);

router.get('/:playerId', getPlayerById);
router.put('/:playerId', updatePlayer);

router.put('/', updatePlayerByAttribute);



export default router;