const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name field attribute is required"] 
  },
  email: { 
    type: String, 
    required: [true, "Email field attribute is required"], 
    unique: true, 
    lowercase: true,
    trim: true 
  },
  password: { 
    type: String, 
    required: [true, "Password validation payload requires content"] 
  },
  role: { 
    type: String, 
    enum: ['admin', 'planner', 'owner'], 
    required: [true, "Explicit system role registration is mandatory"]
  },
  verified: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

const VenueSchema = new mongoose.Schema({
  owner_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, "Owner ID structural mapping is required"] 
  },
  name: { 
    type: String, 
    required: [true, "Venue name profile definition is required"] 
  },
  description: { 
    type: String 
  },
  state: { 
    type: String, 
    default: 'Lagos' 
  },
  area: { 
    type: String, 
    required: [true, "Lagos region/area classification is required"] 
  },
  address: { 
    type: String, 
    required: [true, "Physical street address location is required"] 
  },
  capacity: { 
    type: Number, 
    required: [true, "Total hall occupant volume capacity is required"] 
  },
  pricePerDay: { 
    type: Number, 
    required: [true, "Base price calculation tier is required"] 
  },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'suspended'], 
    default: 'pending' 
  },
  amenities: [{ 
    type: String 
  }],
  addOnServices: [{
    name: { type: String },
    price: { type: Number },
    unit: { type: String, enum: ['per_head', 'flat', 'per_hour'] }
  }]
}, { timestamps: true });

const BookingSchema = new mongoose.Schema({
  planner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, "Planner relationship key mapping is required"] 
  },
  venue: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Venue', 
    required: [true, "Target space configuration mapping is required"] 
  },
  bookedDate: { 
    type: String, 
    required: [true, "Chronological event operational date string is required"] 
  }, 
  totalAmount: { 
    type: Number, 
    required: [true, "Total financial contract summary computation is required"] 
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'pending' 
  } 
}, { timestamps: true });


module.exports = {
  User: mongoose.model('User', UserSchema),
  Venue: mongoose.model('Venue', VenueSchema),
  Booking: mongoose.model('Booking', BookingSchema)
};