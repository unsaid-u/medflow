const {
  PAGINATION_DEFAULT,
  SORT_ORDER,
  FOREIGN_KEY_ERROR_CODE,
} = require("../constants");
const { VisitsModel } = require("../models/visit.model");

class VisitHandler {
  static async getAllVisits(req, res) {
    const {
      pageNo = PAGINATION_DEFAULT.PAGE_NO,
      pageSize = PAGINATION_DEFAULT.PAGE_SIZE,
      searchByName,
      sortBy = "created_at",
      sortOrder = SORT_ORDER.DESC,
      clinicianId,
      patientId,
    } = req.query;

    const result = await VisitsModel.getAllVisits(
      pageNo,
      pageSize,
      searchByName,
      sortBy,
      sortOrder,
      clinicianId,
      patientId
    );

    const { results: items, total: itemTotal } = result;

    // if (items.length === 0) {
    //   return res.status(404).json({
    //     message: "No visits found",
    //   });
    // }

    const page = {
      type: "number",
      size: +items.length,
      current: +pageNo,
      hasNext: +pageNo * +pageSize < +itemTotal,
      itemTotal,
    };

    res.json({
      items,
      page,
    });
  }

  static async createVisit(req, res) {
    try {
      const visit = await VisitsModel.createVisit(req.body);
      res.status(201).json({
        message: "Visit created successfully",
        visit,
      });
    } catch (error) {
      if (error?.name === "ForeignKeyViolationError") {
        res.status(400).json({
          code: "ForeignKeyViolationError",
          error: "Invalid patient information",
          details: {
            clinician_id: "Not provided or invalid",
          },
        });
      }
      // Default error handling
      res.status(500).json({
        message: "Error creating visit",
        error: error.message,
      });
    }
  }
}

module.exports = VisitHandler;
