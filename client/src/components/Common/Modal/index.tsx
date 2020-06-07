import React from "react";
import ReactDOM from "react-dom";
import { useModal } from "../../../store";
import { MdClose } from "react-icons/md";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: #fff;
  border-radius: 6px;
  padding: 1rem;
  width: 80%;
  max-height: 700px;
`;

const Overlay = styled.div`
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

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

const CloseWrapper = styled.div`
  font-size: 1.2rem;
  cursor: pointer;
`;

const ModalContent = styled.div`
  padding-top: 1rem;
`;

export const Modal: React.FC = ({ children }) => {
  const { isOpen, toggleModal } = useModal();

  let modalElement = document.getElementById("modal");

  if (!modalElement) return null;

  return (
    <>
      {isOpen &&
        ReactDOM.createPortal(
          <>
            <StyledModal>
              <Header>
                <Title> Share </Title>
                <CloseWrapper onClick={toggleModal}>
                  <MdClose />
                </CloseWrapper>
              </Header>
              <ModalContent>{children}</ModalContent>
            </StyledModal>
            <Overlay onClick={toggleModal} />
          </>,
          modalElement
        )}
    </>
  );
};
