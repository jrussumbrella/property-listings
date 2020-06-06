import React from "react";
import { Link } from "react-router-dom";
import { Listing } from "../../lib";
import { useToast } from "../../store";
import { useMutation } from "@apollo/react-hooks";
import { TOGGLE_FAVORITE } from "../../graphql/mutations";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
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

const ActionWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem;
`;

const IconWrapper = styled.button`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  height: 2.6rem;
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  font-size: 1.5rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

interface Props {
  listing: Listing;
}

const COLOR_RED = "var(--color-red)";

const ListingItem: React.FC<Props> = ({ listing }) => {
  const { setToast } = useToast();

  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: { id: listing.id },
    onCompleted() {},
    onError(err) {
      setToast("error", err.graphQLErrors[0].message);
    },
  });

  const handleToggle = () => {
    toggleFavorite();
  };

  return (
    <ListItem>
      <CoverWrapper>
        <Link to={`/listing/${listing.id}`}>
          <ItemImg src={listing.imageUrl} alt={listing.title} />
        </Link>
        <ActionWrapper>
          {listing.isFavorite ? (
            <IconWrapper type="button" onClick={handleToggle}>
              <AiFillHeart fill={COLOR_RED} />
            </IconWrapper>
          ) : (
            <IconWrapper type="button" onClick={handleToggle}>
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
    </ListItem>
  );
};

export default ListingItem;
