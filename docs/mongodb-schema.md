# MongoDB Schema

## User Collection

```js
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String, // bcrypt hash
  role: 'admin' | 'editor' | 'viewer',
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
  filePath: String,
  originalName: String,
  mimeType: String,
  fileSize: Number,
  uploadedBy: ObjectId, // ref User
  uploadDate: Date,
  version: Number,
  permissions: ['admin' | 'editor' | 'viewer'],
  versions: [
    {
      version: Number,
      title: String,
      description: String,
      tags: [String],
      filePath: String,
      originalName: String,
      mimeType: String,
      fileSize: Number,
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
- `User`: unique index on `email`
