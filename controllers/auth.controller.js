const AuthService = require('../services/auth.service');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    
    if (!req.body || !req.body.email || !req.body.password || !req.body.name || !req.body.role) {
      return res.status(400).json({ 
        success: false, 
        message: "Bad Request: Missing required field attributes (name, email, password, role)." 
      });
    }

    const user = await AuthService.registerUser(req.body);
    
    return res.status(201).json({ 
      success: true, 
      message: "User context initialized successfully.",
      id: user._id, 
      name: user.name, 
      role: user.role
    });
  } catch (error) {
    return res.status(400).json({ 
      success: false, 
      message: error.message || "An error occurred during registration tracking." 
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Bad Request: Email and password fields cannot be empty." 
      });
    }

    const user = await AuthService.loginUser(email, password);
    
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' } 
    );
    
    return res.status(200).json({
      success: true,
      message: "Login signature handshake complete.",
      token: accessToken,
      id: user._id, 
      name: user.name, 
      email: user.email, 
      role: user.role
    });
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: error.message || "Authentication failed: Invalid credentials." 
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await AuthService.fetchAllUsers();
    return res.status(200).json({ 
      success: true, 
      data: users 
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: error.message || "Internal server exception fetching collection records." 
    });
  }
};

module.exports = { 
  register, 
  login, 
  getAllUsers,
  registerUser: register, 
  loginUser: login,       
  fetchAllUsers: getAllUsers 
};