import React from "react";
import styled from "styled-components";
import { Button } from "../../../components/Common";
import { useModal } from "../../../store";
import { Listing } from "../../../lib";
import ListingContactModal from "../ListingContactModal";

const BottomAction = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  width: 100%;
  height: 4rem;
  background-color: #fff;
  border-top: 1px solid var(--color-dark-gray);
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;

  button {
    flex: 1;
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

interface Props {
  listing: Listing;
}

const ListingAction: React.FC<Props> = ({ listing }) => {
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal(<ListingContactModal id={listing.id} />);
  };

  return (
    <BottomAction>
      <ButtonWrapper>
        <Button title="Call Agent" type="button" classtype="primary" />
        <Button
          title="Email Agent"
          onClick={handleOpenModal}
          type="button"
          classtype="outline"
        />
      </ButtonWrapper>
    </BottomAction>
  );
};

export default ListingAction;
