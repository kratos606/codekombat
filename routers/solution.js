const router = require('express').Router();
const { getSolution } = require('../controllers/solution');
const { verifyToken } = require('../middlewares/verifyToken');

router.get('/:id', verifyToken, getSolution);

module.exports = router