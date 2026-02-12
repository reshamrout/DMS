# API Endpoints

Base URL: `http://localhost:5000/api`

## Auth

- `POST /auth/register`
  - Public
  - Body: `{ name, email, password }`
- `POST /auth/login`
  - Public
  - Body: `{ email, password }`
- `GET /auth/profile`
  - Auth required

## Users (Admin only)

- `GET /users`
- `PUT /users/:id/role`
  - Body: `{ role: 'admin' | 'editor' | 'viewer' }`
- `DELETE /users/:id`

## Documents

- `GET /documents`
  - Auth required
  - Query: `q`, `tag`, `uploadedBy`, `startDate`, `endDate`, `page`, `limit`
- `GET /documents/:id`
  - Auth required + permission check
- `GET /documents/:id/download`
  - Auth required + permission check
- `GET /documents/:id/versions`
  - Auth required + permission check
- `GET /documents/:id/versions/:version/download`
  - Auth required + permission check
- `POST /documents`
  - Roles: `admin`, `editor`
  - `multipart/form-data` fields: `title`, `description`, `tags`, `permissions[]`, `file`
- `PUT /documents/:id`
  - Roles: `admin`, `editor` + permission ownership logic
  - `multipart/form-data` fields: `title`, `description`, `tags`, `permissions[]`, optional `file`
  - Creates next version on every update
- `DELETE /documents/:id`
  - Roles: `admin`, `editor` (owner or admin)

## Health

- `GET /health`
