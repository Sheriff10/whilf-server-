const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan"); // Import morgan
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());
app.use(morgan("dev")); // Use morgan to log requests

// Routes
app.use(authRoutes);
app.use(paymentRoutes);
const PORT = process.env.PORT || 5000;
// Database Connection
mongoose
  .connect(
    "mongodb+srv://ibrahimsheriff999:Iyl7ENRYE7I0SynQ@cluster0.gwcrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error("Database connection error:", err));
