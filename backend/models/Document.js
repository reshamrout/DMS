const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema(
  {
    version: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    tags: { type: [String], default: [] },
    filePath: { type: String, required: true },
    fileUrl: { type: String, default: '' },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    cloudinaryPublicId: { type: String, default: '' },
    cloudinaryResourceType: { type: String, default: '' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 180 },
    description: { type: String, default: '', maxlength: 4000 },
    tags: { type: [String], default: [] },
    filePath: { type: String, required: true },
    fileUrl: { type: String, default: '' },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    cloudinaryPublicId: { type: String, default: '' },
    cloudinaryResourceType: { type: String, default: '' },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    uploadDate: { type: Date, default: Date.now },
    version: { type: Number, default: 1 },
    viewEmails: { type: [String], default: [] },
    editEmails: { type: [String], default: [] },
    versions: { type: [versionSchema], default: [] },
  },
  { timestamps: true }
);

documentSchema.index({ title: 'text', description: 'text', tags: 'text' });
documentSchema.index({ tags: 1, uploadedBy: 1, uploadDate: -1 });
documentSchema.index({ viewEmails: 1 });
documentSchema.index({ editEmails: 1 });

module.exports = mongoose.model('Document', documentSchema);
