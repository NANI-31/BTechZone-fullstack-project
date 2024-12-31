const express = require('express');
const { signup, verifyEmail, login, home } = require('../controllers/authController');
// const { userSignupValidator, userLoginValidator } = require('../validators/authValidator');
const { userAuthMiddleware } = require('../middlewares/userAuthMiddlewares');
const { registerUser } = require('../controllers/registerUser');
const { checkEmail } = require('../controllers/checkEmail');
const { checkPassword } = require('../controllers/checkPassword');
const { userDetails } = require('../controllers/userDetails');

const router = express.Router();

router.post('/signup', signup);
router.post('/verifyEmail', verifyEmail);
router.post('/login', login);
// router.get('/home', userAuthMiddleware, home);
router.get('/home', home);

router.post('/register', registerUser);
router.post('/email', checkEmail);
router.post('/password', checkPassword);
router.get('/user-details', userDetails);

module.exports = router;
