import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import queryString from 'query-string';
import { LISTINGS } from 'graphql/queries';
import Listings from 'components/Listings';
import ListingsSkeleton from 'components/ListingsSkeleton';
import EmptyMessage from 'components/EmptyMessage';
import ErrorMessage from 'components/ErrorMessage';
import { PAGE_LIMIT, PAGE } from 'utils/constants';

interface Props {
  location: string;
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

interface Params {
  maxPrice?: number;
  minPrice?: number;
  type?: string;
  transactionType?: string;
}

const SearchListingsResult: React.FC<Props> = ({ location }): JSX.Element => {
  const { search } = useLocation();

  const params: Params = queryString.parse(search);

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

  if (error)
    return (
      <ErrorMessage message="Error in searching properties. Please try again later." />
    );

  if (loading) return <ListingsSkeleton numbers={12} />;

  const { listings } = data;

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

export default SearchListingsResult;
