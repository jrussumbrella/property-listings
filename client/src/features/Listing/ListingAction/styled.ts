import styled from 'styled-components';

export const BottomAction = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  width: 100%;
  height: 5rem;
  background-color: #fff;
  border-top: 1px solid var(--color-gray);
  margin-top: 20px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;

  @media only screen and (min-width: 768px) {
    max-width: 1200px;
    margin: 0 auto;
    justify-content: center;
  }

  button {
    width: 100%;

    &:not(:last-child) {
      margin-right: 1rem;
    }

    @media only screen and (min-width: 768px) {
      width: 15rem;
    }
  }
`;
