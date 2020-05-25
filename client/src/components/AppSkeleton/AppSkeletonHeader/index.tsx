import React from "react";
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

const SiteTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

const AppSkeletonHeader: React.FC<{}> = () => {
  return (
    <StyledHeader>
      <GiHamburgerMenu size={20} />
      <SiteTitleWrapper>
        <SiteTitle> Property </SiteTitle>
      </SiteTitleWrapper>
      <div>
        <BsSearch size={20} />
      </div>
    </StyledHeader>
  );
};

export default AppSkeletonHeader;
