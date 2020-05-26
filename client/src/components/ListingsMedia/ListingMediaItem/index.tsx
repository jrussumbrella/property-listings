import React from "react";
import { Listing } from "../../../lib";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdMoreVert } from "react-icons/md";

interface Props {
  listing: Listing;
}

const Item = styled.div`
  display: flex;
  align-items: flex-start;
  border: 1px solid #e9eaef;
  margin-bottom: 1rem;

  a {
    display: block;
  }
`;

const ImgCover = styled.div`
  position: relative;
  width: 120px;
`;

const Img = styled.img`
  width: 120px;
  height: 90px;
`;

const Info = styled.div`
  padding: 0.5rem;
  flex: 1;
  width: 300px;
`;

const Title = styled.div`
  font-size: 1rem;
  margin-bottom: 1rem;
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  height: 2.5rem;
  line-height: 1.25rem;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
`;

const Price = styled.div`
  color: var(--color-primary);
`;

const MoreOptions = styled.div`
  padding: 0.5rem;
  cursor: pointer;
`;

const ListingMediaItem: React.FC<Props> = ({ listing }) => {
  return (
    <Item>
      <ImgCover>
        <Link to={`/listing/${listing.id}`}>
          <Img src={listing.imageUrl} alt={listing.title} />
        </Link>
      </ImgCover>
      <Info>
        <Link to={`/listing/${listing.id}`}>
          <Title>{listing.title}</Title>
          <PriceWrapper>
            <Price>P{listing.price} </Price> /month
          </PriceWrapper>
        </Link>
      </Info>
      <MoreOptions>
        <MdMoreVert size={25} />
      </MoreOptions>
    </Item>
  );
};

export default ListingMediaItem;
