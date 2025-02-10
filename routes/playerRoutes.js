import { Router } from 'express';
const router = Router();
import { getAllPlayers, getPlayerById, updatePlayer, updatePlayerByAttribute, addPlayer } from '../controllers/playerController.js';



router.post('/', addPlayer);
router.get('/', getAllPlayers);

router.get('/:playerId', getPlayerById);
router.put('/:playerId', updatePlayer);

router.put('/', updatePlayerByAttribute);

router.get("/:id", async (req, res) => {
    try {
      const player = await Player.findById(req.params.id);
      if (!player) return res.status(404).json({ message: "Player not found" });
  
      res.json(player);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default router;