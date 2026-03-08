require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const userRoutes = require("./routes/userRoutes");
const packageRoutes = require("./routes/packageRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const eventRoutes = require("./routes/eventRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use("/api/users", userRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/payments", paymentRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
