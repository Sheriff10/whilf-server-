const express = require("express");
const {
  recordPayment,
  getUserPayments,
  getAllPayments,
  acceptPayment,
  userAllocation,
} = require("../controllers/paymentController");

const router = express.Router();

// Record a new payment
router.post("/payments", recordPayment);

// Get a user's payments
router.get("/payments/:userEmail", getUserPayments);

// Get all payments
router.get("/payments", getAllPayments);

// Accept a payment and update user allocation
router.post("/payments/accept", acceptPayment);

// user allocaiton
router.get("/allocation/:email", userAllocation);

module.exports = router;
