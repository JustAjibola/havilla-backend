const CalendarService = require('../services/calendar.service');

const verifyDateAvailability = async (req, res) => {
  try {
    const { venueId, date } = req.query;
    
    if (!venueId || !date) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: Both 'venueId' and 'date' coordinates are required."
      });
    }

    const isAvailable = await CalendarService.checkAvailability(venueId, date);
    
    return res.status(200).json({ 
      success: true, 
      available: isAvailable 
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: error.message || "Internal server exception running availability diagnostics engine." 
    });
  }
};

module.exports = { verifyDateAvailability };