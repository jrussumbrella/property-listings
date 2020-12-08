import React from 'react';
import { MdClose } from 'react-icons/md';
import {
  StyledModal,
  Title,
  CloseWrapper,
  Header,
  ModalContent,
  Overlay,
} from './styled';

interface Props {
  title: string;
  closeModal(): void;
  isVisible: boolean;
}

const Modal: React.FC<Props> = ({
  children,
  title,
  closeModal,
  isVisible,
}): JSX.Element => {
  return (
    <>
      {isVisible && (
        <>
          <StyledModal>
            <Header>
              <Title> {title} </Title>
              <CloseWrapper onClick={closeModal}>
                <MdClose />
              </CloseWrapper>
            </Header>
            <ModalContent>{children}</ModalContent>
          </StyledModal>
          <Overlay onClick={closeModal} />
        </>
      )}
    </>
  );
};

export default Modal;
