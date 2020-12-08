import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Meta from 'components/Meta';
import { useQuery } from '@apollo/react-hooks';
import queryString from 'query-string';
import Listings from 'components/Listings';
import { LISTINGS } from 'graphql/queries';
import ListingsSkeleton from 'components/ListingsSkeleton';
import EmptyMessage from 'components/EmptyMessage';
import ErrorMessage from 'components/ErrorMessage';
import { PAGE_LIMIT, PAGE } from 'utils/constants';
import ListingsFilter from './ListingsFilter';

import {
  Container,
  SearchListingsContainer,
  SearchText,
  Wrapper,
  ListingsFilterContainer,
} from './styled';

interface Params {
  search: string;
}

interface Variables {
  page: number;
  limit: number;
  location: string;
  filter?: {
    price?: Record<string, number>;
    type?: string | string[] | undefined;
    transactionType?: string | string[] | undefined;
  };
}

interface QueryParams {
  maxPrice?: number;
  minPrice?: number;
  type?: string;
  transactionType?: string;
}

const ListingsPage = (): JSX.Element => {
  const { search: location } = useParams<Params>();
  const { search } = useLocation();

  const params: QueryParams = queryString.parse(search);

  let variables: Variables = {
    page: PAGE,
    limit: PAGE_LIMIT,
    location,
  };

  if (params.maxPrice && params.minPrice) {
    variables = {
      ...variables,
      filter: {
        price: { min: Number(params.minPrice), max: Number(params.maxPrice) },
      },
    };
  }

  if (params.type) {
    const types = params.type.split(' ').map((type) => type.toUpperCase());
    variables = {
      ...variables,
      filter: {
        ...variables.filter,
        type: types,
      },
    };
  }

  if (params.transactionType) {
    const transactionType = params.transactionType
      .split(' ')
      .map((transaction) => transaction.toUpperCase());
    variables = {
      ...variables,
      filter: {
        ...variables.filter,
        transactionType,
      },
    };
  }

  const { data, loading, error } = useQuery(LISTINGS, {
    variables,
  });

  const listings = data ? data.listings : null;

  const renderListings = () => {
    if (loading) {
      return <ListingsSkeleton numbers={12} />;
    }
    if (error) {
      return (
        <ErrorMessage message="Error in searching properties. Please try again later." />
      );
    }
    if (listings.total === 0) {
      return (
        <EmptyMessage
          message="No Results Found"
          description="Try searching for another location."
        />
      );
    }
    return <Listings listings={listings.result} />;
  };

  return (
    <Container>
      <Meta title={`Search Listings for ${location}`} />
      <SearchText>
        Search Results for <span>{location}</span>
      </SearchText>
      <Wrapper>
        <ListingsFilterContainer>
          <ListingsFilter />
        </ListingsFilterContainer>
        <SearchListingsContainer>{renderListings()}</SearchListingsContainer>
      </Wrapper>
    </Container>
  );
};

export default ListingsPage;
