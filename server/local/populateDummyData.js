const { PatientsModel } = require("../models/patient.model");
const { ClinicianModel } = require("../models/clinician.model");

// Sample data arrays for generating realistic patient information
const firstNames = [
  "John",
  "Jane",
  "Michael",
  "Sarah",
  "David",
  "Emily",
  "Robert",
  "Jessica",
  "William",
  "Amanda",
  "James",
  "Ashley",
  "Christopher",
  "Stephanie",
  "Daniel",
  "Nicole",
  "Matthew",
  "Elizabeth",
  "Anthony",
  "Megan",
  "Joshua",
  "Lauren",
  "Andrew",
  "Rachel",
  "Ryan",
  "Kayla",
  "Brandon",
  "Samantha",
  "Justin",
  "Amber",
  "Tyler",
  "Danielle",
  "Kevin",
  "Brittany",
  "Steven",
  "Victoria",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
];

// Medical specialties for clinicians
const medicalSpecialties = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Family Medicine",
  "Gastroenterology",
  "General Surgery",
  "Internal Medicine",
  "Neurology",
  "Obstetrics & Gynecology",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Otolaryngology",
  "Pediatrics",
  "Psychiatry",
  "Pulmonology",
  "Radiology",
  "Rheumatology",
  "Urology",
  "Emergency Medicine",
  "Anesthesiology",
  "Pathology",
  "Physical Medicine",
  "Preventive Medicine",
  "Sports Medicine",
];

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "Charlotte",
  "San Francisco",
  "Indianapolis",
  "Seattle",
  "Denver",
  "Washington",
  "Boston",
  "El Paso",
  "Nashville",
  "Detroit",
  "Oklahoma City",
  "Portland",
  "Las Vegas",
  "Memphis",
  "Louisville",
];

const states = [
  "NY",
  "CA",
  "IL",
  "TX",
  "AZ",
  "PA",
  "FL",
  "OH",
  "NC",
  "WA",
  "CO",
  "DC",
  "MA",
  "TN",
  "MI",
  "OK",
  "OR",
  "NV",
  "KY",
  "GA",
  "VA",
  "NJ",
  "WI",
  "MN",
];

const streetNames = [
  "Main St",
  "Oak Ave",
  "Maple Dr",
  "Cedar Ln",
  "Pine Rd",
  "Elm St",
  "Washington Ave",
  "Park Dr",
  "Lake Rd",
  "Hill St",
  "River Ave",
  "Forest Dr",
  "Sunset Blvd",
  "Mountain View",
  "Ocean Dr",
  "Valley Rd",
  "Spring St",
  "Summer Ave",
  "Winter Dr",
];

// Generate a random phone number
function generatePhoneNumber() {
  const areaCode = Math.floor(Math.random() * 900) + 100; // 100-999
  const prefix = Math.floor(Math.random() * 900) + 100; // 100-999
  const lineNumber = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
  return `${areaCode}-${prefix}-${lineNumber}`;
}

// Generate a random date of birth (18-80 years old)
function generateDateOfBirth() {
  const start = new Date(1944, 0, 1); // 80 years ago
  const end = new Date(2006, 0, 1); // 18 years ago
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return randomDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
}

// Generate a random address
function generateAddress() {
  const streetNumber = Math.floor(Math.random() * 9999) + 1;
  const streetName =
    streetNames[Math.floor(Math.random() * streetNames.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const state = states[Math.floor(Math.random() * states.length)];
  const zipCode = Math.floor(Math.random() * 90000) + 10000; // 5-digit zip

  return `${streetNumber} ${streetName}, ${city}, ${state} ${zipCode}`;
}

// Generate a random email based on name
function generateEmail(firstName, lastName) {
  const domains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "aol.com",
  ];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const randomNum = Math.floor(Math.random() * 999) + 1;

  // Different email patterns
  const patterns = [
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
    `${firstName.toLowerCase()}${lastName.toLowerCase()}@${domain}`,
    `${firstName.toLowerCase()}_${lastName.toLowerCase()}@${domain}`,
    `${firstName.toLowerCase()}${randomNum}@${domain}`,
    `${lastName.toLowerCase()}.${firstName.toLowerCase()}@${domain}`,
  ];

  return patterns[Math.floor(Math.random() * patterns.length)];
}

// Generate a random password
function generatePassword() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Generate a single patient record
function generatePatientRecord() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const fullName = `${firstName} ${lastName}`;

  return {
    name: fullName,
    email: generateEmail(firstName, lastName),
    contact: generatePhoneNumber(),
    address: generateAddress(),
    dob: generateDateOfBirth(),
    profile_image: null, // Optional field, set to null for dummy data
  };
}

// Generate a single clinician record
function generateClinicianRecord() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const fullName = `Dr. ${firstName} ${lastName}`;
  const specialty =
    medicalSpecialties[Math.floor(Math.random() * medicalSpecialties.length)];

  return {
    name: fullName,
    password: generatePassword(),
    specialty: specialty,
    email: generateEmail(firstName, lastName),
    contact: generatePhoneNumber(),
    profile_image: null, // Optional field, set to null for dummy data
  };
}

// Main function to populate dummy patient data
async function populateDummyPatients(count = 20) {
  try {
    console.log(`Starting to populate ${count} dummy patient records...`);

    const patients = [];

    // Generate patient records
    for (let i = 0; i < count; i++) {
      const patientData = generatePatientRecord();
      patients.push(patientData);
    }

    // Insert patients using the PatientsModel
    const createdPatients = [];
    for (const patientData of patients) {
      try {
        const createdPatient = await PatientsModel.createPatient(patientData);
        createdPatients.push(createdPatient);
        console.log(
          `✅ Created patient: ${patientData.name} (${patientData.email})`
        );
      } catch (error) {
        console.error(
          `❌ Failed to create patient ${patientData.name}:`,
          error.message
        );
      }
    }

    console.log(
      `\n🎉 Successfully created ${createdPatients.length} patient records!`
    );
    console.log(
      `📊 Total patients in database: ${await PatientsModel.query().resultSize()}`
    );

    return createdPatients;
  } catch (error) {
    console.error("❌ Error populating dummy patient data:", error);
    throw error;
  }
}

// Function to add a single clinician record
async function addSingleClinician(clinicianData = null) {
  try {
    console.log("Adding a single clinician record...");

    // Generate clinician data if not provided
    const data = clinicianData || generateClinicianRecord();

    // Create clinician using ClinicianModel
    const createdClinician = await ClinicianModel.createClinician(data);

    console.log(`✅ Created clinician: ${data.name} (${data.email})`);
    console.log(`   Specialty: ${data.specialty}`);
    console.log(`   Contact: ${data.contact}`);

    if (!clinicianData) {
      console.log(`   Password: ${data.password} (save this for login)`);
    }

    console.log(
      `📊 Total clinicians in database: ${await ClinicianModel.query().resultSize()}`
    );

    return createdClinician;
  } catch (error) {
    console.error("❌ Error creating clinician:", error);
    throw error;
  }
}

// Function to populate multiple clinician records
async function populateDummyClinicians(count = 10) {
  try {
    console.log(`Starting to populate ${count} dummy clinician records...`);

    const clinicians = [];

    // Generate clinician records
    for (let i = 0; i < count; i++) {
      const clinicianData = generateClinicianRecord();
      clinicians.push(clinicianData);
    }

    // Insert clinicians using the ClinicianModel
    const createdClinicians = [];
    for (const clinicianData of clinicians) {
      try {
        const createdClinician = await ClinicianModel.createClinician(
          clinicianData
        );
        createdClinicians.push(createdClinician);
        console.log(
          `✅ Created clinician: ${clinicianData.name} (${clinicianData.email})`
        );
        console.log(`   Specialty: ${clinicianData.specialty}`);
      } catch (error) {
        console.error(
          `❌ Failed to create clinician ${clinicianData.name}:`,
          error.message
        );
      }
    }

    console.log(
      `\n🎉 Successfully created ${createdClinicians.length} clinician records!`
    );
    console.log(
      `📊 Total clinicians in database: ${await ClinicianModel.query().resultSize()}`
    );

    return createdClinicians;
  } catch (error) {
    console.error("❌ Error populating dummy clinician data:", error);
    throw error;
  }
}

// Function to clear all patient data (use with caution)
async function clearAllPatients() {
  try {
    const deletedCount = await PatientsModel.query().delete();
    console.log(`🗑️  Deleted ${deletedCount} patient records`);
    return deletedCount;
  } catch (error) {
    console.error("❌ Error clearing patient data:", error);
    throw error;
  }
}

// Function to clear all clinician data (use with caution)
async function clearAllClinicians() {
  try {
    const deletedCount = await ClinicianModel.query().delete();
    console.log(`🗑️  Deleted ${deletedCount} clinician records`);
    return deletedCount;
  } catch (error) {
    console.error("❌ Error clearing clinician data:", error);
    throw error;
  }
}

// Function to get current patient count
async function getPatientCount() {
  try {
    const count = await PatientsModel.query().resultSize();
    console.log(`📊 Current patient count: ${count}`);
    return count;
  } catch (error) {
    console.error("❌ Error getting patient count:", error);
    throw error;
  }
}

// Function to get current clinician count
async function getClinicianCount() {
  try {
    const count = await ClinicianModel.query().resultSize();
    console.log(`📊 Current clinician count: ${count}`);
    return count;
  } catch (error) {
    console.error("❌ Error getting clinician count:", error);
    throw error;
  }
}

// Export functions for use in other files
module.exports = {
  // Patient functions
  populateDummyPatients,
  clearAllPatients,
  getPatientCount,
  generatePatientRecord,

  // Clinician functions
  addSingleClinician,
  populateDummyClinicians,
  clearAllClinicians,
  getClinicianCount,
  generateClinicianRecord,
};

// If this file is run directly, add one clinician and 20 patients
if (require.main === module) {
  async function runDummyDataPopulation() {
    try {
      console.log("🚀 Starting dummy data population...\n");

      // Add one clinician first
      await addSingleClinician();
      console.log("\n" + "=".repeat(50) + "\n");

      // Add 20 patients
      await populateDummyPatients(20);

      console.log("\n✅ Dummy data population completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Dummy data population failed:", error);
      process.exit(1);
    }
  }

  runDummyDataPopulation();
}
