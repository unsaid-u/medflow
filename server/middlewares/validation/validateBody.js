const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const { clinicianBodySchema, visitBodySchema } = require("./schema");

const ajv = new Ajv({ useDefaults: true });

addFormats(ajv);
// adding this because format validation is not included in the default ajv in newer versions

const clinicianValidateFn = ajv.compile(clinicianBodySchema);
const visitValidateFn = ajv.compile(visitBodySchema);

const formatErrors = (errors) =>
  errors.map((err) => ({
    path: err.instancePath || err.dataPath || "",
    message: err.message,
  }));

function validateClinicianBody(req, res, next) {
  const valid = clinicianValidateFn(req.body);

  if (!valid) {
    return res.status(400).json({
      message: "Request body validation failed",
      errors: formatErrors(clinicianValidateFn.errors),
    });
  }

  next();
}

function validateVisitBody(req, res, next) {
  const valid = visitValidateFn(req.body);

  if (!valid) {
    return res.status(400).json({
      message: "Request body validation failed",
      errors: formatErrors(visitValidateFn.errors),
    });
  }

  next();
}

module.exports = { validateClinicianBody, validateVisitBody };
