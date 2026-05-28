const Post = require("../models/Post");

// CREATE - POST /api/posts
exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({ success: true, message: "Post created", data: post });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

// READ ALL - GET /api/posts
exports.getAllPosts = async (req, res) => {
  try {
    const { published, author, tag, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (published !== undefined) filter.published = published === "true";
    if (author) filter.author = { $regex: author, $options: "i" };
    if (tag) filter.tags = tag.toLowerCase();

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [posts, total] = await Promise.all([
      Post.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      Post.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: posts,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// READ ONE - GET /api/posts/:id
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    res.status(200).json({ success: true, data: post });
  } catch (err) {
    if (err.name === "CastError") return res.status(400).json({ success: false, message: "Invalid post ID" });
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE - PUT /api/posts/:id
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    res.status(200).json({ success: true, message: "Post updated", data: post });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    if (err.name === "CastError") return res.status(400).json({ success: false, message: "Invalid post ID" });
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE - DELETE /api/posts/:id
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    res.status(200).json({ success: true, message: "Post deleted", data: post });
  } catch (err) {
    if (err.name === "CastError") return res.status(400).json({ success: false, message: "Invalid post ID" });
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUBLISH TOGGLE - PATCH /api/posts/:id/publish
exports.togglePublish = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    post.published = !post.published;
    await post.save();
    res.status(200).json({ success: true, message: `Post ${post.published ? "published" : "unpublished"}`, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
