// components/DashboardLayout.js
import SideNavBar from "./SideNavBar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const Wrapper = styled.div`
  flex: 1;
  background-color: #f0f0f0;
  padding: 20px 20px 0 20px;
  /* height: 100vh; */
`;

export default function Layout() {
  return (
    <Container>
      <SideNavBar />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </Container>
  );
}
