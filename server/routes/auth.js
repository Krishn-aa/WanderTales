const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const multer = require("multer");
const Post = require("../models/post");
const path = require("path");

const JWT_SECRET = "654gfdiuhgf23";

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/assets/uploads/profile_pictures');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// POST /api/register - Register a new user
router.post("/register", upload.single('profilePic'), async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "Username already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      profilePic: req.file ? req.file.filename : null,
      bio :'',
      followers: [],
      following: [],
      friends: [],
      posts: [],
    });

    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// POST /api/login - Authenticate a user and return a token
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Create a JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
