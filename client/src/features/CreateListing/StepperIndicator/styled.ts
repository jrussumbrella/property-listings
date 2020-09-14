import styled from 'styled-components';

interface StyledProps {
  active: boolean;
}

export const Stepper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
`;

export const StepperList = styled.li`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Circle = styled.div<StyledProps>`
  background-color: ${(props) =>
    props.active ? 'var(--color-primary)' : 'var(--color-dark-gray)'};
  color: #fff;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Line = styled.div<StyledProps>`
  width: 100%;
  background-color: ${(props) =>
    props.active ? 'var(--color-primary)' : 'var(--color-dark-gray)'};
  height: 6px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: -1;
`;
