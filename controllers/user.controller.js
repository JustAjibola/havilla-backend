
const UserService = require('../services/user.service');

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