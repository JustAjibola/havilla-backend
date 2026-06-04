const express = require('express');
const router = express.Router();

const { validateBookingInput } = require('../middleware/validator');
const { authenticateToken } = require('../middleware/auth');

const { 
  createNewBooking, 
  getAllBookings, 
  cancelBooking,
  confirmBooking, 
  deleteBooking 
} = require('../controllers/booking.controller');

router.use(authenticateToken);

router.post('/', validateBookingInput, createNewBooking);

router.get('/', getAllBookings);

router.patch('/:id/cancel', cancelBooking);

router.patch('/:id/confirm', confirmBooking); 

router.delete('/:id', deleteBooking);

module.exports = router;