const User = require('../models/User');

// =====================
// Get User Profile
// =====================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(res.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================
// Update User Profile
// =====================
exports.updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;

    // Validation
    if (username && username.trim().length < 3) {
      res.status(400);
      throw new Error('Username must be at least 3 characters');
    }

    if (email && !email.includes('@')) {
      res.status(400);
      throw new Error('Invalid email format');
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    user.username = username?.trim() || user.username;
    user.email = email?.toLowerCase() || user.email;

    const updatedUser = await user.save();

    res.json({
      success: true,
      data: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email
      }
    });
  } catch (error) {
    res.status(res.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};
