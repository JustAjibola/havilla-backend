const { User } = require('../models/schemas');

class UserService {
  async getUserProfileById(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error("Profile record not found: Authenticated user does not exist.");
    }
    return user;
  }

  async updateUserProfile(userId, updateData) {
    const allowedUpdates = {};
    
    if (updateData.name) allowedUpdates.name = updateData.name;
    if (updateData.phone) allowedUpdates.phone = updateData.phone;
    if (updateData.profilePicture) allowedUpdates.profilePicture = updateData.profilePicture;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: allowedUpdates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      throw new Error("Update failed: User profile record could not be found.");
    }

    return updatedUser;
  }
}

module.exports = new UserService();