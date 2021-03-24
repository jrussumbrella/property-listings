import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledHeader = styled.header`
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

export const SiteTitleWrapper = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    text-align: left;
  }
`;

export const SiteTitle = styled(Link)`
  font-size: 1.2rem;
  font-weight: 600;
`;

export const MobileIconWrapper = styled.div`
  padding: 0.5rem;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    display: none;
  }
`;

export const SiteLogo = styled.img`
  width: 10rem;
`;
