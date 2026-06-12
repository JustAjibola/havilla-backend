const mongoose = require('mongoose');

const connectDatabase = async () => {
 
  const dbUri = process.env.MONGO_URI;

  if (!dbUri) {
    console.error(' Configuration Error: MONGO_URI is missing from your environment variables.');
    return;
  }

  const connectionOptions = {
    serverSelectionTimeoutMS: 8000, 
  };

  try {
    console.log(' Requesting secure handshake with MongoDB Atlas cloud replica set...');
 
    const conn = await mongoose.connect(dbUri, connectionOptions);
    
    console.log(` Havilla MongoDB is Live on cloud host: ${conn.connection.host}`);
  } catch (error) {
   
    console.error(`Database initialization core failure log: ${error.message}`);
    console.log(' Tip: Verify your current network IP is added to your MongoDB Atlas Whitelist.');
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn(' Havilla System Notice: MongoDB Atlas cloud connection was lost.');
});

mongoose.connection.on('error', (err) => {
  console.error(' Mongoose internal runtime error context:', err.message);
});

module.exports = connectDatabase;