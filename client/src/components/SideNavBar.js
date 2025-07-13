import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Wrapper = styled.div`
  width: 200px;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Title = styled.p`
  color: #141414;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
`;

const NavLinkItem = styled(NavLink)`
  text-decoration: none;
  color: #141414;
  font-family: Inter;
`;

const NavLinkItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
`;

function SideNavBar() {
  return (
    <Wrapper>
      <Title>Medflow</Title>
      <NavLinkItemContainer>
        <CalendarMonthIcon />
        <NavLinkItem to="/">Visits</NavLinkItem>
      </NavLinkItemContainer>
      <NavLinkItemContainer>
        <Diversity1Icon />
        <NavLinkItem to="/dashboard/patients">Patients</NavLinkItem>
      </NavLinkItemContainer>
      <NavLinkItemContainer>
        <BadgeIcon />
        <NavLinkItem to="/dashboard/clinicians">Clinicians</NavLinkItem>
      </NavLinkItemContainer>
    </Wrapper>
  );
}

export default SideNavBar;
