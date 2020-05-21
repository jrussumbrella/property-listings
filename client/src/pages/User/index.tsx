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

export const User = () => {
  const { id } = useParams();
  const { loading, data, error } = useQuery(HOST, {
    variables: { page: 1, limit: 10, id },
  });

  if (loading) return <UserSkeleton />;

  if (error) return <h2>Error </h2>;

  const { host } = data;

  const { listings } = host;

  return (
    <Container>
      <HostWrapper>
        <HostImg src={host.photoUrl} alt={host.name} />
        <HostName> {host.name} </HostName>
      </HostWrapper>
      <UserListings listings={listings} />
    </Container>
  );
};
