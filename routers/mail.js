const router = require('express').Router();
const { getMails, createMail } = require('../controllers/mail');

router.get('/', getMails);
router.post('/', createMail);

module.exports = router;