import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

interface StyledButtonProps {
  classtype?: 'primary' | 'outline';
  onClick?(): void;
  style?: Object;
  className?: string;
}

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: var(--color-primary);
  color: #fff;
  border: 1px solid var(--color-primary);
  height: 3rem;
  padding: 0 1rem;
  font-size: 1.1rem;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${(props) =>
    props.classtype === 'outline' &&
    css`
      background: white;
      color: var(--color-primary);
      border: 1px solid var(--color-primary);
    `}
`;

export const StyledLink = styled(Link)<StyledButtonProps>`
  background-color: var(--color-primary);
  color: #fff;
  border: 1px solid var(--color-primary);
  height: 3rem;
  padding: 0 1rem;
  font-size: 1.1rem;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;

  ${(props) =>
    props.classtype === 'outline' &&
    css`
      background: white;
      color: var(--color-primary);
      border: 1px solid var(--color-primary);
    `}
`;

export const StyledIcon = styled.span`
  padding-right: 0.5rem;
`;
