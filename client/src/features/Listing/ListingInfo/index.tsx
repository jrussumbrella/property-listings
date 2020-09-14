import React from 'react';
import { FaBed, FaBath } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FiShare } from 'react-icons/fi';
import { useMutation } from '@apollo/react-hooks';
import { Listing } from 'types';
import { TOGGLE_FAVORITE } from 'graphql/mutations';
import { useToast, useModal } from 'globalState';
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
  const { setToast } = useToast();
  const { openModal } = useModal();

  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: { id: listing.id },
    onError(err) {
      setToast('error', err.graphQLErrors[0].message);
    },
  });

  const { host } = listing;

  const handleToggleFavorite = () => {
    toggleFavorite();
  };

  const handleOpenShare = () => {
    openModal(<ListingShareModal />);
  };

  return (
    <Container>
      <CoverImg>
        <Img src={listing.imageUrl} alt={listing.title} />
        <ActionWrapper>
          {listing.isFavorite ? (
            <IconWrapper onClick={handleToggleFavorite}>
              <AiFillHeart fill={COLOR_RED} />
            </IconWrapper>
          ) : (
            <IconWrapper onClick={handleToggleFavorite}>
              <AiOutlineHeart />
            </IconWrapper>
          )}
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
            <span> 2 Bed </span>
          </li>
          <li>
            <span>
              <FaBath />
            </span>
            <span> 2 Bath </span>
          </li>
        </Details>
        <PriceWrapper>
          <Price>P{listing.price}</Price>/month
        </PriceWrapper>
        <Heading> Description </Heading>
        <Description>{listing.description}</Description>
        <ListingContact host={host} />
      </Wrapper>
    </Container>
  );
};

export default ListingInfo;
