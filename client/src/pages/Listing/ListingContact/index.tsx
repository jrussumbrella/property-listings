import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;
`;

const Heading = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
`;

const HostWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
`;

const HostImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;

const HostName = styled.div`
  flex: 1;
  padding: 0 1rem;
  font-size: 1.1rem;
`;

interface Host {
  id: string;
  name: string;
  photoUrl: string;
}

interface Props {
  host: Host;
}

const ListingContact: React.FC<Props> = ({ host }) => {
  return (
    <Container>
      <Heading> Contact Information </Heading>
      <HostWrapper>
        <Link to={`/user/${host.id}`}>
          <HostImage src={host.photoUrl} alt={host.name} />
        </Link>
        <HostName>
          <Link to={`/user/${host.id}`}>{host.name}</Link>{" "}
        </HostName>
      </HostWrapper>
    </Container>
  );
};

export default ListingContact;
