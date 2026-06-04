const { Booking, Venue } = require('../models/schemas'); 
const NotificationService = require('./notification.service'); 

class BookingService {
  
  async fetchAllBookings() {
    return await Booking.find().populate('planner venue');
  }

  async createNewBooking(bookingData, plannerId, userPayload) {

    const secureBookingPayload = {
      ...bookingData,
      planner: plannerId
    };

    const savedBooking = await Booking.create(secureBookingPayload);

    if (userPayload && userPayload.email) {
      Venue.findById(bookingData.venue)
        .then(venueDetails => {
          const venueName = venueDetails ? venueDetails.name : "Your Selected Venue";
      
          NotificationService.sendBookingConfirmation(userPayload.email, {
            venueName: venueName,
            date: savedBooking.bookedDate,
            bookingId: savedBooking._id,
            amountPaid: savedBooking.totalAmount || 0
          });
        })
        .catch(err => console.error(" Background notification lookup failed:", err));
    } else {
      console.warn(" Email skipped: No valid userPayload or email property provided.");
    }

    return savedBooking;
  }

  async confirmBookingSession(bookingId, updaterId, updaterRole) {
   
    if (updaterRole !== 'admin' && updaterRole !== 'owner') {
      throw new Error("Forbidden Access: Only designated administrators or owners can confirm booking records.");
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw new Error("Booking record not found.");
    }

    if (booking.status === 'confirmed') {
      throw new Error("This booking has already been confirmed.");
    }

    booking.status = 'confirmed';
    await booking.save();

    return booking;
  }

  async cancelBookingSession(bookingId) {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw new Error("Booking record not found.");
    }

    if (booking.status === 'cancelled') {
      throw new Error("This booking has already been cancelled.");
    }

    booking.status = 'cancelled';
    await booking.save();

    return booking;
  }

  async removeBookingPermanently(bookingId) {
    const droppedRecord = await Booking.findByIdAndDelete(bookingId);
    if (!droppedRecord) {
      throw new Error("Booking document does not exist.");
    }
    return droppedRecord;
  }
}

module.exports = new BookingService();