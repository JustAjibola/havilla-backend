const { User } = require('../models/schemas'); 
const bcrypt = require('bcrypt');

class AuthService {
  async registerUser(userData) {
    const standardizedEmail = userData.email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: standardizedEmail });
    if (existingUser) {
      throw new Error("A user with this email address already exists.");
    }

    const saltRounds = 10;

    const securedHash = await bcrypt.hash(userData.password, saltRounds);
    
    const newUser = new User({
      name: userData.name,
      email: standardizedEmail,
      password: securedHash,
      role: userData.role
    });

    return await newUser.save();
  }

  async loginUser(email, password) {
    const standardizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: standardizedEmail });
    if (!user) {
      throw new Error("Invalid credentials provided.");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid credentials provided.");
    }
    
    return user;
  }

  async fetchAllUsers() {
    return await User.find().select('-password');
  }
}

module.exports = new AuthService();