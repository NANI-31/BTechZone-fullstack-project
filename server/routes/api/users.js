const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// const upload = multer({ dest: 'uploads/' });

const { profileChange } = require('../../controllers/authController');

router.post('/', upload.single('image'), profileChange);

// const { userSignupValidator, userLoginValidator } = require('../validators/authValidator');
// const { registerUser } = require('../controllers/registerUser');
// const { checkEmail } = require('../controllers/checkEmail');
// const { checkPassword } = require('../controllers/checkPassword');
// const { userDetails } = require('../controllers/userDetails');
// const { logout } = require('../controllers/logout');
// const { updateUserDetails } = require('../controllers/updateUserDetails');
// router.post('/register', registerUser);
// router.post('/email', checkEmail);
// router.post('/password', checkPassword);
// router.get('/user-details', userDetails);
// router.get('/logout', logout);
// router.post('/update-user', updateUserDetails);

module.exports = router;
