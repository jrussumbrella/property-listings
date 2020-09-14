import React from 'react';
import { Container, Message, Description } from './styled';

interface Props {
  message: string;
  description: string;
}

const EmptyMessage = ({ message, description }: Props): JSX.Element => {
  return (
    <Container>
      <Message>{message}</Message>
      <Description>{description}</Description>
    </Container>
  );
};

export default EmptyMessage;
