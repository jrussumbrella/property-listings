import React, { useState, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { LISTINGS } from 'graphql/queries';
import Listings from 'components/Listings';
import ListingsSkeleton from 'components/ListingsSkeleton';
import ErrorMessage from 'components/ErrorMessage';
import Button from 'components/Button';
import Spinner from 'components/Spinner';

const Container = styled.div`
  @media ${(props) => props.theme.mediaQueries.desktop} {
    max-width: 1200px;
    margin: 1rem auto;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const BottomContainer = styled.div`
  text-align: center;
  padding: 3rem 0;
`;

const ViewMoreButton = styled(Button)`
  width: 15rem;
  border-radius: 50px;
`;

const ReachedEndText = styled.div`
  color: var(--color-primary);
  font-weight: 600;
  font-size: 1.1rem;
`;

const PAGE_LIMIT = 12;
const PAGE = 1;

const HomeListings: React.FC = (): JSX.Element => {
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

  if (loading)
    return (
      <Container>
        <ListingsSkeleton numbers={10} />
      </Container>
    );

  if (error) return <ErrorMessage message="Error in fetching listings" />;

  const isReachedListingsEnd = listings.total <= listings.result.length;

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
    <Container>
      <Title> Properties You May Like </Title>
      <Listings listings={listings.result} />
      <BottomContainer>
        {spinnerElement}
        {viewMoreElement}
        {reachedEndElement}
      </BottomContainer>
    </Container>
  );
};

export default HomeListings;
