import React from 'react';
import { Label, Group, StyledInput, ErrorText } from './styled';

interface Props {
  label?: string;
  error?: boolean;
  name: string;
  id: string;
  value: string | number;
  type: 'text' | 'password' | 'email' | 'number';
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onBlur(e: React.FocusEvent<HTMLInputElement>): void;
  placeholder?: string;
  autoComplete?: string | undefined;
  required?: boolean;
  errorMessage?: string | boolean | undefined;
}

const Input: React.FC<Props> = ({
  label,
  name,
  id,
  value,
  onChange,
  onBlur,
  type,
  error,
  errorMessage,
  placeholder,
  autoComplete = 'false',
  required,
}): JSX.Element => {
  return (
    <>
      <Group>
        {label && <Label htmlFor={name}>{label}</Label>}
        <StyledInput
          type={type}
          id={id}
          onBlur={onBlur}
          onChange={onChange}
          name={name}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          error={error}
        />
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      </Group>
    </>
  );
};

export default Input;
