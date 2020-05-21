import React from "react";
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
`;

const Input = styled.input`
  background-color: transparent;
  padding: 0 1rem;
  height: 100%;
  border: 1px solid transparent;
  font-size: 1rem;
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
`;

const SearchForm = () => {
  return (
    <FormSearch>
      <Input type="text" placeholder="Manila City" />
      <Btn type="submit">
        <BsSearch color="#fff" />
      </Btn>
    </FormSearch>
  );
};

export default SearchForm;
