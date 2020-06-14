import React from "react";
import { NUMBER_OF_STEP } from "../../../utils/constants";
import styled from "styled-components";

interface StyledProps {
  active: boolean;
}

interface Props {
  activeNumber: number;
}

const Stepper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
`;

const StepperList = styled.li`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Circle = styled.div<StyledProps>`
  background-color: ${(props) =>
    props.active ? "var(--color-primary)" : "var(--color-dark-gray)"};
  color: #fff;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Line = styled.div<StyledProps>`
  width: 100%;
  background-color: ${(props) =>
    props.active ? "var(--color-primary)" : "var(--color-dark-gray)"};
  height: 6px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: -1;
`;

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
    <div>
      <Stepper>{stepperElements}</Stepper>
    </div>
  );
};

export default StepperIndicator;
