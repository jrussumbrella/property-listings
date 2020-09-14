import React from 'react';
import Button from '../Button';
import { Message, Container } from './styled';

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }): JSX.Element => {
  const handleRefresh = (): void => {
    window.location.reload();
  };

  return (
    <Container>
      <Message>{message}</Message>
      <Button
        type="button"
        title="Refresh Page"
        onClick={handleRefresh}
        variant="primary"
      />
    </Container>
  );
};

export default ErrorMessage;
