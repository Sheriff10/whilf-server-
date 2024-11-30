const Payment = require("../models/Payment");
const User = require("../models/User"); // Assuming user allocation is part of the User model

// 1. Controller for recording new payment
exports.recordPayment = async (req, res) => {
  const { amount, allocation, currency, hash, userEmail } = req.body;

  console.log({ amount, allocation, currency, hash, userEmail });

  try {
    // Check if hash is unique
    const existingPayment = await Payment.findOne({ hash });
    if (existingPayment) {
      return res
        .status(400)
        .json({ message: "Hash already exists. Payment not recorded." });
    }

    const newPayment = new Payment({
      amount,
      allocation,
      currency,
      hash,
      userEmail,
    });
    await newPayment.save();

    res
      .status(201)
      .json({ message: "Payment recorded successfully", payment: newPayment });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: "Failed to record payment", error: error.message });
  }
};

// 2. Controller for getting a user's payments
exports.getUserPayments = async (req, res) => {
  const { userEmail } = req.params;

  try {
    const payments = await Payment.find({ userEmail });
    if (!payments.length) {
      return res
        .status(404)
        .json({ message: "No payments found for this user." });
    }

    res
      .status(200)
      .json({ message: "User payments retrieved successfully", payments });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve user payments",
      error: error.message,
    });
  }
};

// 3. Controller for getting all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res
      .status(200)
      .json({ message: "All payments retrieved successfully", payments });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve all payments",
      error: error.message,
    });
  }
};

// 4. Controller for accepting payments
exports.acceptPayment = async (req, res) => {
  const { hash } = req.body;

  try {
    const payment = await Payment.findOne({ hash });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found." });
    }

    if (payment.status === "verified") {
      return res.status(400).json({ message: "Payment is already verified." });
    }

    // Mark payment as verified
    payment.status = "verified";
    await payment.save();

    // Update user allocation
    const user = await User.findOne({ email: payment.userEmail });
    if (user) {
      user.allocation =
        parseFloat(user.allocation || 0) + parseFloat(payment.allocation);
      await user.save();
    }

    res.status(200).json({
      message: "Payment accepted and user allocation updated.",
      payment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to accept payment", error: error.message });
  }
};

// 2. Controller for getting a user's payments
exports.userAllocation = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    res
      .status(200)
      .json({ message: "User payments retrieved successfully", user });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve user payments",
      error: error.message,
    });
  }
};
