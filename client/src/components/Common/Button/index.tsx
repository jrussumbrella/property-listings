import React from 'react';
import { Spinner } from '../Spinner';
import { StyledButton, StyledIcon, StyledLink } from './styled';

interface Props {
  title: string;
  classtype?: 'primary' | 'outline';
  type: 'reset' | 'submit' | 'button';
  onClick?(): void;
  style?: Object;
  disabled?: boolean;
  loading?: boolean;
  to?: string;
  icon?: React.ReactElement;
  className?: string;
}

export const Button = ({
  title,
  type,
  classtype,
  onClick,
  style,
  disabled,
  loading,
  to,
  icon,
  className,
}: Props) => {
  const iconElement = icon ? <StyledIcon>{icon}</StyledIcon> : null;

  const titleWithIconElement = (
    <>
      {iconElement} {title}
    </>
  );

  const textElement = loading ? (
    <Spinner color="#fff" size={1.2} />
  ) : (
    titleWithIconElement
  );

  return (
    <>
      {to ? (
        <StyledLink
          type={type}
          onClick={onClick}
          classtype={classtype}
          style={style}
          to={to}
        >
          {titleWithIconElement}
        </StyledLink>
      ) : (
        <StyledButton
          type={type}
          onClick={onClick}
          classtype={classtype}
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
