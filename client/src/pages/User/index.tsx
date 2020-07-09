import React, { useEffect, useState } from "react";
import { HOST } from "../../graphql/queries/host";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Spinner } from "../../components/Common";
import UserSkeleton from "./UserSkeleton";
import UserListings from "./UserListings";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    max-width: 1200px;
    margin: 1rem auto;
  }
`;

const HostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HostImg = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  margin: 1rem 0;
`;

const HostName = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
`;

const LoadMoreWrapper = styled.div`
  text-align: center;
`;

const ReachedEndText = styled.div`
  text-align: center;
  font-size: 1.3rem;
  color: var(--color-primary);
`;

const PAGE_LIMIT = 6;

export const User = () => {
  const { id } = useParams();
  const { loading, data, error, fetchMore } = useQuery(HOST, {
    variables: { page: 1, limit: PAGE_LIMIT, id },
  });
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, false);
    return () => window.removeEventListener("scroll", onScroll, false);
  }, [data, loading, isLoadMore]);

  function onScroll() {
    // check if user scroll to bottom
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      handleLoadMore();
    }
  }

  const handleLoadMore = async () => {
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
  };

  if (loading) return <UserSkeleton />;

  if (error) return <h2>Error </h2>;

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
