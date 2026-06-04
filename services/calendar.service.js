const { Booking } = require('../models/schemas');

class CalendarService {

  async checkAvailability(venueId, dateString) {

    const sanitizedVenueId = venueId.toString().trim();
    const sanitizedDate = dateString.trim();

    const activeBookingConflict = await Booking.findOne({
      venue: sanitizedVenueId,
      bookedDate: sanitizedDate,
      status: { $ne: 'cancelled' } 
    });

    return activeBookingConflict ? false : true; 
  }
}

module.exports = new CalendarService();