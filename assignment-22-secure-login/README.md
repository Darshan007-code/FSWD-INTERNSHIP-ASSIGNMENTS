# Assignment 22 - Secure Login 🔐

## Description
Signup/login system with bcrypt password hashing and JWT authentication.

## Setup
```bash
npm install
cp .env.example .env   # Set your JWT_SECRET
npm run dev
```

## Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | No | Register new user |
| POST | `/api/auth/login` | No | Login, get JWT token |
| GET | `/api/auth/me` | Yes | Get current user profile |

## Usage

### Signup
```json
POST /api/auth/signup
{ "name": "Darshan", "email": "darshan@example.com", "password": "secret123" }
```

### Login
```json
POST /api/auth/login
{ "email": "darshan@example.com", "password": "secret123" }
// Response includes: { token: "eyJ..." }
```

### Protected Route
```
GET /api/auth/me
Header: Authorization: Bearer eyJ...
```

## Security Features
- Passwords hashed with **bcryptjs** (salt rounds: 10)
- JWT token signed with secret key, expires in 7 days
- Password field excluded from all DB queries (`select: false`)
- Generic error messages for invalid credentials (prevents enumeration)
