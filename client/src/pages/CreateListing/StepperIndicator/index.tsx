import React from 'react';
import { NUMBER_OF_STEP } from 'utils/constants';
import { StepperList, Circle, Line, Stepper } from './styled';

interface Props {
  activeNumber: number;
}

const steppers = Array(NUMBER_OF_STEP)
  .fill(null)
  .map((_, i) => i + 1);

const StepperIndicator: React.FC<Props> = ({ activeNumber }) => {
  const stepperElements = steppers.map((stepper) => (
    <StepperList key={stepper}>
      <Circle active={stepper <= activeNumber}>{stepper}</Circle>
      <Line active={stepper <= activeNumber} />
    </StepperList>
  ));

  return (
    <>
      <Stepper>{stepperElements}</Stepper>
    </>
  );
};

export default StepperIndicator;
