import React from 'react';
import { Link } from 'react-router-dom';
import { MdMoreVert } from 'react-icons/md';
import { Listing } from '../../types';
import formatPrice from 'utils/formatPrice';
import {
  Item,
  ImgCover,
  Info,
  Title,
  Price,
  PriceWrapper,
  Img,
  MoreOptions,
} from './styled';

interface Props {
  listing: Listing;
}

const ListingMediaItem: React.FC<Props> = ({ listing }): JSX.Element => {
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
            <Price>{formatPrice(listing.price)} </Price> /month
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
