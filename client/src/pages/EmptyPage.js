import React from "react";
import InsertPageBreakIcon from "@mui/icons-material/InsertPageBreak";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Heading = styled.h1`
  font-family: "Inter";
`;

function EmptyPage() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <InsertPageBreakIcon fontSize="large" />
      <Heading>Page Not Found</Heading>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Return to Home
      </Button>
    </Wrapper>
  );
}

export default EmptyPage;
