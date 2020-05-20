import React from "react";
import { Link } from "react-router-dom";
import { Listing } from "../../lib";
import styled from "styled-components";

const ListItem = styled.div``;

const CoverWrapper = styled.div`
  width: 100%;
  padding-top: 80%;
  position: relative;
`;

const ItemImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const Info = styled.div`
  padding: 0.5rem;
`;

const Title = styled.div`
  font-size: 1rem;
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  height: 2.5rem;
  line-height: 1.25rem;
`;

const Price = styled.div`
  margin-top: 0.5rem;
  color: var(--color-primary);
  font-weight: 600;
`;

interface Props {
  listing: Listing;
}

const ListingItem: React.FC<Props> = ({ listing }) => {
  return (
    <ListItem>
      <Link to={`/listing/${listing.id}`}>
        <CoverWrapper>
          <ItemImg src={listing.imageUrl} alt={listing.title} />
        </CoverWrapper>
        <Info>
          <Title>{listing.title}</Title>
          <Price>P{listing.price}/mo</Price>
        </Info>
      </Link>
    </ListItem>
  );
};

export default ListingItem;