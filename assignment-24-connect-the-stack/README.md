# Assignment 24 - Connect the Stack 🔗

## Description
Full-stack app: React frontend connected to Express + MongoDB backend with JWT auth.

## Project Structure
```
assignment-24-connect-the-stack/
├── backend/               ← Express + MongoDB API
│   ├── server.js
│   ├── models/            User.js, Task.js
│   ├── controllers/       authController.js, taskController.js
│   ├── routes/            authRoutes.js, taskRoutes.js
│   └── middleware/        authMiddleware.js
└── frontend/              ← React (Vite) app
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── api/           axios.js, AuthContext.jsx
        ├── pages/         Login.jsx, Signup.jsx, Dashboard.jsx
        └── components/    TaskCard.jsx, AddTaskForm.jsx
```

## Setup & Run

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env   # Set MONGO_URI and JWT_SECRET
npm run dev            # Runs on http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev            # Runs on http://localhost:5173
```

## Features
- ✅ Signup / Login with JWT
- ✅ Protected dashboard route
- ✅ Create, view, update, delete tasks
- ✅ Filter tasks by status (All / Pending / In-Progress / Completed)
- ✅ Task stats at a glance
- ✅ Auto-logout on token expiry
- ✅ CORS configured for frontend-backend communication

## API Endpoints (Backend)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | No | Register |
| POST | `/api/auth/login` | No | Login |
| GET | `/api/auth/me` | Yes | Current user |
| GET | `/api/tasks` | Yes | Get all tasks |
| POST | `/api/tasks` | Yes | Create task |
| PUT | `/api/tasks/:id` | Yes | Update task |
| DELETE | `/api/tasks/:id` | Yes | Delete task |
