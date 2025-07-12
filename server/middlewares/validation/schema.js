const clinicianBodySchema = {
  type: "object",
  required: ["name", "password", "specialty", "email", "contact"],
  properties: {
    name: {
      type: "string",
      minLength: 1,
      maxLength: 255,
    },
    password: {
      type: "string",
      minLength: 1,
      maxLength: 255,
    },
    specialty: {
      type: "string",
      minLength: 1,
      maxLength: 255,
    },
    email: {
      type: "string",
      minLength: 1,
      maxLength: 255,
      format: "email",
    },
    contact: {
      type: "string",
      minLength: 1,
      maxLength: 255,
    },
    profile_image: {
      type: "string",
      format: "uri",
      nullable: true,
    },
  },
  additionalProperties: false,
};

const visitBodySchema = {
  type: "object",
  required: ["clinician_id", "patient_id", "patient_name"],
  properties: {
    clinician_id: {
      type: "string",
      minLength: 1,
      maxLength: 255,
    },
    patient_id: {
      type: "string",
      minLength: 1,
      maxLength: 255,
    },
    patient_name: {
      type: "string",
      minLength: 1,
      maxLength: 255,
    },
    visit_type: {
      type: "string",
      nullable: true,
      default: "general",
    },
    notes: {
      type: "string",
      nullable: true,
    },
  },
  additionalProperties: false,
};

module.exports = {
  clinicianBodySchema,
  visitBodySchema,
};
