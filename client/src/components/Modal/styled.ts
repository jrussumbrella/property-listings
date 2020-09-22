import styled from 'styled-components';

export const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: #fff;
  border-radius: 6px;
  padding: 1rem;
  min-width: 80%;
  max-height: 700px;

  @media only screen and (min-width: 768px) {
    min-width: 50%;
  }
`;

export const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 998;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

export const CloseWrapper = styled.div`
  font-size: 1.2rem;
  cursor: pointer;
`;

export const ModalContent = styled.div`
  padding-top: 1rem;
`;

interface Props {
  title: string;
}
