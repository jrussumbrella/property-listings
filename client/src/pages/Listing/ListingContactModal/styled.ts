import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
`;

export const FormGroup = styled.div`
  padding: 1rem 0;
`;

export const Label = styled.label`
  display: block;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

export const TextArea = styled.textarea`
  padding: 1rem;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  background-color: #fff;
  border: 1px solid var(--color-dark-gray);
`;

export const ErrorText = styled.div`
  padding-top: 0.5rem;
  color: red;
`;
