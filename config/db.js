const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
   
    console.log(`Havilla MongoDB is Live : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database initialization core failure log: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDatabase;