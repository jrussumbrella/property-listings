import React from 'react';
import { MdClose } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useToast } from 'contexts';
import { Message, CloseWrapper, Container } from './styled';

const Toast = (): JSX.Element | null => {
  const { type, message, isActive, removeToast } = useToast();

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: isActive ? 0 : -200, opacity: isActive ? 1 : 0 }}
      style={{
        position: 'fixed',
        top: isActive ? '4rem' : 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '1rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <Container type={type}>
        <Message> {message} </Message>
        <CloseWrapper onClick={removeToast}>
          <MdClose size={25} />
        </CloseWrapper>
      </Container>
    </motion.div>
  );
};

export default Toast;
