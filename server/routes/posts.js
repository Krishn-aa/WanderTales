const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Post = require("../models/post");

const JWT_SECRET = "654gfdiuhgf23";

// Multer storage setup for media uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/assets/uploads/posts");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Middleware to verify the token
function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

// POST /api/posts/add - Create a new post with media
router.post("/add", verifyToken, upload.array('media', 5), async (req, res) => {
  try {
    console.log('add post is hit');
    const { location, description } = req.body;

    // Extract uploaded file names
    const mediaFiles = req.files.map((file) => file.filename);

    const newPost = new Post({
      userId: req.user.id,
      location,
      description,
      media: mediaFiles,
      likes: [],
      comments: [],
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// GET /api/posts/getPosts/:userId - Get all posts by userId
router.get("/getPosts/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const posts = await Post.find({ userId: userId });
    if (posts.length === 0) {
      return res.status(404).json({ msg: "No posts found for this user" });
    }
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET /api/posts/getAll - Get all posts
router.get("/getAll", async (req, res) => {
  try {
    const posts = await Post.find().populate("createdBy", "firstName lastName");
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET /api/posts/:id - Get a specific post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("createdBy", "firstName lastName");
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// PUT /api/posts/:id - Update a post by ID
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { location, description } = req.body;

    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (post.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    post.location = location || post.location;
    post.description = description || post.description;

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE /api/posts/:id - Delete a post by ID
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (post.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
