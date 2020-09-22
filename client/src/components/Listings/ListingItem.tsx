import React from 'react';
import { Listing } from 'types';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { IoMdSquare } from 'react-icons/io';
import { FaBed, FaBath } from 'react-icons/fa';
import useFavorite from 'hooks/useFavorite';
import {
  CoverWrapper,
  ItemImg,
  ActionWrapper,
  IconWrapper,
  Info,
  Price,
  Title,
  Item,
  ListItem,
} from './styled';

const COLOR_RED = 'var(--color-red)';

const ListingItem = ({ listing }: { listing: Listing }) => {
  const { handleToggle, checkIsFavorite } = useFavorite(listing);

  return (
    <ListItem key={listing.id}>
      <CoverWrapper>
        <Link to={`/listing/${listing.id}`}>
          <ItemImg src={listing.imageUrl} alt={listing.title} />
        </Link>
        <ActionWrapper>
          <IconWrapper type="button" onClick={handleToggle}>
            {checkIsFavorite() ? (
              <AiFillHeart fill={COLOR_RED} />
            ) : (
              <AiOutlineHeart />
            )}
          </IconWrapper>
        </ActionWrapper>
      </CoverWrapper>
      <Link to={`/listing/${listing.id}`}>
        <Info>
          <Price>P{listing.price}</Price>
          <Title>{listing.title}</Title>
          <Item>
            <span className="icon">
              <FaBed />
            </span>
            <span className="label">{listing.numOfBedrooms} Bed</span>
            <span className="icon">
              <FaBath />
            </span>
            <span className="label">{listing.numOfBaths} Bath</span>
            <span className="icon">
              <IoMdSquare />
            </span>
            <span className="label">{listing.propertySize} Sq Ft</span>
          </Item>
        </Info>
      </Link>
    </ListItem>
  );
};

export default ListingItem;
