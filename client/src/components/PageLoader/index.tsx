import React from 'react';
import styled from 'styled-components';
import Spinner from '../Spinner';

const StyledPageLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
`;

const PageLoader = (): JSX.Element => {
  return (
    <StyledPageLoader>
      <Spinner color="var(--color-primary)" size={6} />
    </StyledPageLoader>
  );
};

export default PageLoader;
