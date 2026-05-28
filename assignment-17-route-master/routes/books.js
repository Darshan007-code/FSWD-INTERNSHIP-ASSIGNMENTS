const express = require("express");
const router = express.Router();
const { books, authors } = require("../data/store");

// GET /api/books - Get all books (with optional genre filter)
router.get("/", (req, res) => {
  let result = books;

  // Filter by genre if query param provided: /api/books?genre=Fantasy
  if (req.query.genre) {
    result = books.filter(
      (b) => b.genre.toLowerCase() === req.query.genre.toLowerCase()
    );
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result,
  });
});

// GET /api/books/:id - Get a single book by ID
router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));

  if (!book) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }

  // Attach author details
  const author = authors.find((a) => a.id === book.authorId);

  res.status(200).json({
    success: true,
    data: { ...book, author: author || null },
  });
});

// POST /api/books - Add a new book
router.post("/", (req, res) => {
  const { title, authorId, genre, price, year } = req.body;

  if (!title || !authorId || !genre || !price || !year) {
    return res.status(400).json({
      success: false,
      message: "Please provide title, authorId, genre, price, and year",
    });
  }

  // Check if author exists
  const author = authors.find((a) => a.id === parseInt(authorId));
  if (!author) {
    return res.status(404).json({ success: false, message: "Author not found" });
  }

  const newBook = {
    id: books.length + 1,
    title,
    authorId: parseInt(authorId),
    genre,
    price: parseFloat(price),
    year: parseInt(year),
  };

  books.push(newBook);

  res.status(201).json({ success: true, message: "Book added", data: newBook });
});

// PUT /api/books/:id - Update a book
router.put("/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }

  const { title, authorId, genre, price, year } = req.body;

  books[index] = {
    ...books[index],
    title: title || books[index].title,
    authorId: authorId ? parseInt(authorId) : books[index].authorId,
    genre: genre || books[index].genre,
    price: price ? parseFloat(price) : books[index].price,
    year: year ? parseInt(year) : books[index].year,
  };

  res.status(200).json({ success: true, message: "Book updated", data: books[index] });
});

// DELETE /api/books/:id - Delete a book
router.delete("/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }

  const deleted = books.splice(index, 1);

  res.status(200).json({ success: true, message: "Book deleted", data: deleted[0] });
});

module.exports = router;
