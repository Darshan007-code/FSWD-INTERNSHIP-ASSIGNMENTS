# Assignment 21 - CRUD Lab 🧪

## Description
Full CRUD operations using Mongoose with MongoDB.

## Setup
```bash
npm install
cp .env.example .env
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts (pagination + filters) |
| GET | `/api/posts?published=true` | Filter published posts |
| GET | `/api/posts?author=John` | Filter by author |
| GET | `/api/posts?tag=nodejs` | Filter by tag |
| GET | `/api/posts?page=1&limit=5` | Pagination |
| GET | `/api/posts/:id` | Get single post |
| POST | `/api/posts` | Create post |
| PUT | `/api/posts/:id` | Update post |
| PATCH | `/api/posts/:id/publish` | Toggle publish status |
| DELETE | `/api/posts/:id` | Delete post |

## POST /api/posts Body
```json
{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post...",
  "author": "Darshan",
  "tags": ["nodejs", "express", "mongodb"],
  "published": false
}
```

## Mongoose Concepts Used
- `Model.create()` — Insert document
- `Model.find()` with filters, sort, skip, limit — Read with pagination
- `Model.findById()` — Read single
- `Model.findByIdAndUpdate()` with `runValidators` — Update
- `Model.findByIdAndDelete()` — Delete
- Schema validation with custom error messages
- `pre('save')` middleware
