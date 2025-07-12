const express = require("express");
const asyncHandler = require("express-async-handler");
const AuthHandler = require("../handlers/auth.handler");

const router = express.Router();

router.post("/login", asyncHandler(AuthHandler.loginUser));
router.post("/register", asyncHandler(AuthHandler.register));

module.exports = router;
