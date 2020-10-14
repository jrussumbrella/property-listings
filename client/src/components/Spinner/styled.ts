import styled from 'styled-components';

interface StyledProps {
  color: string;
  size: number;
}

export const StyledSpinner = styled.div<StyledProps>`
  display: inline-block;
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  vertical-align: text-bottom;
  border: 0.1em solid
    ${(props) => (props.color ? props.color : 'var(--color-primary)')};
  border-right-color: #ccc;
  border-radius: 50%;
  -webkit-animation: spinner-border 0.75s linear infinite;
  animation: spinner-border 0.75s linear infinite;

  @keyframes spinner-border {
    to {
      transform: rotate(360deg);
    }
  }
`;
