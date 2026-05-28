# Assignment 18 - Task API ✅

## Description
CRUD APIs for a task manager, tested with Postman.

## Setup
```bash
npm install
npm run dev
```
Server runs at: `http://localhost:3001`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks?status=pending` | Filter by status |
| GET | `/api/tasks?priority=high` | Filter by priority |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| PATCH | `/api/tasks/:id/status` | Update status only |
| DELETE | `/api/tasks/:id` | Delete task |

## Postman Testing Guide

### Create Task
- Method: POST → `http://localhost:3001/api/tasks`
- Body (JSON): `{ "title": "New Task", "description": "Details", "priority": "high" }`

### Update Status
- Method: PATCH → `http://localhost:3001/api/tasks/1/status`
- Body (JSON): `{ "status": "completed" }`

## Valid Values
- **status**: `pending` | `in-progress` | `completed`
- **priority**: `low` | `medium` | `high`
