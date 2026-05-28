const express = require("express");
const router = express.Router();
const {
  createPost, getAllPosts, getPostById, updatePost, deletePost, togglePublish,
} = require("../controllers/postController");

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.put("/:id", updatePost);
router.patch("/:id/publish", togglePublish);
router.delete("/:id", deletePost);

module.exports = router;
