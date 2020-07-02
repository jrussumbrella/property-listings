import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../../components/Common";

const Container = styled.div`
  padding: 1rem 0;
`;

const FilterContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  flex-direction: column;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-dark-gray);
  }
`;

const FilterTitle = styled.span`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FilterInput = styled.input`
  width: 39%;
  height: 2.5rem;
  padding: 0 1rem;
  font-size: 1rem;
  border: 1px solid var(--color-dark-gray);
`;

const Line = styled.div`
  height: 1px;
  width: 1rem;
  margin: 0 1rem;
  background-color: var(--color-dark-gray);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ListingsFilter = () => {
  const initialState = {
    min: "",
    max: "",
  };

  const [filter, setFilter] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <FilterContainer>
        <FilterTitle> Property Type </FilterTitle>
      </FilterContainer>
      <FilterContainer>
        <FilterTitle> Price Range </FilterTitle>
        <Wrapper>
          <FilterInput
            type="text"
            placeholder="Min"
            name="min"
            onChange={handleChange}
            value={filter.min}
          />
          <Line />
          <FilterInput
            type="text"
            name="max"
            placeholder="Max"
            onChange={handleChange}
            value={filter.max}
          />
        </Wrapper>
        <Button type="button" title="Apply" classtype="primary" />
      </FilterContainer>
    </Container>
  );
};

export default ListingsFilter;
