import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsSearch } from 'react-icons/bs';
import {
  StyledHeader,
  MobileIconWrapper,
  SiteTitleWrapper,
  SiteTitle,
} from './styled';

const AppSkeleton = (): JSX.Element => {
  return (
    <>
      <StyledHeader>
        <MobileIconWrapper>
          <GiHamburgerMenu size={20} />
        </MobileIconWrapper>
        <SiteTitleWrapper>
          <SiteTitle> Property </SiteTitle>
        </SiteTitleWrapper>
        <MobileIconWrapper>
          <BsSearch size={20} />
        </MobileIconWrapper>
      </StyledHeader>
    </>
  );
};

export default AppSkeleton;
