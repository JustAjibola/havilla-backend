const express = require('express');
const router = express.Router();

const { getAllVenues, createVenue, deleteVenue } = require('../controllers/venue.controller');

const { authenticateToken, requireRole } = require('../middleware/auth');

router.get('/', getAllVenues);

router.post('/', authenticateToken, requireRole(['owner', 'admin']), createVenue);

router.delete('/:id', authenticateToken, requireRole(['admin']), deleteVenue);

module.exports = router;

