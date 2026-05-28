# Assignment 23 - Role Guard 🛡️

## Description
Role-based access control — admin/user roles with restricted routes.

## Setup
```bash
npm install
cp .env.example .env
npm run dev
```

## Roles
| Role | Access |
|------|--------|
| `user` | Public routes + dashboard |
| `moderator` | Public routes + dashboard |
| `admin` | Everything including user management |

## API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register (add `"role": "admin"` to create admin) |
| POST | `/api/auth/login` | Login, get JWT |

### User (requires login)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | View dashboard |

### Admin Only
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | List all users |
| DELETE | `/api/admin/users/:id` | Delete a user |
| PATCH | `/api/admin/users/:id/role` | Change user role |

## How Authorization Works
```js
// middleware/authMiddleware.js
const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Access denied" });
  next();
};

// Usage in routes:
router.get("/admin/users", protect, authorize("admin"), getAllUsers);
```
