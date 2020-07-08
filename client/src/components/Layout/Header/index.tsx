import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";
import Sidebar from "../Sidebar";
import DesktopMenu from "../DesktopMenu";
import { SearchBarMobile } from "../Searchbar";

const StyledHeader = styled.header`
  background-color: #fff;
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;

  @media only screen and (min-width: 768px) {
    height: 5.5rem;
  }
`;

const SiteTitleWrapper = styled.div`
  flex: 1;
  text-align: center;

  @media only screen and (min-width: 768px) {
    text-align: left;
  }
`;

const SiteTitle = styled(Link)`
  font-size: 1.2rem;
  font-weight: 600;
`;

const MobileIconWrapper = styled.div`
  padding: 0.5rem;

  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const Header: React.FC<{}> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearchBar, setIsOpenSearchBar] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow");
      return;
    }
    document.body.classList.remove("overflow");
  }, [isOpen]);

  return (
    <StyledHeader>
      <MobileIconWrapper onClick={() => setIsOpen(!isOpen)}>
        <GiHamburgerMenu size={20} />
      </MobileIconWrapper>
      <SiteTitleWrapper>
        <SiteTitle to="/"> Property </SiteTitle>
      </SiteTitleWrapper>
      <MobileIconWrapper onClick={() => setIsOpenSearchBar(true)}>
        <BsSearch size={20} />
      </MobileIconWrapper>
      <DesktopMenu />
      <SearchBarMobile
        isOpenSearchBar={isOpenSearchBar}
        setIsOpenSearchBar={setIsOpenSearchBar}
      />
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </StyledHeader>
  );
};

export default Header;
