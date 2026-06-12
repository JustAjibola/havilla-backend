const { Venue } = require('../models/schemas');

class QuoteService {
  async calculateVenueQuote(venueId, durationDays) {
    const venue = await Venue.findById(venueId);
    if (!venue) {
      throw new Error("Target venue could not be found to generate a quote.");
    }

    const estimatedTax = 0.05;
    const basePrice = venue.pricePerDay * durationDays;
    const totalEstimatedAmount = basePrice + (basePrice * estimatedTax);

    return {
      venueName: venue.name,
      pricePerDay: venue.pricePerDay,
      basePrice,
      totalEstimatedAmount,
      currency: "NGN"
    };
  }
}

module.exports = new QuoteService();