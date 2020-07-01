import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

const FormSearch = styled.form`
  margin: 1rem 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 6px;
  height: 2.5rem;
  overflow: hidden;
  width: 80%;
  max-width: 30rem;

  @media only screen and (min-width: 768px) {
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

  @media only screen and (min-width: 768px) {
    width: 5rem;
  }
`;

const SearchForm = () => {
  const history = useHistory();
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    const url = `/listings/${search}`;
    history.push(url);
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
