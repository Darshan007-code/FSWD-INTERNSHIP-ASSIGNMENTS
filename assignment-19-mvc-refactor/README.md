# Assignment 19 - MVC Refactor 🏗️

## Description
Refactored Task API into MVC (Model-View-Controller) structure.

## MVC Structure
```
assignment-19-mvc-refactor/
├── server.js                      → App entry point
├── models/
│   └── taskModel.js               → DATA & business logic
├── controllers/
│   └── taskController.js          → REQUEST/RESPONSE handling
└── routes/
    └── taskRoutes.js              → URL → Controller mapping
```

## What is MVC?
- **Model**: Manages data, validation rules, and business logic
- **View** (Routes here): Maps URLs to controller actions
- **Controller**: Bridges Model and View — handles request, calls model, sends response

## Setup
```bash
npm install
npm run dev
```
Server at: `http://localhost:3002`

## API Endpoints (same as Task API)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| PATCH | `/api/tasks/:id/status` | Update status |
| DELETE | `/api/tasks/:id` | Delete task |
