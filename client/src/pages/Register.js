import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Button, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-family: "Inter";
`;

const FormContainer = styled.div`
  /* width: 400px;
  height: 400px; */
  width: 300px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StyledH2 = styled.h2`
  margin-bottom: 0;
`;

const SubText = styled.p`
  margin-bottom: 0;
  margin-top: 0;
`;

const StyledHr = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  border: none;
  margin: 8px 0;
`;

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    specialty: "",
    contact: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    name: "",
    specialty: "",
    contact: "",
  });
  const [errorAlert, setErrorAlert] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleRegister = async () => {
    const newError = {
      email: !formData.email ? "Email is required" : "",
      password: !formData.password ? "Password is required" : "",
      name: !formData.name ? "Name is required" : "",
      specialty: !formData.specialty ? "Specialty is required" : "",
      contact: !formData.contact ? "Contact is required" : "",
    };
    setError(newError);
    if (
      newError.email ||
      newError.password ||
      newError.name ||
      newError.specialty ||
      newError.contact
    )
      return;

    if (!validateEmail(formData.email)) {
      setError({ ...newError, email: "Invalid email" });
      return;
    }

    const { data, error } = await authAPI.register(formData);
    if (error) {
      setErrorAlert("Failed to register, please try again");
      return;
    }

    setErrorAlert("");
    setError({
      email: "",
      password: "",
      name: "",
      specialty: "",
      contact: "",
    });
    login(data.token); // update authentication
    navigate("/login");
  };

  return (
    <Wrapper>
      <FormContainer>
        <StyledH2>Register</StyledH2>
        <SubText>as a clinician</SubText>
        <StyledHr />

        <TextField
          error={!!error.email}
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          variant="outlined"
          fullWidth
          helperText={error.email}
          required
        />
        <TextField
          error={!!error.password}
          type="password"
          label="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          variant="outlined"
          fullWidth
          required
          helperText={error.password}
        />
        <TextField
          error={!!error.name}
          type="text"
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          variant="outlined"
          fullWidth
          required
          helperText={error.name}
        />
        <TextField
          error={!!error.specialty}
          type="text"
          label="Specialty"
          value={formData.specialty}
          onChange={(e) =>
            setFormData({ ...formData, specialty: e.target.value })
          }
          variant="outlined"
          fullWidth
          required
          helperText={error.specialty}
        />
        <TextField
          error={!!error.contact}
          type="text"
          label="Contact"
          value={formData.contact}
          onChange={(e) =>
            setFormData({ ...formData, contact: e.target.value })
          }
          variant="outlined"
          fullWidth
          required
          helperText={error.contact}
        />
        <StyledHr />

        {errorAlert && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {errorAlert}
          </Alert>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
        >
          Register
        </Button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </FormContainer>
    </Wrapper>
  );
}

export default Register;
