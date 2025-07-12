const express = require("express");
const ClinicianRoutes = require("./routes/clinician.routes");
const PatientRoutes = require("./routes/patient.routes");
const VisitRoutes = require("./routes/visit.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/clinicians", ClinicianRoutes);
app.use("/api/v1/patients", PatientRoutes);
app.use("/api/v1/visits", VisitRoutes);

app.use((err, req, res, next) => {
  // ! update this error handler

  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
