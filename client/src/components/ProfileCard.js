import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";

// Styled Components
const CardContainer = styled.div`
  /* width: 100%; */
  min-width: 300px;
  max-width: 400px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
  background-color: white;
  font-family: Inter;
  height: fit-content;
  align-self: flex-start;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
`;

const NameDOBWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 16px;
  font-family: Inter;
`;

const DOB = styled.div`
  font-size: 13.6px;
  color: #757575;
  font-family: Inter;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Field = styled.div`
  font-size: 15.2px;
  line-height: 22px;
  font-family: Inter;
`;

// Component
const ProfileCard = ({ user }) => {
  // Function to generate avatar color based on name
  const getAvatarColor = (name) => {
    const colors = [
      "#1976d2", // blue
      "#388e3c", // green
      "#f57c00", // orange
      "#7b1fa2", // purple
      "#c2185b", // pink
      "#00796b", // teal
      "#5d4037", // brown
      "#455a64", // blue grey
      "#e53935", // red
      "#fbc02d", // yellow
    ];

    const nameSum = name
      .split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[nameSum % colors.length];
  };
  console.log(user.dob, user.address, user.speciality);
  return (
    <CardContainer>
      <Header>
        <Avatar sx={{ bgcolor: getAvatarColor(user.name) }}>
          {user.name[0]}
        </Avatar>
        <NameDOBWrapper>
          <Name>{user.name}</Name>
          {user.dob && <DOB>DOB: {user.dob}</DOB>}
          {user.speciality && <DOB>Specialty: {user.speciality}</DOB>}
        </NameDOBWrapper>
      </Header>

      <Body>
        {user.email && <Field>{user.email}</Field>}
        {user.address && <Field>{user.address}</Field>}
        {user.contact && <Field>{user.contact}</Field>}
      </Body>
    </CardContainer>
  );
};

export default ProfileCard;
