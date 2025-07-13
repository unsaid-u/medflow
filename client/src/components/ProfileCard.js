import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { toast } from "react-toastify";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import Tooltip from "@mui/material/Tooltip";
import useModal from "../hooks/useModal";
import CreateVisitModal from "./CreateVisitModal";

// Styled Components
const CardContainer = styled.div`
  position: relative;
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
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13.6px;
  color: #757575;
  font-family: Inter;

  .copy {
    cursor: pointer;
  }
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

const ButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: flex-end;
  /* margin-top: 16px; */
`;

// Component
const ProfileCard = ({ user, isPatient = false }) => {
  const { openModal, closeModal, Modal } = useModal();

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

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("ID copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  return (
    <CardContainer>
      <Header>
        <Avatar sx={{ bgcolor: getAvatarColor(user.name) }}>
          {user.name[0]}
        </Avatar>
        <NameDOBWrapper>
          <Name>{user.name}</Name>
          {user.id && (
            <DOB
              title={`Click to copy: ${user.id}`}
              className="copy"
              onClick={() => copyToClipboard(user.id)}
              style={{ cursor: "pointer" }}
            >
              {user.id.length > 10 ? `${user.id.slice(0, 20)}...` : user.id}
              <ContentCopyIcon fontSize="small" />
            </DOB>
          )}
          {user.dob && <DOB>DOB: {user.dob}</DOB>}
          {user.speciality && <DOB>Specialty: {user.speciality}</DOB>}
        </NameDOBWrapper>
      </Header>

      <Body>
        {user.email && <Field>{user.email}</Field>}
        {user.address && <Field>{user.address}</Field>}
        {user.contact && <Field>{user.contact}</Field>}
      </Body>

      <ButtonWrapper>
        <Tooltip title="Create Visit" placement="top">
          <IconButton
            variant="contained"
            color="primary"
            onClick={() => openModal()}
          >
            <EditCalendarIcon />
          </IconButton>
        </Tooltip>
      </ButtonWrapper>

      <Modal>
        <CreateVisitModal
          closeModal={closeModal}
          onVisitCreated={() => {}}
          clinicianId={!isPatient ? user.id : null}
          patientId={isPatient ? user.id : null}
          patientName={isPatient ? user.name : null}
        />
      </Modal>
    </CardContainer>
  );
};

export default ProfileCard;
