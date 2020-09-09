import React from 'react';
import { FaBed, FaBath } from 'react-icons/fa';
import { Listing } from '../../../../lib';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FiShare } from 'react-icons/fi';
import { useMutation } from '@apollo/react-hooks';
import { TOGGLE_FAVORITE } from '../../../../graphql/mutations';
import { useToast, useModal } from '../../../../store';
import { ListingShareModal } from '../ListingShareModal';
import { ListingContact } from '../ListingContact';
import styled from 'styled-components';

const Container = styled.div`
  @media ${(props) => props.theme.mediaQueries.desktop} {
    display: flex;
  }
`;

const CoverImg = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 60%;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    width: 55%;
    padding-bottom: 50%;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const Wrapper = styled.div`
  padding: 1rem;
  @media only screen and (min-width: 768px) {
    flex: 1;
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  line-height: 1.2;
`;

const PriceWrapper = styled.div`
  font-size: 1.6rem;
  margin-bottom: 2rem;
`;

const Price = styled.span`
  color: var(--color-primary);
  font-weight: 600;
`;

const Location = styled.div`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--color-dark-gray);
`;

const Description = styled.div`
  font-size: 1.1rem;
  line-height: 1.5;
`;

const Heading = styled.div`
  font-size: 1.4rem;
  margin: 1rem 0;
  font-weight: 600;
`;

const Details = styled.ul`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  li {
    padding-right: 1rem;
  }

  span {
    font-size: 1rem;
    padding: 0 0.2rem;
  }
  svg {
    font-size: 1.2rem;
    color: var(--color-dark-gray);
  }
`;

const ActionWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
`;

const IconWrapper = styled.button`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 6px;
  height: 2.6rem;
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  font-size: 1.5rem;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  &:focus {
    outline: none;
  }
`;

interface Props {
  listing: Listing;
}

const COLOR_RED = 'var(--color-red)';

export const ListingInfo: React.FC<Props> = ({ listing }) => {
  const { setToast } = useToast();
  const { openModal } = useModal();
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: { id: listing.id },
    onCompleted() {},
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
              {' '}
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
        <ListingContact {...host} />
      </Wrapper>
    </Container>
  );
};
