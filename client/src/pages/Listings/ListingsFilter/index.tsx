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

interface InitialState extends Record<string, any> {
  price: Price;
  type: string[] | [];
  transactionType: string[] | [];
}

interface Params {
  minPrice?: number | string | string[];
  maxPrice?: number | string | string[];
  type?: string;
  transactionType?: string;
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
    type: params.type ? String(params.type).split(' ') : [],
    transactionType: params.transactionType
      ? String(params.transactionType).split(' ')
      : [],
  };

  const [filter, setFilter] = useState(initialState);

  const pushUrl = useCallback(
    (newParams: any) => {
      const newParamsStringify = queryString.stringify(newParams);
      const url = `${pathname}?${newParamsStringify}`;
      history.push(url);
    },
    [history, pathname]
  );

  useEffect(() => {
    let newParams: Params = { ...params };

    if (filter.price.maxPrice && filter.price.minPrice) {
      newParams = {
        ...params,
        minPrice: filter.price.minPrice,
        maxPrice: filter.price.maxPrice,
      };
    }

    if (filter.type.length > 0) {
      newParams = {
        ...newParams,
        type: filter.type.join(' '),
      };
    } else {
      delete newParams.type;
    }

    if (filter.transactionType.length > 0) {
      newParams = {
        ...newParams,
        transactionType: filter.transactionType.join(' '),
      };
    } else {
      delete newParams.transactionType;
    }

    pushUrl(newParams);
  }, [
    filter.price.maxPrice,
    filter.price.minPrice,
    filter.type,
    filter.transactionType,
  ]);

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
      const value = [...filter[e.target.name], e.target.value];
      setFilter({ ...filter, [e.target.name]: value });
    } else {
      const { value } = e.target;
      const filterValue = filter[e.target.name].filter(
        (val: string) => val !== value
      );
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
    setFilter({
      price: { minPrice: '', maxPrice: '' },
      type: [],
      transactionType: [],
    });
  };

  const checked = (name: string, value: string) => {
    return filter[name].some((val: string) => val === value);
  };

  return (
    <Container>
      <>
        <FilterContainer>
          <FilterTitle> Transaction Type </FilterTitle>
          <div>
            <input
              data-index="0"
              type="checkbox"
              checked={checked('transactionType', 'rent')}
              id="rent"
              name="transactionType"
              value="rent"
              onChange={handleCheckChange}
            />
            <label htmlFor="rent"> Rent </label>
          </div>
          <div>
            <input
              checked={checked('transactionType', 'buy')}
              data-index="1"
              type="checkbox"
              value="buy"
              id="buy"
              name="transactionType"
              onChange={handleCheckChange}
            />
            <label htmlFor="buy"> Buy </label>
          </div>
        </FilterContainer>
        <FilterContainer>
          <FilterTitle> Property Type </FilterTitle>
          <div>
            <input
              data-index="0"
              type="checkbox"
              checked={checked('type', 'house')}
              id="house"
              name="type"
              value="house"
              onChange={handleCheckChange}
            />
            <label htmlFor="house"> House </label>
          </div>
          <div>
            <input
              checked={checked('type', 'apartment')}
              data-index="1"
              type="checkbox"
              value="apartment"
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
      </>
    </Container>
  );
};

export default ListingsFilter;
