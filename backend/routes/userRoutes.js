const express = require('express');
const {
  updateRoleValidation,
  listUsers,
  updateUserRole,
  deleteUserValidation,
  deleteUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');
const { handleValidation } = require('../middleware/validateMiddleware');

const router = express.Router();

router.use(protect, allowRoles('admin'));

router.get('/', listUsers);
router.put('/:id/role', updateRoleValidation, handleValidation, updateUserRole);
router.delete('/:id', deleteUserValidation, handleValidation, deleteUser);

module.exports = router;
