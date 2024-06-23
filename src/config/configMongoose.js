const mongoose = require("mongoose");

// TODO: Add your connection string here
const connectionString = "mongodb://localhost:27017/examBackEndDB";

async function configMongoose() {
  try {
    await mongoose.connect(connectionString);
    console.log("Database is connected");
  } catch (err) {
    console.error(err);
  }
}

module.exports = configMongoose;
