import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Meta from 'components/Meta';
import { useQuery } from '@apollo/react-hooks';
import { LISTINGS } from 'graphql/queries';
import Listings from 'components/Listings';
import ListingsSkeleton from 'components/ListingsSkeleton';
import ErrorMessage from 'components/ErrorMessage';
import Spinner from 'components/Spinner';
import HomeHero from './HomeHero';
import FeaturedCities from './FeaturedCities';
import {
  ViewMoreButton,
  Container,
  Title,
  BottomContainer,
  ReachedEndText,
} from './styled';

const PAGE_LIMIT = 12;
const PAGE = 1;

const Home = (): JSX.Element => {
  const history = useHistory();
  const { loading, data, error, fetchMore } = useQuery(LISTINGS, {
    variables: { page: PAGE, limit: PAGE_LIMIT },
  });

  const [isLoadMore, setIsLoadMore] = useState(false);
  const [page, setPage] = useState(1);

  const listings = data ? data.listings : null;

  const loadMore = useCallback(async () => {
    if (loading) return;

    const currentTotalFetched = listings.result.length;
    const totalItems = listings.total;

    if (currentTotalFetched >= totalItems) {
      setIsLoadMore(false);
      return;
    }

    setIsLoadMore(true);
    setPage((curPage) => curPage + 1);

    await fetchMore({
      variables: {
        page: page + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        if (isLoadMore) return prev;

        return {
          ...prev,
          listings: {
            ...prev.listings,
            result: [
              ...prev.listings.result,
              ...fetchMoreResult.listings.result,
            ],
          },
        };
      },
    });
    setIsLoadMore(false);
  }, [loading, fetchMore, isLoadMore, listings, page]);

  const handleSearchSubmit = (searchText: string) => {
    if (!searchText) return;
    const url = `/listings/${searchText}`;
    history.push(url);
  };

  if (error) return <ErrorMessage message="Error in fetching listings" />;

  const isReachedListingsEnd = listings?.total <= listings?.result.length;

  const spinnerElement = isLoadMore && (
    <Spinner size={3} color="var(--color-primary)" />
  );

  const reachedEndElement = isReachedListingsEnd ? (
    <ReachedEndText> You have reached the end. </ReachedEndText>
  ) : null;

  const viewMoreElement = !isReachedListingsEnd && !isLoadMore && (
    <ViewMoreButton title="View More" onClick={loadMore} />
  );

  return (
    <>
      <Meta title="Home" />
      <HomeHero searchSubmit={handleSearchSubmit} />
      <Container>
        <FeaturedCities />
        <Title> Properties You May Like </Title>
        {loading ? (
          <ListingsSkeleton numbers={12} />
        ) : (
          <Listings listings={listings.result} />
        )}
        <BottomContainer>
          {spinnerElement}
          {viewMoreElement}
          {reachedEndElement}
        </BottomContainer>
      </Container>
    </>
  );
};

export default Home;
