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

const StyledH2 = styled.h2``;

const StyledHr = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  border: none;
  margin: 8px 0;
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [errorAlert, setErrorAlert] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleLogin = async () => {
    const newError = {
      email: !email ? "Email is required" : "",
      password: !password ? "Password is required" : "",
    };
    setError(newError);
    if (newError.email || newError.password) return;

    if (!validateEmail(email)) {
      setError({ ...newError, email: "Invalid email" });
      return;
    }

    const { data, error } = await authAPI.login({ email, password });
    if (error) {
      setErrorAlert("Invalid email or password");
      return;
    }

    setErrorAlert("");
    setError({ email: "", password: "" });
    login(data.token); // update authentication
    navigate("/");
  };

  return (
    <Wrapper>
      <FormContainer>
        <StyledH2>Login</StyledH2>
        <StyledHr />

        <TextField
          error={!!error.email}
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
          helperText={error.email}
          required
        />
        <TextField
          error={!!error.password}
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
          required
          helperText={error.password}
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
          onClick={handleLogin}
        >
          Login
        </Button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </FormContainer>
    </Wrapper>
  );
}

export default Login;
