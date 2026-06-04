const VenueService = require('../services/venue.service');

const getAllVenues = async (req, res) => {
  try {
    const { area } = req.query;
    
    let filters = {};
    if (area) {
      filters.area = area;
    }

    const venues = await VenueService.fetchAllVenues(filters);
    return res.status(200).json({ success: true, data: venues });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: error.message || "Internal server exception fetching venue list records." 
    });
  }
};

const createVenue = async (req, res) => {
  try {

    const ownerId = req.user.userId; 

  
    const venueData = {
      owner_id: ownerId,                 
      name: req.body.name,                
      description: req.body.description,
      state: req.body.state || 'Lagos',
      area: req.body.area,
      address: req.body.address,
      capacity: req.body.capacity,
      pricePerDay: req.body.pricePerDay,
      status: 'pending',                 
      amenities: req.body.amenities || [],
      addOnServices: req.body.addOnServices || []
    };

    const savedVenue = await VenueService.createNewVenue(venueData);
    
    return res.status(201).json({ 
      success: true, 
      message: "Venue listing initialized and queued for admin approval.",
      data: savedVenue 
    });
  } catch (error) {
    return res.status(400).json({ 
      success: false, 
      message: error.message || "Validation Error: Failed to create venue profile attributes." 
    });
  }
};

const deleteVenue = async (req, res) => {
  try {
    const { id } = req.params;
    await VenueService.deleteExistingVenue(id);
    
    return res.status(200).json({ 
      success: true, 
      message: "Venue space successfully deleted from Havilla core." 
    });
  } catch (error) {
    return res.status(400).json({ 
      success: false, 
      message: error.message || "Validation Error: Failed to drop venue entity from engine." 
    });
  }
};

module.exports = { getAllVenues, createVenue, deleteVenue };