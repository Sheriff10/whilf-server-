const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  allocation: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
    unique: true, // Ensure hash is unique
  },
  userEmail: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "verified"],
    default: "pending", // Default status
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
