import styled, { css } from 'styled-components';

interface ButtonWrapperProps {
  position: string;
}

interface Error {
  error: boolean;
}

export const Form = styled.form`
  margin: 2rem 0;
`;

export const Label = styled.label`
  display: block;
  padding: 0.5rem 0;
  font-size: 1rem;
`;

export const Select = styled.select<Error>`
  border: 1px solid transparent;
  border-bottom: 1px solid var(--color-dark-gray);
  width: 100%;
  font-size: 1rem;
  height: 3rem;
  background-color: #fff;
  font-size: 1rem;

  ${(props) =>
    props.error &&
    css`
      border-bottom: 1px solid var(--color-red);
    `}
`;

export const TextArea = styled.textarea<Error>`
  border: 1px solid transparent;
  border-bottom: 1px solid var(--color-dark-gray);
  width: 100%;
  font-size: 1rem;
  background-color: #fff;
  font-size: 1rem;

  ${(props) =>
    props.error &&
    css`
      border-bottom: 1px solid var(--color-red);
    `}
`;

export const FormGroup = styled.div`
  padding: 0.5rem 0;
`;

export const InputFile = styled.button`
  background-color: #fff;
  width: 12rem;
  border-radius: 6px;
  border: 1px solid var(--color-dark-gray);
  height: 3rem;
  position: relative;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  span {
    padding: 0 0.5rem;
  }
`;

export const ImagePreview = styled.div`
  width: 200px;
  height: 200px;
  background-size: cover;
  margin-top: 10px;
  border-radius: 6px;
`;

export const ErrorText = styled.div`
  color: var(--color-red);
  font-size: 0.9rem;
  padding-top: 0.5rem;
`;

export const FormBottom = styled.div`
  display: flex;
  align-items: center;
`;

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  margin: 2rem 0;
  display: flex;
  justify-content: ${(props): string =>
    props.position === 'left' ? 'flex-start' : 'flex-end'};
  flex: 1;
`;
