const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// const upload = multer({ dest: 'uploads/' });

const { signup, verifyEmail, login, home, profileChange, logout } = require('../controllers/authController');
// const { userSignupValidator, userLoginValidator } = require('../validators/authValidator');
const { userAuthMiddleware } = require('../middlewares/userAuthMiddlewares');
// const { registerUser } = require('../controllers/registerUser');
// const { checkEmail } = require('../controllers/checkEmail');
// const { checkPassword } = require('../controllers/checkPassword');
// const { userDetails } = require('../controllers/userDetails');
// const { logout } = require('../controllers/logout');
// const { updateUserDetails } = require('../controllers/updateUserDetails');

router.post('/signup', signup);
router.post('/verifyEmail', verifyEmail);
router.post('/login', login);
router.post('/logout', logout);
router.get('/home', userAuthMiddleware, home);
// router.get('/home', home);
router.post('/profileChange', upload.single('image'), profileChange);

// router.post('/register', registerUser);
// router.post('/email', checkEmail);
// router.post('/password', checkPassword);
// router.get('/user-details', userDetails);
// router.get('/logout', logout);
// router.post('/update-user', updateUserDetails);

module.exports = router;
