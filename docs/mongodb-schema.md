# MongoDB Schema

## User Collection

```js
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String, // bcrypt hash
  role: 'none' | 'admin' | 'editor' | 'viewer',
  createdAt: Date
}
```

## Document Collection

```js
{
  _id: ObjectId,
  title: String,
  description: String,
  tags: [String],
  filePath: String, // delivery path (Cloudinary URL or legacy local path)
  fileUrl: String,  // canonical Cloudinary URL when uploaded to Cloudinary
  originalName: String,
  mimeType: String,
  fileSize: Number,
  cloudinaryPublicId: String,
  cloudinaryResourceType: String, // raw | image | video
  uploadedBy: ObjectId, // ref User
  uploadDate: Date,
  version: Number,
  viewEmails: [String], // users who can view (plus owner)
  editEmails: [String], // users who can edit (plus owner)
  versions: [
    {
      version: Number,
      title: String,
      description: String,
      tags: [String],
      filePath: String,
      fileUrl: String,
      originalName: String,
      mimeType: String,
      fileSize: Number,
      cloudinaryPublicId: String,
      cloudinaryResourceType: String,
      updatedBy: ObjectId,
      updatedAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## Indexes

- `Document`: text index on `title`, `description`, `tags`
- `Document`: compound index on `tags`, `uploadedBy`, `uploadDate`
- `Document`: index on `viewEmails`
- `Document`: index on `editEmails`
- `User`: unique index on `email`
