const express = require("express");
const asyncHandler = require("express-async-handler");
const VisitHandler = require("../handlers/visit.handler");

const router = express.Router();

router.get("/", asyncHandler(VisitHandler.getAllVisits));

module.exports = router;
