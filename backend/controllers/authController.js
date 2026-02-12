const { body } = require('express-validator');
const User = require('../models/User');
const createToken = require('../utils/createToken');

const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 80 }),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/)
    .withMessage('Password must include an uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must include a lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must include a number'),
];

const loginValidation = [
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });

    if (exists) {
      res.status(409);
      return next(new Error('Email already in use'));
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'none',
    });

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      token: createToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(404);
      return next(new Error('User not found'));
    }

    if (!(await user.matchPassword(password))) {
      res.status(401);
      return next(new Error('Invalid credentials'));
    }

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      token: createToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res) => {
  res.status(200).json({ user: req.user });
};

module.exports = {
  registerValidation,
  loginValidation,
  register,
  login,
  profile,
};
