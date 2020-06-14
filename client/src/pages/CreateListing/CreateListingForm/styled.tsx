import styled from "styled-components";

export const Form = styled.form`
  margin: 2rem 0;
`;

export const Label = styled.label`
  display: block;
  padding: 0.5rem 0;
  font-size: 1rem;
`;

export const Input = styled.input`
  height: 3rem;
  border: 1px solid transparent;
  border-bottom: 1px solid var(--color-dark-gray);
  width: 100%;
  font-size: 1rem;
`;

export const Select = styled.select`
  border: 1px solid transparent;
  border-bottom: 1px solid var(--color-dark-gray);
  width: 100%;
  font-size: 1rem;
  height: 3rem;
  background-color: #fff;
  font-size: 1rem;
`;

export const TextArea = styled.textarea`
  border: 1px solid transparent;
  border-bottom: 1px solid var(--color-dark-gray);
  width: 100%;
  font-size: 1rem;
  background-color: #fff;
  font-size: 1rem;
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
