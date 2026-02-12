const express = require('express');
const {
  registerValidation,
  loginValidation,
  register,
  login,
  profile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { handleValidation } = require('../middleware/validateMiddleware');

const router = express.Router();

router.post('/register', registerValidation, handleValidation, register);
router.post('/login', loginValidation, handleValidation, login);
router.get('/profile', protect, profile);

module.exports = router;
