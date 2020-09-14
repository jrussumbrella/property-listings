import React from 'react';
import { Listing } from 'types';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useToast } from 'globalState';
import { TOGGLE_FAVORITE } from 'graphql/mutations';
import {
  CoverWrapper,
  ItemImg,
  ActionWrapper,
  IconWrapper,
  Info,
  Price,
  Title,
  StyledList,
} from './styled';

interface Props {
  listings: Listing[];
}

const COLOR_RED = 'var(--color-red)';

const Listings: React.FC<Props> = ({ listings }): JSX.Element => {
  const { setToast } = useToast();

  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    onError(err) {
      setToast('error', err.graphQLErrors[0].message);
    },
  });

  const handleToggle = (id: string): void => {
    toggleFavorite({ variables: { id } });
  };

  return (
    <StyledList>
      {listings.map((listing) => (
        <div key={listing.id}>
          <CoverWrapper>
            <Link to={`/listing/${listing.id}`}>
              <ItemImg src={listing.imageUrl} alt={listing.title} />
            </Link>
            <ActionWrapper>
              {listing.isFavorite ? (
                <IconWrapper
                  type="button"
                  onClick={() => handleToggle(listing.id)}
                >
                  <AiFillHeart fill={COLOR_RED} />
                </IconWrapper>
              ) : (
                <IconWrapper
                  type="button"
                  onClick={() => handleToggle(listing.id)}
                >
                  <AiOutlineHeart />
                </IconWrapper>
              )}
            </ActionWrapper>
          </CoverWrapper>
          <Link to={`/listing/${listing.id}`}>
            <Info>
              <Title>{listing.title}</Title>
              <Price>P{listing.price}/mo</Price>
            </Info>
          </Link>
        </div>
      ))}
    </StyledList>
  );
};

export default Listings;
