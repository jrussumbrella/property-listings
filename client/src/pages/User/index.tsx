import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { HOST } from "../../graphql/queries/host";
import UserSkeleton from "./UserSkeleton";
import UserListings from "./UserListings";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;
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

const PAGE_LIMIT = 6;

export const User = () => {
  const { id } = useParams();
  const { loading, data, error, fetchMore } = useQuery(HOST, {
    variables: { page: 1, limit: PAGE_LIMIT, id },
  });

  if (loading) return <UserSkeleton />;

  if (error) return <h2>Error </h2>;

  const { host } = data;

  const { listings } = host;

  const handleLoadMore = () => {
    const currentTotalFetched = listings.result.length;
    const totalItems = listings.total;
    const nextPage = Math.floor((currentTotalFetched * 2) / PAGE_LIMIT);

    if (currentTotalFetched > totalItems) return;

    fetchMore({
      variables: {
        page: nextPage,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

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
  };

  return (
    <Container>
      <HostWrapper>
        <HostImg src={host.photoUrl} alt={host.name} />
        <HostName> {host.name} </HostName>
      </HostWrapper>
      <UserListings listings={listings} />
      <button onClick={handleLoadMore}> Load more </button>
    </Container>
  );
};
