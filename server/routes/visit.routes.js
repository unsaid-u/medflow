const express = require("express");
const asyncHandler = require("express-async-handler");
const VisitHandler = require("../handlers/visit.handler");
const { validateVisitBody } = require("../middlewares/validation/validateBody");

const router = express.Router();

router.get("/", asyncHandler(VisitHandler.getAllVisits));

router.post("/", validateVisitBody, asyncHandler(VisitHandler.createVisit));

module.exports = router;
