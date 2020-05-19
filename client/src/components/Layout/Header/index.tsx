import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: #fff;
  height: 7rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.06);
`;

const SiteTitle = styled(Link)`
  font-size: 1.6rem;
  font-weight: 600;
`;

const Header: React.FC<{}> = () => {
  return (
    <StyledHeader>
      <div>
        <SiteTitle to="/"> Property </SiteTitle>
      </div>
    </StyledHeader>
  );
};

export default Header;
