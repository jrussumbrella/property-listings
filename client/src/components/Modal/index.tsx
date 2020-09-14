import React from 'react';
import { MdClose } from 'react-icons/md';
import { useModal } from 'globalState';
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
}

const Modal: React.FC<Props> = ({ children, title }): JSX.Element => {
  const { toggleModal } = useModal();

  return (
    <>
      <StyledModal>
        <Header>
          <Title> {title} </Title>
          <CloseWrapper onClick={toggleModal}>
            <MdClose />
          </CloseWrapper>
        </Header>
        <ModalContent>{children}</ModalContent>
      </StyledModal>
      <Overlay onClick={toggleModal} />
    </>
  );
};

export default Modal;
