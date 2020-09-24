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

  const handleLoadMore = useCallback(async () => {
    setIsLoadMore(true);
    if (loading) return;
    const { listings } = data.host;
    const currentTotalFetched = listings.result.length;
    const totalItems = listings.total;
    const nextPage = Math.floor((currentTotalFetched * 2) / PAGE_LIMIT);

    if (currentTotalFetched >= totalItems) {
      setIsLoadMore(false);
      return;
    }

    await fetchMore({
      variables: {
        page: nextPage,
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
  }, [loading, fetchMore, isLoadMore, data]);

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

  const { host } = data;

  const { listings } = host;

  const isReachedListingsEnd = listings.total >= listings.result.length;

  return (
    <Container>
      <HostWrapper>
        <HostImg src={host.photoUrl} alt={host.name} />
        <HostName> {host.name} </HostName>
      </HostWrapper>
      <UserListings listings={listings} />
      {isLoadMore && (
        <LoadMoreWrapper>
          <Spinner color="var(--color-primary)" size={3} />
        </LoadMoreWrapper>
      )}
      {!isLoadMore && isReachedListingsEnd && (
        <ReachedEndText> You have reached the end. </ReachedEndText>
      )}
    </Container>
  );
};

export default User;
