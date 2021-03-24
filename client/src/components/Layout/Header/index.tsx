import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsSearch } from 'react-icons/bs';
import { SearchBarMobile, SearchBarDesktop } from '../SearchBar';
import Sidebar from '../Sidebar';
import DesktopMenu from '../DesktopMenu';
import {
  StyledHeader,
  MobileIconWrapper,
  SiteTitle,
  SiteTitleWrapper,
  SiteLogo,
} from './styled';

const Header: React.FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearchBar, setIsOpenSearchBar] = useState(false);
  const [isShowDesktopSearchBar, setIsShowDesktopBar] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow');
      return;
    }
    document.body.classList.remove('overflow');
  }, [isOpen]);

  const onscroll = () => {
    if (window.scrollY > 335) {
      setIsShowDesktopBar(true);
      return;
    }
    setIsShowDesktopBar(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', onscroll);
    return () => window.removeEventListener('scroll', onscroll);
  }, [isShowDesktopSearchBar]);

  // show desktop element
  const desktopSearchBarElement = (isShowDesktopSearchBar ||
    pathname !== '/') && <SearchBarDesktop />;

  return (
    <StyledHeader>
      <MobileIconWrapper onClick={() => setIsOpen(!isOpen)}>
        <GiHamburgerMenu size={20} />
      </MobileIconWrapper>
      <SiteTitleWrapper>
        <SiteTitle to="/">
          <SiteLogo src="/logo.svg" alt="property-listings-logo" />
        </SiteTitle>
        {desktopSearchBarElement}
      </SiteTitleWrapper>
      <MobileIconWrapper onClick={() => setIsOpenSearchBar(true)}>
        <BsSearch size={20} />
      </MobileIconWrapper>
      <SearchBarMobile
        isOpenSearchBar={isOpenSearchBar}
        setIsOpenSearchBar={setIsOpenSearchBar}
      />
      <DesktopMenu />
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </StyledHeader>
  );
};

export default Header;
