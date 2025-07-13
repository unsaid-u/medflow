const { PAGINATION_DEFAULT, SORT_ORDER } = require("../constants");
const { ClinicianModel } = require("../models/clinician.model");

class ClinicianHandler {
  static async getAllClinicians(req, res) {
    const {
      pageNo = PAGINATION_DEFAULT.PAGE_NO,
      pageSize = PAGINATION_DEFAULT.PAGE_SIZE,
      searchByName,
      sortBy = "created_at",
      sortOrder = SORT_ORDER.DESC,
    } = req.query;

    const result = await ClinicianModel.getAllClinicians(
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
    //     message: "No clinicians found",
    //   });
    // }

    res.json({
      items,
      page,
    });
  }
}

module.exports = ClinicianHandler;
