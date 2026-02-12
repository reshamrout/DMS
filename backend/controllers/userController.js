const { body, param } = require('express-validator');
const User = require('../models/User');

const updateRoleValidation = [
  param('id').isMongoId().withMessage('Valid user id is required'),
  body('role').isIn(['admin', 'editor', 'viewer']).withMessage('Invalid role value'),
];

const listUsers = async (_req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      return next(new Error('User not found'));
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      message: 'Role updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserValidation = [param('id').isMongoId().withMessage('Valid user id is required')];

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user._id.toString() === id) {
      res.status(400);
      return next(new Error('You cannot delete your own account'));
    }

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404);
      return next(new Error('User not found'));
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateRoleValidation,
  listUsers,
  updateUserRole,
  deleteUserValidation,
  deleteUser,
};
