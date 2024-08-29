const express = require("express");
const jwt = require("jsonwebtoken")
const router = express.Router();
const Post = require("../models/post");

const JWT_SECRET = "654gfdiuhgf23";


// Middleware to verify the token
function verifyToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}


router.post("/add", verifyToken, async (req, res) => {
  try {
    const { location, description } = req.body;

    const newPost = new Post({
      location,
      description,
      createdBy: req.user.id, 
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// GET /api/posts - Get all posts
router.get("/get", async (req, res) => {
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

    // Find the post by ID and update it
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Ensure the logged-in user is the one who created the post
    if (post.createdBy.toString() !== req.user.id) {
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

    // Ensure the logged-in user is the one who created the post
    if (post.createdBy.toString() !== req.user.id) {
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