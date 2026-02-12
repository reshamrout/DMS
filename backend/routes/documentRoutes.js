const express = require('express');
const { body } = require('express-validator');
const {
  createValidation,
  listValidation,
  idValidation,
  versionDownloadValidation,
  createDocument,
  listDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
  listVersions,
  downloadCurrent,
  viewCurrent,
  downloadVersion,
} = require('../controllers/documentController');
const { protect } = require('../middleware/authMiddleware');
const { handleValidation } = require('../middleware/validateMiddleware');
const upload = require('../config/multer');

const router = express.Router();

router.use(protect);

router.get('/', listValidation, handleValidation, listDocuments);
router.get('/:id', idValidation, handleValidation, getDocument);
router.get('/:id/view', idValidation, handleValidation, viewCurrent);
router.get('/:id/download', idValidation, handleValidation, downloadCurrent);
router.get('/:id/versions', idValidation, handleValidation, listVersions);
router.get('/:id/versions/:version/download', versionDownloadValidation, handleValidation, downloadVersion);

router.post(
  '/',
  upload.single('file'),
  createValidation,
  handleValidation,
  createDocument
);

router.put(
  '/:id',
  upload.single('file'),
  idValidation,
  body('title').optional().isLength({ max: 180 }),
  body('description').optional().isLength({ max: 4000 }),
  handleValidation,
  updateDocument
);

router.delete('/:id', idValidation, handleValidation, deleteDocument);

module.exports = router;
