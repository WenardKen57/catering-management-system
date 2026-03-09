require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();
app.use(bodyParser.json());

const errorMiddleware = require("./middleware/errorMiddleware");

const userRoutes = require("./routes/userRoutes");
const packageRoutes = require("./routes/packageRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const eventRoutes = require("./routes/eventRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/users", userRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

const startServer = async () => {
  await connectDB();
  app.listen(5000, () => console.log("Server running on port 5000"));
};

startServer();
