let cloudinary = null;
try {
  cloudinary = require('cloudinary').v2;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} catch (_error) {
  cloudinary = null;
}

const ensureCloudinaryAvailable = () => {
  if (!cloudinary) {
    throw new Error('Cloudinary SDK missing. Run `npm install` in backend to install dependencies.');
  }
};

const detectResourceType = (mimeType = '') => {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  return 'raw';
};

const uploadBuffer = ({ buffer, originalName, mimeType }) => {
  ensureCloudinaryAvailable();
  const resourceType = detectResourceType(mimeType);

  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        folder: process.env.CLOUDINARY_FOLDER || 'dms',
        resource_type: resourceType,
        use_filename: true,
        unique_filename: true,
        filename_override: originalName,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve({
          fileUrl: result.secure_url,
          cloudinaryPublicId: result.public_id,
          cloudinaryResourceType: resourceType,
        });
      }
    );

    upload.end(buffer);
  });
};

const destroyFile = async ({ publicId, resourceType }) => {
  if (!cloudinary) return;
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType || 'raw',
  });
};

const getSignedFileUrl = ({ publicId, resourceType }) => {
  ensureCloudinaryAvailable();
  if (!publicId) return '';

  const expiresAt = Math.floor(Date.now() / 1000) + 5 * 60;
  return cloudinary.url(publicId, {
    resource_type: resourceType || 'raw',
    type: 'upload',
    secure: true,
    sign_url: true,
    expires_at: expiresAt,
  });
};

const getSignedDownloadUrl = ({ publicId, resourceType }) => {
  ensureCloudinaryAvailable();
  if (!publicId) return '';

  const normalized = String(publicId);
  const lastDot = normalized.lastIndexOf('.');
  const format = lastDot > -1 ? normalized.slice(lastDot + 1) : '';
  const expiresAt = Math.floor(Date.now() / 1000) + 5 * 60;

  if (!format) {
    return getSignedFileUrl({ publicId, resourceType });
  }

  return cloudinary.utils.private_download_url(normalized, format, {
    resource_type: resourceType || 'raw',
    type: 'upload',
    expires_at: expiresAt,
    attachment: true,
  });
};

module.exports = {
  uploadBuffer,
  destroyFile,
  getSignedFileUrl,
  getSignedDownloadUrl,
};
