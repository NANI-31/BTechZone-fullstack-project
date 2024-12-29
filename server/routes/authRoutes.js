const express = require('express');
const { signup, verifyEmail, login, home } = require('../controllers/authController');
// const { userSignupValidator, userLoginValidator } = require('../validators/authValidator');
const { userAuthMiddleware } = require('../middlewares/userAuthMiddlewares');

const router = express.Router();

router.post('/signup', signup);
router.post('/verifyEmail', verifyEmail);
router.post('/login', login);
// router.get('/home', userAuthMiddleware, home);
router.get('/home', home);

module.exports = router;
