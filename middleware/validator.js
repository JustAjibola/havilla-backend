const validateRegisterInput = (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Bad Request: Missing required field attributes (name, email, password, role)."
    });
  }

  const allowedRoles = ['admin', 'planner', 'owner'];
  if (!allowedRoles.includes(role.toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: Assigned system role must be explicitly set to 'admin', 'planner', or 'owner'."
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: Provided email format attribute is invalid."
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: Security password payload must contain at least 6 characters."
    });
  }

  next(); 
};

const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Bad Request: Email and password identification fields cannot be empty."
    });
  }

  next();
};

const validateBookingInput = (req, res, next) => {
  const { venue, bookedDate, totalAmount } = req.body;

  if (!venue || !bookedDate || !totalAmount) {
    return res.status(422).json({
      success: false,
      message: "Unprocessable Structure: Missing totalAmount, venue space, or chronological event operational date string."
    });
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(bookedDate)) {
    return res.status(422).json({
      success: false,
      message: "Unprocessable Structure: Date must follow a valid format blueprint (YYYY-MM-DD)."
    });
  }

  next();
};

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateBookingInput
};