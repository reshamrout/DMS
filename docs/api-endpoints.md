# API Endpoints

Base URL: `http://localhost:4200/api`

## Auth

- `POST /auth/register`
  - Public
  - Body: `{ name, email, password }`
  - Password rules: min 8 chars, uppercase, lowercase, number
- `POST /auth/login`
  - Public
  - Body: `{ email, password }`
  - Errors:
    - unknown email -> `404 User not found`
    - wrong password -> `401 Invalid credentials`
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
  - Access scope: owner docs + docs shared to requester email
- `GET /documents/:id`
  - Auth required + document access check
- `GET /documents/:id/view`
  - Auth required + document access check
  - Returns inline file stream (used by preview)
  - Supports `?token=<jwt>` for iframe/img URL-based preview requests
- `GET /documents/:id/download`
  - Auth required + document access check
  - Returns attachment download stream
  - Supports `?token=<jwt>` for URL-based access
- `GET /documents/:id/versions`
  - Auth required + document access check
- `GET /documents/:id/versions/:version/download`
  - Auth required + document access check
  - Returns attachment download stream
- `POST /documents`
  - Auth required
  - `multipart/form-data` fields:
    - `title` (required)
    - `description` (optional)
    - `tags` (comma-separated, optional)
    - `viewEmails` (comma-separated, optional)
    - `editEmails` (comma-separated, optional)
    - `file` (required)
- `PUT /documents/:id`
  - Auth required + edit access check (owner or email in `editEmails`)
  - `multipart/form-data` fields:
    - `title`, `description`, `tags` (optional)
    - `viewEmails`, `editEmails` (owner can change access lists)
    - `file` (optional)
  - Creates next version on every update
- `DELETE /documents/:id`
  - Auth required
  - Owner only

## Health

- `GET /health`
