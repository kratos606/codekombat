const router = require('express').Router();
const { getUsers, getUserById, update, updateUser, remove, getCertificate, checkCertificate } = require('../controllers/user');
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../middlewares/verifyToken')

router.get('/', verifyTokenAndAdmin, getUsers);
router.get('/certificate', verifyToken, getCertificate);
router.get('/:id', verifyTokenAndAuthorization, getUserById);
router.put('/:id', verifyTokenAndAuthorization, update);
router.put('/admin/:id', verifyTokenAndAdmin, updateUser);
router.delete('/:id', verifyTokenAndAuthorization, remove);
router.get('/certificate/:username', checkCertificate);

module.exports = router;