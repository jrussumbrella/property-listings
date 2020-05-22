import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";
import Sidebar from "../Sidebar";

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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow");
      return;
    }
    document.body.classList.remove("overflow");
  }, [isOpen]);

  return (
    <StyledHeader>
      <div onClick={() => setIsOpen(!isOpen)}>
        <GiHamburgerMenu size={20} />
      </div>
      <SiteTitleWrapper>
        <SiteTitle to="/"> Property </SiteTitle>
      </SiteTitleWrapper>
      <div>
        <BsSearch size={20} />
      </div>
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </StyledHeader>
  );
};

export default Header;
