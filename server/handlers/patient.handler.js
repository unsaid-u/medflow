const { PAGINATION_DEFAULT, SORT_ORDER } = require("../constants");
const { PatientsModel } = require("../models/patient.model");

class PatientHandler {
  static async getAllPatients(req, res) {
    const {
      pageNo = PAGINATION_DEFAULT.PAGE_NO,
      pageSize = PAGINATION_DEFAULT.PAGE_SIZE,
      searchByName,
      sortBy = "created_at",
      sortOrder = SORT_ORDER.DESC,
    } = req.query;

    const result = await PatientsModel.getAllPatients(
      pageNo,
      pageSize,
      searchByName,
      sortBy,
      sortOrder
    );

    const { results: items, total: itemTotal } = result;
    const page = {
      type: "number",
      size: +items.length,
      current: +pageNo,
      hasNext: +pageNo * +pageSize < +itemTotal,
      itemTotal,
    };

    // if (items.length === 0) {
    //   return res.status(404).json({
    //     message: "No patients found",
    //   });
    // }

    res.json({
      items,
      page,
    });
  }

  static async getPatientById(req, res) {
    const { id } = req.params;
    const patient = await PatientsModel.getPatientById(id);
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }
    res.json(patient);
  }
}

module.exports = PatientHandler;
