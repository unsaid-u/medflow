const { ClinicianModel } = require("../models/clinician.model");

class AuthHandler {
  static async registerUser(req, res) {
    const user = await ClinicianModel.createClinician(req.body);

    res.status(201).json({
      message: "Clinician created successfully",
      user,
    });
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await ClinicianModel.authenticate(email, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // can set session cookies here

    return res.status(200).json({ message: "Login successful", id: user.id });
  }
}

module.exports = AuthHandler;
