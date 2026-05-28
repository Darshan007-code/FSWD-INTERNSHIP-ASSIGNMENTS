const express = require("express");
const router = express.Router();
const { authors, books } = require("../data/store");

// GET /api/authors - Get all authors
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: authors.length,
    data: authors,
  });
});

// GET /api/authors/:id - Get single author by ID
router.get("/:id", (req, res) => {
  const author = authors.find((a) => a.id === parseInt(req.params.id));

  if (!author) {
    return res.status(404).json({ success: false, message: "Author not found" });
  }

  res.status(200).json({ success: true, data: author });
});

// GET /api/authors/:id/books - Get all books by a specific author
router.get("/:id/books", (req, res) => {
  const author = authors.find((a) => a.id === parseInt(req.params.id));

  if (!author) {
    return res.status(404).json({ success: false, message: "Author not found" });
  }

  const authorBooks = books.filter((b) => b.authorId === parseInt(req.params.id));

  res.status(200).json({
    success: true,
    author: author.name,
    count: authorBooks.length,
    data: authorBooks,
  });
});

// POST /api/authors - Add a new author
router.post("/", (req, res) => {
  const { name, nationality, birthYear } = req.body;

  if (!name || !nationality || !birthYear) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, nationality, and birthYear",
    });
  }

  const newAuthor = {
    id: authors.length + 1,
    name,
    nationality,
    birthYear: parseInt(birthYear),
  };

  authors.push(newAuthor);

  res.status(201).json({ success: true, message: "Author added", data: newAuthor });
});

// PUT /api/authors/:id - Update an author
router.put("/:id", (req, res) => {
  const index = authors.findIndex((a) => a.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Author not found" });
  }

  const { name, nationality, birthYear } = req.body;
  authors[index] = {
    ...authors[index],
    name: name || authors[index].name,
    nationality: nationality || authors[index].nationality,
    birthYear: birthYear ? parseInt(birthYear) : authors[index].birthYear,
  };

  res.status(200).json({ success: true, message: "Author updated", data: authors[index] });
});

// DELETE /api/authors/:id - Delete an author
router.delete("/:id", (req, res) => {
  const index = authors.findIndex((a) => a.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Author not found" });
  }

  const deleted = authors.splice(index, 1);

  res.status(200).json({ success: true, message: "Author deleted", data: deleted[0] });
});

module.exports = router;
