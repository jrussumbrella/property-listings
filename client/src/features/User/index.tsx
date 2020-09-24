import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { HOST } from 'graphql/queries/host';
import Spinner from 'components/Spinner';
import ErrorMessage from 'components/ErrorMessage';
import UserSkeleton from './UserSkeleton';
import UserListings from './UserListings';

import {
  Container,
  HostImg,
  HostWrapper,
  HostName,
  LoadMoreWrapper,
  ReachedEndText,
} from './styled';

const PAGE_LIMIT = 6;

const User = (): JSX.Element => {
  const { id } = useParams();
  const { loading, data, error, fetchMore } = useQuery(HOST, {
    variables: { page: 1, limit: PAGE_LIMIT, id },
  });
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [page, setPage] = useState(1);

  const listings = data ? data.host.listings : null;
  const host = data ? data.host : null;

  const handleLoadMore = useCallback(async () => {
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
          host: {
            ...prev.host,
            listings: {
              ...prev.host.listings,
              result: [
                ...prev.host.listings.result,
                ...fetchMoreResult.host.listings.result,
              ],
            },
          },
        };
      },
    });
    setIsLoadMore(false);
  }, [loading, fetchMore, isLoadMore, listings, page]);

  const onScroll = useCallback(() => {
    // check if user scroll to bottom
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      handleLoadMore();
    }
  }, [handleLoadMore]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, false);
    return () => window.removeEventListener('scroll', onScroll, false);
  }, [data, loading, isLoadMore, onScroll]);

  if (loading) return <UserSkeleton />;

  if (error)
    return <ErrorMessage message="Something went wrong. Please try again." />;

  const isReachedListingsEnd = listings.total <= listings.result.length;

  const spinnerElement = isLoadMore && (
    <LoadMoreWrapper>
      <Spinner color="var(--color-primary)" size={3} />
    </LoadMoreWrapper>
  );

  const reachedEndElement = !isLoadMore && isReachedListingsEnd && (
    <ReachedEndText> You have reached the end. </ReachedEndText>
  );

  return (
    <Container>
      <HostWrapper>
        <HostImg src={host.photoUrl} alt={host.name} />
        <HostName> {host.name} </HostName>
      </HostWrapper>
      <UserListings listings={listings} />
      {spinnerElement}
      {reachedEndElement}
    </Container>
  );
};

export default User;
