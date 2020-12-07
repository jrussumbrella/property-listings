import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem 0;
`;

export const FilterContainer = styled.form`
  display: flex;
  padding-bottom: 2rem;
  margin-bottom: 1rem;
  flex-direction: column;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-dark-gray);
  }
`;

export const FilterTitle = styled.span`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const FilterInput = styled.input`
  width: 39%;
  height: 2.5rem;
  padding: 0 1rem;
  font-size: 1rem;
  border: 1px solid var(--color-dark-gray);
  margin-bottom: 1rem;
`;

export const Line = styled.div`
  height: 1px;
  width: 1rem;
  margin: 0 1rem;
  background-color: var(--color-dark-gray);
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;
