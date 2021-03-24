import styled from 'styled-components';

export const Input = styled.input`
  height: 100%;
  border: 1px solid transparent;
  padding: 0 10px;
  font-size: 1rem;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

export const StyledSearchBar = styled.form`
  margin: 0 10px;
  height: 3rem;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--color-dark-gray);
  display: flex;
  min-width: 25rem;
  align-items: center;
`;

export const Button = styled.button`
  background-color: var(--color-primary);
  height: 100%;
  color: #fff;
  border: 1px solid var(--color-primary);
  font-size: 1rem;
  width: 5rem;
`;

export const Wrapper = styled.div`
  padding-left: 1rem;
  flex: 1;
  display: flex;
  align-items: center;
`;
