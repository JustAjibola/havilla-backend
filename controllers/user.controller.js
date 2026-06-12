const UserService = require('../services/user.service');

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const user = await UserService.getUserProfileById(userId);
    return res.status(200).json({ 
      success: true, 
      data: user 
    });
  } catch (error) {
    return res.status(404).json({ 
      success: false, 
      message: error.message || "An error occurred while fetching user record parameters." 
    });
  }
};

const updateProfileScreen = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const updatedProfile = await UserService.updateUserProfile(userId, req.body);
    return res.status(200).json({
      success: true,
      message: "Profile settings modified successfully.",
      data: updatedProfile
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Validation Error: Failed to modify profile attributes."
    });
  }
};

module.exports = { 
  getUserProfile,
  updateProfileScreen
};