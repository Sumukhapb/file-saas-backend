const mongoose = require("mongoose");
const { mongoURI } = require("./config");

function connectDB() {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("MongoDb Connected..."))
    .catch((err) => {
      console.error("DB Not Connected", err);
      process.exit(1);
    });
}

module.exports = connectDB;
