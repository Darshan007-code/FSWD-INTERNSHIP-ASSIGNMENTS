# Assignment 17 - Route Master 📚

## Description
Build Express routes for a bookstore (books, authors).

## Setup & Run

```bash
npm install
npm run dev    # development with nodemon
# OR
npm start      # production
```

Server runs at: `http://localhost:3000`

---

## API Endpoints

### 📗 Books

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| GET | `/api/books?genre=Fantasy` | Filter books by genre |
| GET | `/api/books/:id` | Get a single book |
| POST | `/api/books` | Add a new book |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |

#### POST /api/books — Request Body
```json
{
  "title": "The Hobbit",
  "authorId": 1,
  "genre": "Fantasy",
  "price": 249,
  "year": 1937
}
```

---

### 👤 Authors

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/authors` | Get all authors |
| GET | `/api/authors/:id` | Get a single author |
| GET | `/api/authors/:id/books` | Get all books by an author |
| POST | `/api/authors` | Add a new author |
| PUT | `/api/authors/:id` | Update an author |
| DELETE | `/api/authors/:id` | Delete an author |

#### POST /api/authors — Request Body
```json
{
  "name": "J.R.R. Tolkien",
  "nationality": "British",
  "birthYear": 1892
}
```

---

## Project Structure

```
assignment-17-route-master/
├── server.js           # Entry point, Express app setup
├── package.json
├── data/
│   └── store.js        # In-memory mock database
└── routes/
    ├── books.js        # All book routes
    └── authors.js      # All author routes
```
