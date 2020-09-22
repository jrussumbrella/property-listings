import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'types';
import { Container, Heading, HostImage, HostName, HostWrapper } from './styled';

interface Props {
  host: User;
}

const ListingContact: React.FC<Props> = ({ host }): JSX.Element => {
  return (
    <Container>
      <Heading> Contact Information </Heading>
      <HostWrapper>
        <Link to={`/user/${host.id}`}>
          <HostImage src={host.photoUrl} alt={host.name} />
        </Link>
        <HostName>
          <Link to={`/user/${host.id}`}>{host.name}</Link>{' '}
        </HostName>
      </HostWrapper>
    </Container>
  );
};

export default ListingContact;
