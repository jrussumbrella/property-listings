import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import styled from 'styled-components';

interface Props {
  selectedTransaction: string;
  searchSubmit(value: string): void;
}

const FormSearch = styled.form`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 6px;
  height: 3rem;
  overflow: hidden;
  width: 80%;
  max-width: 30rem;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    height: 3.5rem;
    font-size: 1.2rem;
    max-width: 45rem;
  }
`;

const Input = styled.input`
  background-color: transparent;
  padding: 0 1rem;
  height: 100%;
  border: 1px solid transparent;
  font-size: inherit;
  flex: 1;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const Btn = styled.button`
  height: 100%;
  background-color: var(--color-primary);
  padding: 0 1rem;
  border: 1px solid var(--color-primary);
  font-size: 1rem;
  cursor: pointer;
  width: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: inherit;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    width: 5rem;
  }
`;

const SearchForm: React.FC<Props> = ({
  selectedTransaction,
  searchSubmit,
}): JSX.Element => {
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchSubmit(search);
  };

  return (
    <FormSearch onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Where do you want to live?"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
      <Btn type="submit">
        <BsSearch color="#fff" />
      </Btn>
    </FormSearch>
  );
};

export default SearchForm;
