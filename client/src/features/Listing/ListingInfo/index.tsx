import React from 'react';
import { FaBed, FaBath } from 'react-icons/fa';
import { IoMdSquare } from 'react-icons/io';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FiShare } from 'react-icons/fi';
import { MdSupervisorAccount } from 'react-icons/md';
import { Listing } from 'types';
import { useModal } from 'globalState';
import useFavorite from 'hooks/useFavorite';
import ListingShareModal from '../ListingShareModal';
import ListingContact from '../ListingContact';
import {
  Container,
  CoverImg,
  IconWrapper,
  Img,
  ActionWrapper,
  Title,
  Wrapper,
  Price,
  PriceWrapper,
  Heading,
  Description,
  Location,
  Details,
} from './styled';

interface Props {
  listing: Listing;
}

const COLOR_RED = 'var(--color-red)';

const ListingInfo: React.FC<Props> = ({ listing }): JSX.Element => {
  const { openModal } = useModal();

  const { handleToggle, checkIsFavorite } = useFavorite(listing);

  const { host } = listing;

  const handleOpenShare = () => {
    openModal(<ListingShareModal />);
  };

  return (
    <Container>
      <CoverImg>
        <Img src={listing.imageUrl} alt={listing.title} />
        <ActionWrapper>
          <IconWrapper onClick={handleToggle}>
            {checkIsFavorite() ? (
              <AiFillHeart fill={COLOR_RED} />
            ) : (
              <AiOutlineHeart />
            )}
          </IconWrapper>
          <IconWrapper onClick={handleOpenShare}>
            <FiShare />
          </IconWrapper>
        </ActionWrapper>
      </CoverImg>
      <Wrapper>
        <Title>{listing.title}</Title>
        <Location>{listing.address}</Location>
        <Details>
          <li>
            <span>
              <FaBed />
            </span>
            <span> {listing.numOfBedrooms} Bed </span>
          </li>
          <li>
            <span>
              <FaBath />
            </span>
            <span> {listing.numOfBaths} Bath </span>
          </li>
          <li>
            <span>
              <IoMdSquare />
            </span>
            <span> {listing.propertySize} Sq Ft </span>
          </li>
          <li>
            <span>
              <MdSupervisorAccount />
            </span>
            <span> {listing.propertySize} person </span>
          </li>
        </Details>
        <PriceWrapper>
          <Price>P{listing.price}</Price>
        </PriceWrapper>
        <Heading> Description </Heading>
        <Description>{listing.description}</Description>
        <ListingContact host={host} />
      </Wrapper>
    </Container>
  );
};

export default ListingInfo;
