import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Button from 'components/Button';
import {
  Container,
  FilterContainer,
  FilterInput,
  FilterTitle,
  Wrapper,
  Line,
} from './styled';

interface Price {
  minPrice?: number | string | string[];
  maxPrice?: number | string | string[];
}

interface InitialState {
  price: Price;
  type: string[] | [];
}

interface Params {
  minPrice?: number | string | string[];
  maxPrice?: number | string | string[];
  type?: string;
}

const ListingsFilter = (): JSX.Element => {
  const history = useHistory();
  const { pathname, search } = useLocation();
  const params = queryString.parse(search);

  const initialState: InitialState = {
    price: {
      maxPrice: params.maxPrice || '',
      minPrice: params.minPrice || '',
    },
    type: [],
  };

  const [filter, setFilter] = useState(initialState);

  const pushUrl = useCallback(
    (newParams: Params) => {
      const newParamsStringify = queryString.stringify(newParams);
      const url = `${pathname}?${newParamsStringify}`;
      history.push(url);
    },
    [history, pathname]
  );

  useEffect(() => {
    let newParams: Params = {};

    if (filter.price.maxPrice && filter.price.minPrice) {
      newParams = {
        ...params,
        minPrice: filter.price.minPrice,
        maxPrice: filter.price.maxPrice,
      };
    }

    if (filter.type.length > 0) {
      newParams = {
        ...params,
        type: filter.type.join(' '),
      };
    } else if (newParams.type) {
      delete newParams.type;
    }

    if (Object.keys(newParams).length !== 0) {
      pushUrl(newParams);
    }
  }, [filter.price.maxPrice, filter.price.minPrice, filter.type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dataId = e.target.dataset.id;
    if (dataId === 'price') {
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
      const value = [...filter.type, e.target.value];
      setFilter({ ...filter, [e.target.name]: value });
    } else {
      const { value } = e.target;
      const filterValue = filter.type.filter((val) => val !== value);
      setFilter({ ...filter, [e.target.name]: filterValue });
    }
  };

  const handleApplyPrice = () => {
    if (!filter.price.maxPrice || !filter.price.minPrice) {
      return;
    }
    const newParams = {
      ...params,
      minPrice: filter.price.minPrice,
      maxPrice: filter.price.maxPrice,
    };
    pushUrl(newParams);
  };

  const handleClearFilters = () => {
    history.push(pathname);
    setFilter({ price: { minPrice: '', maxPrice: '' }, type: [] });
  };

  const checked = (value: string) => {
    return filter.type.some((val) => val === value);
  };

  return (
    <Container>
      <form>
        <FilterContainer>
          <FilterTitle> Property Type </FilterTitle>
          <div>
            <input
              data-index="0"
              type="checkbox"
              checked={checked('House')}
              id="house"
              name="type"
              value="House"
              onChange={handleCheckChange}
            />
            <label htmlFor="house"> House </label>
          </div>
          <div>
            <input
              checked={checked('Apartment')}
              data-index="1"
              type="checkbox"
              value="Apartment"
              id="apartment"
              name="type"
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
            variant="outline"
          />
        </FilterContainer>
        <FilterContainer>
          <Button
            type="button"
            onClick={handleClearFilters}
            title="Clear Filters"
            variant="primary"
          />
        </FilterContainer>
      </form>
    </Container>
  );
};

export default ListingsFilter;
