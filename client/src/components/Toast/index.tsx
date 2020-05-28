import React from "react";
import { useToast } from "../../store";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";
import styled from "styled-components";

interface StyledProps {
  type: string;
}

const StyledToast = styled.div`
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem;
`;

const Container = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  background: ${(props) =>
    props.type === "success" ? "#8bc34a" : "var(--color-primary)"};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 6px;
  color: #fff;
`;

const Message = styled.div`
  font-size: 1.1rem;
  flex: 1;
`;

const CloseWrapper = styled.div`
  padding-left: 1rem;

  svg {
    cursor: pointer;
  }
`;

export const Toast = () => {
  const { type, message, isActive, removeToast } = useToast();

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: isActive ? 0 : -60, opacity: isActive ? 1 : 0 }}
    >
      <StyledToast>
        <Container type={type}>
          <Message> {message} </Message>
          <CloseWrapper onClick={removeToast}>
            <MdClose size={25} />
          </CloseWrapper>
        </Container>
      </StyledToast>
    </motion.div>
  );
};
