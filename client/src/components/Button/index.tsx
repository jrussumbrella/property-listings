import React from 'react';
import Spinner from '../Spinner';
import { StyledButton, StyledIcon, StyledLink } from './styled';

interface Props {
  title: string;
  variant?: 'primary' | 'outline';
  type?: 'reset' | 'submit' | 'button';
  onClick?(): void;
  style?: React.CSSProperties;
  disabled?: boolean;
  loading?: boolean;
  to?: string;
  icon?: React.ReactElement;
  className?: string;
}

const Button = ({
  title,
  type = 'button',
  variant,
  onClick,
  style,
  disabled,
  loading,
  to,
  icon,
  className,
}: Props): JSX.Element => {
  const iconElement = icon ? <StyledIcon>{icon}</StyledIcon> : null;

  const titleWithIconElement = (
    <>
      {iconElement} {title}
    </>
  );

  const textElement = loading ? (
    <Spinner color="#fff" size={1.3} />
  ) : (
    titleWithIconElement
  );

  return (
    <>
      {to ? (
        <StyledLink
          type={type}
          onClick={onClick}
          variant={variant}
          style={style}
          to={to}
        >
          {titleWithIconElement}
        </StyledLink>
      ) : (
        <StyledButton
          type={type}
          onClick={onClick}
          variant={variant}
          style={style}
          disabled={disabled}
          className={className}
        >
          {textElement}
        </StyledButton>
      )}
    </>
  );
};

export default Button;
