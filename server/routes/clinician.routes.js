const express = require("express");
const asyncHandler = require("express-async-handler");
const ClinicianHandler = require("../handlers/clinician.handler");

const router = express.Router();

router.get("/", asyncHandler(ClinicianHandler.getAllClinicians));

module.exports = router;
