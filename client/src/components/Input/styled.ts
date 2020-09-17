import styled, { css } from 'styled-components';

interface InputProps {
  error?: boolean;
}

export const Group = styled.div`
  margin: 1rem 0;
`;
export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-dark-gray);
  font-size: 1rem;
`;

export const StyledInput = styled.input<InputProps>`
  width: 100%;
  height: 3rem;
  font-size: 1rem;
  border: 1px solid transparent;
  border-bottom: 1px solid #666;

  &:focus {
    outline: none;
  }

  ${(props) =>
    props.error &&
    css`
      border-bottom: 1px solid var(--color-red);
    `}
`;

export const ErrorText = styled.div`
  color: var(--color-red);
  font-size: 1rem;
  padding-top: 0.5rem;
`;
