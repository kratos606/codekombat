const router = require('express').Router();
const passport = require('../middlewares/passport')
const { loginController, registerController, checkController, logoutController, googleLoginController, googleLoginCallback, faceookLoginController, facebookLoginCallback, githubLoginCallback, githubLoginController } = require('../controllers/auth');
const { verifyToken } = require('../middlewares/verifyToken');

router.post('/login', loginController);
router.post('/register', registerController);
router.get('/check', checkController);
router.get('/logout', verifyToken, logoutController);
router.get('/google-login', googleLoginController);
router.get('/google-login/callback', passport.authenticate('google', { session: false, failureRedirect: 'http://localhost/login' }), googleLoginCallback);
router.get('/facebook-login', faceookLoginController);
router.get('/facebook-login/callback', passport.authenticate('facebook', { session: false, failureRedirect: 'http://localhost/login' }), facebookLoginCallback);
router.get('/github-login', githubLoginController);
router.get('/github-login/callback', passport.authenticate('github', { failureRedirect: 'http://localhost/login', session: false }), githubLoginCallback);

module.exports = router;