const express = require("express");
const asyncHandler = require("express-async-handler");
const AuthHandler = require("../handlers/auth.handler");
const {
  validateClinicianBody: validateRegisterBody,
} = require("../middlewares/validation/validateBody");

const router = express.Router();

router.post("/login", asyncHandler(AuthHandler.loginUser));

router.post(
  "/register",
  validateRegisterBody,
  asyncHandler(AuthHandler.registerUser)
);

module.exports = router;
