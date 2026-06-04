const { Venue, User } = require('../models/schemas'); 

class VenueService {
  
  async fetchAllVenues(filters = {}) {
  
    return await Venue.find(filters).populate('owner_id', 'name email');
  }

  async createNewVenue(venueData) {
  
    const userProfile = await User.findById(venueData.owner_id);
    
    if (!userProfile) {
      throw new Error("The assigned venue owner user profile does not exist.");
    }

    if (userProfile.role !== 'owner' && userProfile.role !== 'admin') {
      throw new Error(`Permission Denied: Users with the role '${userProfile.role}' are not authorized to list venue spaces.`);
    }

    if (venueData.pricePerDay <= 0) {
      throw new Error("Price per day must be a positive validation calculation tier.");
    }

    const venue = new Venue(venueData);
    return await venue.save();
  }

  async deleteExistingVenue(venueId) {
    const deletedVenue = await Venue.findByIdAndDelete(venueId);
    if (!deletedVenue) {
      throw new Error("Target venue space does not exist.");
    }
    return deletedVenue;
  }
}

module.exports = new VenueService();