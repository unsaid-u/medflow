const express = require("express");
const cors = require("cors");
const ClinicianRoutes = require("./routes/clinician.routes");
const PatientRoutes = require("./routes/patient.routes");
const VisitRoutes = require("./routes/visit.routes");
const AuthRoutes = require("./routes/auth.routes");

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/clinicians", ClinicianRoutes);
app.use("/api/v1/patients", PatientRoutes);
app.use("/api/v1/visits", VisitRoutes);

app.use((err, req, res, next) => {
  // ! update this error handler
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

module.exports = app;
