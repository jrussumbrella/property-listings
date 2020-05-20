import React from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: #fff;
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
`;

const SiteTitleWrapper = styled.div`
  flex: 1;
  text-align: center;
`;

const SiteTitle = styled(Link)`
  font-size: 1.2rem;
  font-weight: 600;
`;

const Header: React.FC<{}> = () => {
  return (
    <StyledHeader>
      <div>
        <GiHamburgerMenu size={20} />
      </div>
      <SiteTitleWrapper>
        <SiteTitle to="/"> Property </SiteTitle>
      </SiteTitleWrapper>
      <div>
        <BsSearch size={20} />
      </div>
    </StyledHeader>
  );
};

export default Header;
