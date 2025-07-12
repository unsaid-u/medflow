import React from "react";
import styled from "styled-components";

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

function SideNavBar() {
  return (
    <Wrapper>
      <Title>Medflow</Title>
    </Wrapper>
  );
}

export default SideNavBar;
