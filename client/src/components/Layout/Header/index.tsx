import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";
import { SearchBarMobile, SearchBarDesktop } from "../SearchBar";
import styled from "styled-components";
import Sidebar from "../Sidebar";
import DesktopMenu from "../DesktopMenu";

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

  @media ${(props) => props.theme.mediaQueries.desktop} {
    height: 5.5rem;
  }
`;

const SiteTitleWrapper = styled.div`
  flex: 1;
  text-align: center;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    text-align: left;
  }
`;

const SiteTitle = styled(Link)`
  font-size: 1.2rem;
  font-weight: 600;
`;

const MobileIconWrapper = styled.div`
  padding: 0.5rem;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    display: none;
  }
`;

const Header: React.FC<{}> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearchBar, setIsOpenSearchBar] = useState(false);
  const [isShowDesktopSearchBar, setIsShowDesktopBar] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow");
      return;
    }
    document.body.classList.remove("overflow");
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isShowDesktopSearchBar]);

  function handleScroll() {
    if (window.scrollY > 350) {
      console.log("show");
      setIsShowDesktopBar(true);
      return;
    }
    setIsShowDesktopBar(false);
  }

  // show desktop element
  const desktopSearchBarELement = (isShowDesktopSearchBar ||
    pathname !== "/") && <SearchBarDesktop />;

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
      <SearchBarMobile
        isOpenSearchBar={isOpenSearchBar}
        setIsOpenSearchBar={setIsOpenSearchBar}
      />
      {desktopSearchBarELement}
      <DesktopMenu />
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </StyledHeader>
  );
};

export default Header;
