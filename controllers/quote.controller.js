const QuoteService = require('../services/quote.service');

const requestPlatformQuote = async (req, res) => {
  try {
    const { venueId, requestedDate, durationDays } = req.body;

    if (!venueId || !requestedDate || !durationDays) {
      return res.status(400).json({
        success: false,
        message: "Missing parameter attributes. 'venueId', 'requestedDate', and 'durationDays' are required."
      });
    }

    const quoteDetails = await QuoteService.calculateVenueQuote(venueId, parseInt(durationDays));

    return res.status(200).json({
      success: true,
      message: "Quote projection generated successfully.",
      data: {
        requestedDate,
        ...quoteDetails
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal error compiling quote breakdown analytics."
    });
  }
};

module.exports = { requestPlatformQuote };