const fs = require('fs');
const path = require('path');
const { body, param, query } = require('express-validator');
const Document = require('../models/Document');
const { uploadBuffer, destroyFile, getSignedFileUrl, getSignedDownloadUrl } = require('../config/cloudinary');

const sanitizeTags = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags)) {
    return tags.map((t) => String(t).trim().toLowerCase()).filter(Boolean);
  }
  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
  }
  return [];
};

const sanitizeEmails = (rawEmails) => {
  if (!rawEmails) return [];

  const values = Array.isArray(rawEmails)
    ? rawEmails
    : String(rawEmails)
        .split(',')
        .map((e) => e.trim().toLowerCase());

  const validEmails = values.filter((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  return [...new Set(validEmails)];
};

const toIdString = (value) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (value._id) return value._id.toString();
  return value.toString();
};

const isOwner = (doc, user) => {
  return toIdString(doc.uploadedBy) === toIdString(user._id);
};

const hasViewAccess = (doc, userEmail) => {
  return (doc.viewEmails || []).includes(userEmail) || (doc.editEmails || []).includes(userEmail);
};

const canViewDocument = (doc, user) => {
  const userEmail = String(user.email || '').toLowerCase();
  return isOwner(doc, user) || hasViewAccess(doc, userEmail);
};

const canEditDocument = (doc, user) => {
  const userEmail = String(user.email || '').toLowerCase();
  return isOwner(doc, user) || (doc.editEmails || []).includes(userEmail);
};

const createVersionSnapshot = (doc, actorId) => ({
  version: doc.version,
  title: doc.title,
  description: doc.description,
  tags: doc.tags,
  filePath: doc.filePath,
  fileUrl: doc.fileUrl || doc.filePath,
  originalName: doc.originalName,
  mimeType: doc.mimeType,
  fileSize: doc.fileSize,
  cloudinaryPublicId: doc.cloudinaryPublicId || '',
  cloudinaryResourceType: doc.cloudinaryResourceType || '',
  updatedBy: actorId,
  updatedAt: new Date(),
});

const streamFromUrl = async (url, res, fileName, mimeType, disposition = 'attachment') => {
  let remoteRes;
  try {
    remoteRes = await fetch(url, { redirect: 'follow' });
  } catch (err) {
    err.statusCode = err.statusCode || 502;
    throw err;
  }

  if (!remoteRes.ok) {
    const error = new Error('Failed to retrieve file from Cloudinary');
    error.statusCode = remoteRes.status === 404 ? 404 : 502;
    throw error;
  }

  const contentType = remoteRes.headers.get('content-type') || mimeType || 'application/octet-stream';
  const body = Buffer.from(await remoteRes.arrayBuffer());

  res.setHeader('Content-Type', contentType);
  const safeName = encodeURIComponent(fileName || 'download');
  const contentDisposition =
    disposition === 'inline' ? `inline; filename="${safeName}"` : `attachment; filename="${safeName}"`;
  res.setHeader('Content-Disposition', contentDisposition);
  res.status(200).send(body);
};

const sendDocumentFile = async ({
  pathOrUrl,
  mimeType,
  originalName,
  res,
  cloudinaryPublicId,
  cloudinaryResourceType,
  disposition = 'attachment',
}) => {
  const filePath = String(pathOrUrl || '');
  if (!filePath) {
    const error = new Error('File reference is missing for this document version');
    error.statusCode = 404;
    throw error;
  }

  if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
    try {
      const inferredPublicId = cloudinaryPublicId || inferCloudinaryPublicIdFromUrl(filePath);
      const privateDownloadUrl = getSignedDownloadUrl({
        publicId: inferredPublicId,
        resourceType: cloudinaryResourceType,
      });
      const signedUrl = getSignedFileUrl({
        publicId: inferredPublicId,
        resourceType: cloudinaryResourceType,
      });
      await streamFromUrl(privateDownloadUrl || signedUrl || filePath, res, originalName, mimeType, disposition);
    } catch (error) {
      if (!error.statusCode) error.statusCode = 502;
      throw error;
    }
    return;
  }

  const absolute = path.resolve(filePath);
  if (!fs.existsSync(absolute)) {
    const error = new Error('File not found on storage');
    error.statusCode = 404;
    throw error;
  }

  await new Promise((resolve, reject) => {
    if (disposition === 'inline') {
      res.sendFile(
        absolute,
        {
          headers: {
            'Content-Type': mimeType || 'application/octet-stream',
            'Content-Disposition': `inline; filename="${encodeURIComponent(originalName || 'download')}"`,
          },
        },
        (err) => {
          if (err) {
            err.statusCode = err.statusCode || 500;
            reject(err);
            return;
          }
          resolve();
        }
      );
      return;
    }

    res.download(absolute, originalName || 'download', (err) => {
      if (err) {
        err.statusCode = err.statusCode || 500;
        reject(err);
        return;
      }
      resolve();
    });
  });
};

const resolveFileSource = (value, fallback) => {
  return String(value || fallback || '');
};

const inferCloudinaryPublicIdFromUrl = (url) => {
  const value = String(url || '');
  if (!value.includes('/upload/')) return '';

  const match = value.match(/\/upload\/(?:v\d+\/)?(.+)$/);
  if (!match || !match[1]) return '';

  return decodeURIComponent(match[1]).split('?')[0] || '';
};

const resolveVersionAsset = (doc, versionNum) => {
  const target = doc.versions.find((v) => v.version === versionNum);
  if (!target) return null;

  if (target.filePath) return target;

  if (doc.version === versionNum && doc.filePath) {
    return {
      filePath: doc.filePath,
      mimeType: doc.mimeType,
      originalName: doc.originalName,
    };
  }

  return target;
};

const createValidation = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 180 }),
  body('description').optional().isLength({ max: 4000 }),
];

const listValidation = [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('uploadedBy').optional().isMongoId(),
  query('startDate').optional().isISO8601(),
  query('endDate').optional().isISO8601(),
];

const idValidation = [param('id').isMongoId().withMessage('Valid document id is required')];

const versionDownloadValidation = [
  param('id').isMongoId().withMessage('Valid document id is required'),
  param('version').isInt({ min: 1 }).withMessage('Version must be a positive number'),
];

const createDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      return next(new Error('File is required'));
    }

    const tags = sanitizeTags(req.body.tags);
    const viewEmails = sanitizeEmails(req.body.viewEmails || req.body['viewEmails[]']);
    const editEmails = sanitizeEmails(req.body.editEmails || req.body['editEmails[]']);
    const uploaded = await uploadBuffer({
      buffer: req.file.buffer,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
    });

    const doc = await Document.create({
      title: req.body.title,
      description: req.body.description || '',
      tags,
      filePath: uploaded.fileUrl,
      fileUrl: uploaded.fileUrl,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
      cloudinaryPublicId: uploaded.cloudinaryPublicId,
      cloudinaryResourceType: uploaded.cloudinaryResourceType,
      uploadedBy: req.user._id,
      uploadDate: new Date(),
      version: 1,
      viewEmails,
      editEmails,
      versions: [
        {
          version: 1,
          title: req.body.title,
          description: req.body.description || '',
          tags,
          filePath: uploaded.fileUrl,
          fileUrl: uploaded.fileUrl,
          originalName: req.file.originalname,
          mimeType: req.file.mimetype,
          fileSize: req.file.size,
          cloudinaryPublicId: uploaded.cloudinaryPublicId,
          cloudinaryResourceType: uploaded.cloudinaryResourceType,
          updatedBy: req.user._id,
          updatedAt: new Date(),
        },
      ],
    });

    const populated = await doc.populate('uploadedBy', 'name email role');
    res.status(201).json({ document: populated });
  } catch (error) {
    next(error);
  }
};

const listDocuments = async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const skip = (page - 1) * limit;

    const userEmail = String(req.user.email || '').toLowerCase();
    const filter = {
      $or: [{ uploadedBy: req.user._id }, { viewEmails: userEmail }, { editEmails: userEmail }],
    };

    if (req.query.uploadedBy) {
      filter.uploadedBy = req.query.uploadedBy;
    }

    if (req.query.tag) {
      filter.tags = req.query.tag.toLowerCase();
    }

    if (req.query.startDate || req.query.endDate) {
      filter.uploadDate = {};
      if (req.query.startDate) filter.uploadDate.$gte = new Date(req.query.startDate);
      if (req.query.endDate) filter.uploadDate.$lte = new Date(req.query.endDate);
    }

    let sort = { createdAt: -1 };
    if (req.query.q) {
      filter.$text = { $search: req.query.q };
      sort = { score: { $meta: 'textScore' }, createdAt: -1 };
    }

    const [total, documents] = await Promise.all([
      Document.countDocuments(filter),
      Document.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('uploadedBy', 'name email role')
        .select(req.query.q ? { score: { $meta: 'textScore' } } : {}),
    ]);

    res.status(200).json({
      documents,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getDocument = async (req, res, next) => {
  try {
    const doc = await Document.findById(req.params.id).populate('uploadedBy', 'name email role');
    if (!doc) {
      res.status(404);
      return next(new Error('Document not found'));
    }

    if (!canViewDocument(doc, req.user)) {
      res.status(403);
      return next(new Error('You are not allowed to view this document'));
    }

    res.status(200).json({ document: doc });
  } catch (error) {
    next(error);
  }
};

const updateDocument = async (req, res, next) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      res.status(404);
      return next(new Error('Document not found'));
    }

    if (!canEditDocument(doc, req.user)) {
      res.status(403);
      return next(new Error('You are not allowed to edit this document'));
    }

    const tags = req.body.tags ? sanitizeTags(req.body.tags) : doc.tags;
    const owner = isOwner(doc, req.user);
    const viewEmails = owner && (req.body.viewEmails !== undefined || req.body['viewEmails[]'] !== undefined)
      ? sanitizeEmails(req.body.viewEmails || req.body['viewEmails[]'])
      : (doc.viewEmails || []);
    const editEmails = owner && (req.body.editEmails !== undefined || req.body['editEmails[]'] !== undefined)
      ? sanitizeEmails(req.body.editEmails || req.body['editEmails[]'])
      : (doc.editEmails || []);

    const nextVersion = doc.version + 1;
    let filePath = doc.filePath;
    let fileUrl = doc.fileUrl || doc.filePath;
    let originalName = doc.originalName;
    let mimeType = doc.mimeType;
    let fileSize = doc.fileSize;
    let cloudinaryPublicId = doc.cloudinaryPublicId;
    let cloudinaryResourceType = doc.cloudinaryResourceType;

    if (req.file) {
      const uploaded = await uploadBuffer({
        buffer: req.file.buffer,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
      });
      filePath = uploaded.fileUrl;
      fileUrl = uploaded.fileUrl;
      originalName = req.file.originalname;
      mimeType = req.file.mimetype;
      fileSize = req.file.size;
      cloudinaryPublicId = uploaded.cloudinaryPublicId;
      cloudinaryResourceType = uploaded.cloudinaryResourceType;
    }

    doc.title = req.body.title || doc.title;
    doc.description = typeof req.body.description === 'string' ? req.body.description : doc.description;
    doc.tags = tags;
    doc.viewEmails = viewEmails;
    doc.editEmails = editEmails;
    doc.filePath = filePath;
    doc.fileUrl = fileUrl;
    doc.originalName = originalName;
    doc.mimeType = mimeType;
    doc.fileSize = fileSize;
    doc.cloudinaryPublicId = cloudinaryPublicId || '';
    doc.cloudinaryResourceType = cloudinaryResourceType || '';
    doc.version = nextVersion;

    doc.versions.push(
      createVersionSnapshot(
        {
          version: nextVersion,
          title: doc.title,
          description: doc.description,
          tags: doc.tags,
          filePath: doc.filePath,
          fileUrl: doc.fileUrl || doc.filePath,
          originalName: doc.originalName,
          mimeType: doc.mimeType,
          fileSize: doc.fileSize,
          cloudinaryPublicId: doc.cloudinaryPublicId,
          cloudinaryResourceType: doc.cloudinaryResourceType,
        },
        req.user._id
      )
    );

    await doc.save();
    const populated = await doc.populate('uploadedBy', 'name email role');
    res.status(200).json({ document: populated });
  } catch (error) {
    next(error);
  }
};

const deleteDocument = async (req, res, next) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      res.status(404);
      return next(new Error('Document not found'));
    }

    const canDelete = isOwner(doc, req.user);
    if (!canDelete) {
      res.status(403);
      return next(new Error('You are not allowed to delete this document'));
    }

    const seen = new Set();
    const assets = [
      {
        publicId: doc.cloudinaryPublicId,
        resourceType: doc.cloudinaryResourceType,
        localPath: doc.filePath,
      },
      ...doc.versions.map((v) => ({
        publicId: v.cloudinaryPublicId,
        resourceType: v.cloudinaryResourceType,
        localPath: v.filePath,
      })),
    ];

    for (const asset of assets) {
      if (asset.publicId && !seen.has(asset.publicId)) {
        seen.add(asset.publicId);
        await destroyFile(asset);
        continue;
      }

      if (asset.localPath && !asset.localPath.startsWith('http')) {
        const localFile = path.resolve(asset.localPath);
        if (fs.existsSync(localFile)) {
          fs.unlinkSync(localFile);
        }
      }
    }

    await doc.deleteOne();
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const listVersions = async (req, res, next) => {
  try {
    const doc = await Document.findById(req.params.id).populate('versions.updatedBy', 'name email role');
    if (!doc) {
      res.status(404);
      return next(new Error('Document not found'));
    }

    if (!canViewDocument(doc, req.user)) {
      res.status(403);
      return next(new Error('You are not allowed to view this document'));
    }

    const versions = [...doc.versions].sort((a, b) => b.version - a.version);
    res.status(200).json({ versions });
  } catch (error) {
    next(error);
  }
};

const downloadCurrent = async (req, res, next) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      res.status(404);
      return next(new Error('Document not found'));
    }

    if (!canViewDocument(doc, req.user)) {
      res.status(403);
      return next(new Error('You are not allowed to download this document'));
    }

    await sendDocumentFile({
      pathOrUrl: resolveFileSource(doc.fileUrl, doc.filePath),
      mimeType: doc.mimeType,
      originalName: doc.originalName,
      cloudinaryPublicId: doc.cloudinaryPublicId,
      cloudinaryResourceType: doc.cloudinaryResourceType,
      disposition: 'attachment',
      res,
    });
    return;
  } catch (error) {
    if (!res.headersSent && error.statusCode) {
      res.status(error.statusCode);
    }
    next(error);
  }
};

const viewCurrent = async (req, res, next) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      res.status(404);
      return next(new Error('Document not found'));
    }

    if (!canViewDocument(doc, req.user)) {
      res.status(403);
      return next(new Error('You are not allowed to view this document'));
    }

    await sendDocumentFile({
      pathOrUrl: resolveFileSource(doc.fileUrl, doc.filePath),
      mimeType: doc.mimeType,
      originalName: doc.originalName,
      cloudinaryPublicId: doc.cloudinaryPublicId,
      cloudinaryResourceType: doc.cloudinaryResourceType,
      disposition: 'inline',
      res,
    });
    return;
  } catch (error) {
    if (!res.headersSent && error.statusCode) {
      res.status(error.statusCode);
    }
    next(error);
  }
};

const downloadVersion = async (req, res, next) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      res.status(404);
      return next(new Error('Document not found'));
    }

    if (!canViewDocument(doc, req.user)) {
      res.status(403);
      return next(new Error('You are not allowed to download this document'));
    }

    const versionNum = Number(req.params.version);
    const target = resolveVersionAsset(doc, versionNum);

    if (!target) {
      res.status(404);
      return next(new Error('Version not found'));
    }

    await sendDocumentFile({
      pathOrUrl: resolveFileSource(target.fileUrl, target.filePath),
      mimeType: target.mimeType,
      originalName: target.originalName,
      cloudinaryPublicId: target.cloudinaryPublicId,
      cloudinaryResourceType: target.cloudinaryResourceType,
      disposition: 'attachment',
      res,
    });
    return;
  } catch (error) {
    if (!res.headersSent && error.statusCode) {
      res.status(error.statusCode);
    }
    if (!res.headersSent && !error.statusCode) {
      res.status(500);
    }
    next(error);
  }
};

module.exports = {
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
};
