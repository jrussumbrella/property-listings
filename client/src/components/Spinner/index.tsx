import React from 'react';
import { StyledSpinner } from './styled';

interface Props {
  color: string;
  size: number;
}

const Spinner = ({ color, size }: Props): JSX.Element => {
  return <StyledSpinner color={color} size={size} />;
};

export default Spinner;
