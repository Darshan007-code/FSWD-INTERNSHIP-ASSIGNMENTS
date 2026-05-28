const express = require("express");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Import Routes
const bookRoutes = require("./routes/books");
const authorRoutes = require("./routes/authors");

// Mount Routes
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);

// Root route - API overview
app.get("/", (req, res) => {
  res.status(200).json({
    message: "📚 Welcome to the Bookstore API!",
    version: "1.0.0",
    routes: {
      books: {
        "GET /api/books": "Get all books (optional: ?genre=Fantasy)",
        "GET /api/books/:id": "Get a single book by ID",
        "POST /api/books": "Add a new book",
        "PUT /api/books/:id": "Update a book",
        "DELETE /api/books/:id": "Delete a book",
      },
      authors: {
        "GET /api/authors": "Get all authors",
        "GET /api/authors/:id": "Get a single author by ID",
        "GET /api/authors/:id/books": "Get all books by an author",
        "POST /api/authors": "Add a new author",
        "PUT /api/authors/:id": "Update an author",
        "DELETE /api/authors/:id": "Delete an author",
      },
    },
  });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Bookstore API running at http://localhost:${PORT}`);
  console.log(`📖 Visit http://localhost:${PORT} to see all available routes`);
});
