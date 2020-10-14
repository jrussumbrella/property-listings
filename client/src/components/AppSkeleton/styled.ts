import styled from 'styled-components';

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

  @media only screen and (min-width: 768px) {
    height: 5.5rem;
  }
`;

export const SiteTitleWrapper = styled.div`
  flex: 1;
  text-align: center;

  @media only screen and (min-width: 768px) {
    text-align: left;
  }
`;

export const SiteTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

export const MobileIconWrapper = styled.div`
  padding: 0.5rem;

  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

export const Main = styled.main`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 90vh;
  p {
    margin: 1rem 0;
  }
`;
