# MEAN Document Management System (DMS)

Production-ready full-stack Document Management System built with MongoDB, Express.js, Angular, and Node.js.

## Project Structure

```text
DMS/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    uploads/
    server.js
  frontend/
    src/app/
      core/
      features/
      layout/
      models/
  docs/
    api-endpoints.md
    mongodb-schema.md
  docker-compose.yml
```

## Core Features Implemented

- JWT auth (`register`, `login`, `profile`)
- Password hashing with `bcryptjs`
- Protected backend and frontend routes
- File upload with `multer` + Cloudinary storage
- File type allow-list + max file size control
- Email-based document access control (`viewEmails`, `editEmails`) with owner override
- Document metadata storage (`title`, `description`, `tags`, `uploadedBy`, `uploadDate`, `version`)
- Search and filtering by tag, uploader, date, keyword with MongoDB text index
- Pagination for document listing
- Version tracking on each edit, with version history and version download APIs
- Angular responsive UI pages:
  - Login
  - Register
  - Dashboard
  - Upload Document
  - Document List
  - Document Details
  - Version History
- Angular auth interceptor + auth guard
- Toast notifications via `ngx-toastr`
- File preview for images and PDFs

## Setup Instructions

## 1. Prerequisites

- Node.js 20+
- npm 10+
- MongoDB running locally (`mongodb://localhost:27017`) or Atlas
- Angular CLI (`npm i -g @angular/cli`)
- Cloudinary account credentials

## 2. Backend Setup

```bash
cd backend
cp .env.example .env
npm install
node server.js
```

Backend runs at `http://localhost:4200`.

## 3. Frontend Setup

```bash
cd frontend
npm install
ng serve --port 4300
```

Frontend runs at `http://localhost:4300` (when backend uses port 4200).

## 4. MongoDB Connection

Edit `backend/.env`:

```env
MONGO_URI=mongodb://localhost:27017/dms
JWT_SECRET=your_long_random_secret
PORT=4200
CLIENT_URL=http://localhost:4300
MAX_FILE_SIZE_MB=10
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=dms
```

## API Documentation

- Endpoint list: `docs/api-endpoints.md`
- Schema details: `docs/mongodb-schema.md`

## Docker (Optional)

Start MongoDB + backend with Docker Compose:

```bash
docker compose up --build
```

Then run frontend separately with `ng serve`.

## Test User (Example)

Use this sample account for quick local testing:

- Email: `test@test.com`
- Password: `Test@1234`

## Notes

- Uploaded files are stored in Cloudinary.
- Access control is email-based per document (`view` and `edit` email lists).
- Document owner always keeps full access.
