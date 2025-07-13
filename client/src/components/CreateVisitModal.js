import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import styled from "styled-components";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";
import { patientsAPI, visitsAPI } from "../utils/api";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FieldGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

function CreateVisitModal({ closeModal, onVisitCreated }) {
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    clinicianId: "",
    notes: "",
  });

  const [errorAlert, setErrorAlert] = useState("");

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSearchPatient = async () => {
    if (!formData.patientId) {
      setErrorAlert("Please enter a Patient ID");
      return;
    }

    setErrorAlert("");

    const { data: patient, error } = await patientsAPI.getById(
      formData.patientId
    );

    if (error) {
      setErrorAlert(`Patient not found`);
      return;
    }

    setFormData({
      ...formData,
      patientName: patient.name,
    });
    setErrorAlert("");
  };

  const isFormValid =
    formData.patientId && formData.patientName && formData.clinicianId;

  const handleSave = async () => {
    console.log(formData);
    const requestBody = {
      patient_id: formData.patientId,
      patient_name: formData.patientName,
      clinician_id: formData.clinicianId,
      notes: formData.notes,
    };

    const { data, error } = await visitsAPI.create(requestBody);

    if (error) {
      if (error.includes("400")) {
        setErrorAlert(`Error creating visit : invalid clinician id.`);
      } else {
        setErrorAlert(`Error creating visit, please try again.`);
      }
    } else {
      setErrorAlert("");

      // Call the callback to refresh visits list
      if (onVisitCreated) {
        onVisitCreated();
      }

      closeModal();
    }
  };

  return (
    <Wrapper>
      <FieldGroup>
        <TextField
          label="Patient ID"
          required
          value={formData.patientId}
          onChange={handleChange("patientId")}
        />
        <Tooltip title="Search patient for the id">
          <SearchIcon onClick={handleSearchPatient} />
        </Tooltip>
      </FieldGroup>
      <Tooltip
        describeChild
        title="Click on the search icon to search for a patient"
      >
        <TextField
          label="Patient Name"
          disabled
          required
          value={formData.patientName}
          onChange={handleChange("patientName")}
        />
      </Tooltip>
      <TextField
        label="Clinician ID"
        required
        value={formData.clinicianId}
        onChange={handleChange("clinicianId")}
      />
      <TextField
        label="Notes"
        multiline
        rows={4}
        value={formData.notes}
        onChange={handleChange("notes")}
      />

      {errorAlert ? (
        <Alert severity="error">{errorAlert}</Alert>
      ) : (
        <Alert severity="info">
          Please fill required fields and click on the search icon to search for
          getting patient info.
        </Alert>
      )}

      <Divider />
      <ButtonGroup>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={!isFormValid}
        >
          Save
        </Button>

        <Button variant="contained" color="primary" onClick={closeModal}>
          Close
        </Button>
      </ButtonGroup>
    </Wrapper>
  );
}

export default CreateVisitModal;
