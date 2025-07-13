const express = require("express");
const asyncHandler = require("express-async-handler");
const PatientHandler = require("../handlers/patient.handler");

const router = express.Router();

router.get("/", asyncHandler(PatientHandler.getAllPatients));
router.get("/:id", asyncHandler(PatientHandler.getPatientById));

module.exports = router;
