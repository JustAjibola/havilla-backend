const { User } = require('../models/schemas'); 
const BookingService = require('../services/booking.service');

const createNewBooking = async (req, res) => {
  try {

    const plannerId = req.user.userId; 

    const userPayload = await User.findById(plannerId);
    if (!userPayload) {
      return res.status(404).json({ 
        success: false, 
        message: "Booking failed: Authenticated session profile could not be verified in records." 
      });
    }

    const booking = await BookingService.createNewBooking(req.body, plannerId, userPayload);
    
    return res.status(201).json({ 
      success: true, 
      message: "Booking request generated successfully.",
      data: booking 
    });
  } catch (error) {
    return res.status(400).json({ 
      success: false, 
      message: error.message || "An error occurred while creating booking record parameters." 
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingService.fetchAllBookings();
    return res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: error.message || "Internal server exception fetching collection records." 
    });
  }
};

const confirmBooking = async (req, res) => {
  try {
    const { id } = req.params;
    
    const updaterRole = req.user.role; 
  
    const updaterId = req.user.userId;

    const updatedBooking = await BookingService.confirmBookingSession(id, updaterId, updaterRole);
    
    return res.status(200).json({ 
      success: true, 
      message: "Booking status successfully updated to confirmed.", 
      data: updatedBooking 
    });
  } catch (error) {
    return res.status(400).json({ 
      success: false, 
      message: error.message || "Validation Error: Failed to execute status confirmation update." 
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await BookingService.cancelBookingSession(id);
    
    return res.status(200).json({ 
      success: true, 
      message: "Booking cancelled successfully.", 
      data: updatedBooking 
    });
  } catch (error) {
    return res.status(400).json({ 
      success: false, 
      message: error.message || "Validation Error: Failed to modify status parameters." 
    });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await BookingService.removeBookingPermanently(id);
    
    return res.status(200).json({ 
      success: true, 
      message: "Booking record completely removed from database." 
    });
  } catch (error) {
    return res.status(400).json({ 
      success: false, 
      message: error.message || "Validation Error: Failed to drop record attributes from engine." 
    });
  }
};

module.exports = { 
  createNewBooking, 
  getAllBookings, 
  confirmBooking, 
  cancelBooking, 
  deleteBooking 
};