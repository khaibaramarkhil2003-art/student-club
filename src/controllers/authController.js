const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// =====================
// Register
// =====================
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      res.status(400);
      throw new Error('Username, email and password are required');
    }

    if (username.trim().length < 3) {
      res.status(400);
      throw new Error('Username must be at least 3 characters');
    }

    if (!email.includes('@')) {
      res.status(400);
      throw new Error('Invalid email format');
    }

    if (password.length < 6) {
      res.status(400);
      throw new Error('Password must be at least 6 characters');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    await User.create({
      username: username.trim(),
      email: email.toLowerCase(),
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully'
    });
  } catch (error) {
    res.status(res.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================
// Login
// =====================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400);
      throw new Error('Email and password are required');
    }

    if (!email.includes('@')) {
      res.status(400);
      throw new Error('Invalid email format');
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(res.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};
