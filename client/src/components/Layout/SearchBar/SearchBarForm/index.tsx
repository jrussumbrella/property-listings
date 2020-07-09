import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

const Input = styled.input`
  height: 100%;
  border: 1px solid transparent;
  padding: 0 10px;
  font-size: 1rem;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const StyledSearchBar = styled.form`
  height: 3rem;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--color-dark-gray);
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background-color: var(--color-primary);
  height: 100%;
  color: #fff;
  border: 1px solid var(--color-primary);
  font-size: 1rem;
  width: 5rem;
`;

const Wrapper = styled.div`
  padding-left: 1rem;
  flex: 1;
  display: flex;
  align-items: center;
`;

interface Props {
  onSubmit?(): void;
}

export const SearchBarForm: React.FC<Props> = ({ onSubmit }) => {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchText.trim()) return;
    const url = `/listings/${searchText}`;
    history.push(url);
    if (onSubmit) onSubmit();
  };

  return (
    <StyledSearchBar onSubmit={handleSubmit}>
      <Wrapper>
        <Input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target.value)
          }
          value={searchText}
          placeholder="Where do you want to live?"
        />
      </Wrapper>
      <Button type="submit">
        <BsSearch />
      </Button>
    </StyledSearchBar>
  );
};
