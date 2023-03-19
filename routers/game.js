const router = require('express').Router();
const { getAllGames, getGameById, getRandomGame, create, update, remove, submit } = require('../controllers/game');
const { verifyToken, verifyTokenAndAdmin } = require('../middlewares/verifyToken')

router.get('/', verifyToken, getAllGames);
router.get('/random', verifyToken, getRandomGame);
router.get('/:id', verifyToken, getGameById);
router.post('/', verifyTokenAndAdmin, create);
router.put('/:id', verifyTokenAndAdmin, update);
router.delete('/:id', verifyTokenAndAdmin, remove);
router.post('/:id/submit', verifyToken, submit);

module.exports = router;