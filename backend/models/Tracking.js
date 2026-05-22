const mongoose = require("mongoose");

const trackingSchema = new mongoose.Schema({
  website: String,
  duration: Number,
  date: String
});

module.exports = mongoose.model("Tracking", trackingSchema);