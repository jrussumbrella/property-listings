import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "../../../components/Common";
import queryString from "query-string";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem 0;
`;

const FilterContainer = styled.div`
  display: flex;
  padding-bottom: 2rem;
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
  margin-bottom: 1rem;
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

interface IPrice {
  minPrice?: number | string | string[];
  maxPrice?: number | string | string[];
}

interface InitialState {
  price: IPrice;
  propertyType: string[] | [];
}

interface IParams {
  minPrice?: number | string | string[];
  maxPrice?: number | string | string[];
  propertyType?: string;
}

const ListingsFilter = () => {
  const history = useHistory();
  const { pathname, search } = useLocation();
  const params = queryString.parse(search);

  const initialState: InitialState = {
    price: {
      maxPrice: params.maxPrice || "",
      minPrice: params.minPrice || "",
    },
    propertyType: [],
  };

  const [filter, setFilter] = useState(initialState);

  const pushUrl = (newParams: Object) => {
    const newParamsStringify = queryString.stringify(newParams);
    const url = `${pathname}?${newParamsStringify}`;
    history.push(url);
  };

  useEffect(() => {
    let newParams: IParams = {};

    if (filter.price.maxPrice && filter.price.minPrice) {
      newParams = {
        ...params,
        minPrice: filter.price.minPrice,
        maxPrice: filter.price.maxPrice,
      };
    }

    if (filter.propertyType.length > 0) {
      newParams = {
        ...params,
        propertyType: filter.propertyType.join(" "),
      };
    } else {
      if (newParams.propertyType) {
        delete newParams.propertyType;
      }
    }

    pushUrl(newParams);
  }, [filter.propertyType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dataId = e.target.dataset.id;
    if (dataId === "price") {
      setFilter({
        ...filter,
        price: { ...filter.price, [e.target.name]: e.target.value },
      });
      return;
    }
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      const value = [...filter.propertyType, e.target.value];
      setFilter({ ...filter, [e.target.name]: value });
    } else {
      const value = e.target.value;
      const filterValue = filter.propertyType.filter((val) => val !== value);
      setFilter({ ...filter, [e.target.name]: filterValue });
    }
  };

  const handleApplyPrice = () => {
    const newParams = {
      ...params,
      minPrice: filter.price.minPrice,
      maxPrice: filter.price.maxPrice,
    };
    pushUrl(newParams);
  };

  const handleClearFilters = () => {
    history.push(pathname);
    setFilter({ price: { minPrice: "", maxPrice: "" }, propertyType: [] });
  };

  return (
    <Container>
      <FilterContainer>
        <FilterTitle> Property Type </FilterTitle>
        <div>
          <input
            data-index="0"
            type="checkbox"
            checked={filter.propertyType.some((val) => val === "House")}
            id="house"
            name="propertyType"
            value="House"
            onChange={handleCheckChange}
          />
          <label htmlFor="house"> House </label>
        </div>
        <div>
          <input
            checked={filter.propertyType.some((val) => val === "Apartment")}
            data-index="1"
            type="checkbox"
            value="Apartment"
            id="apartment"
            name="propertyType"
            onChange={handleCheckChange}
          />
          <label htmlFor="apartment"> Apartment </label>
        </div>
      </FilterContainer>
      <FilterContainer>
        <FilterTitle> Price Range </FilterTitle>
        <Wrapper>
          <FilterInput
            type="text"
            placeholder="Min"
            name="minPrice"
            data-id="price"
            onChange={handleChange}
            value={filter.price.minPrice}
          />
          <Line />
          <FilterInput
            type="text"
            name="maxPrice"
            data-id="price"
            placeholder="Max"
            onChange={handleChange}
            value={filter.price.maxPrice}
          />
        </Wrapper>
        <Button
          type="button"
          onClick={handleApplyPrice}
          title="Apply"
          classtype="outline"
        />
      </FilterContainer>
      <FilterContainer>
        <Button
          type="button"
          onClick={handleClearFilters}
          title="Clear Filters"
          classtype="primary"
        />
      </FilterContainer>
    </Container>
  );
};

export default ListingsFilter;
