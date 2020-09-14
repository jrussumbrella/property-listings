import React from 'react';
import styled from 'styled-components';

interface StyledProps {
  type: 'error' | 'success' | 'info';
}

export const StyledAlert = styled.div<StyledProps>`
  padding: 1rem;
  border-radius: 6px;
  color: ${(props) => (props.type === 'error' ? '#721c24' : '#004085')};
  background-color: ${(props) =>
    props.type === 'error' ? '#f8d7da' : '#cce5ff'};
  border-color: ${(props) => (props.type === 'error' ? '#f5c6cb' : '#b8daff')};
  font-size: 1.1rem;
  line-height: 1.2;
`;

interface Props {
  message: string;
  type: 'error' | 'success' | 'info';
}

const Alert: React.FC<Props> = ({ message, type }): JSX.Element => {
  return <StyledAlert type={type}>{message}</StyledAlert>;
};

export default Alert;
