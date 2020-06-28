import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Host } from "../../../lib";

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

const ListingContact: React.FC<Host> = ({ id, photoUrl, name }) => {
  return (
    <Container>
      <Heading> Contact Information </Heading>
      <HostWrapper>
        <Link to={`/user/${id}`}>
          <HostImage src={photoUrl} alt={name} />
        </Link>
        <HostName>
          <Link to={`/user/${id}`}>{name}</Link>{" "}
        </HostName>
      </HostWrapper>
    </Container>
  );
};

export default ListingContact;
