import React from 'react';
import Button from 'components/Button';
import { useModal } from 'globalState';
import { Listing } from 'types';
import ListingContactModal from '../ListingContactModal';
import { BottomAction, ButtonWrapper } from './styled';

interface Props {
  listing: Listing;
}

const ListingAction: React.FC<Props> = ({ listing }): JSX.Element => {
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal(<ListingContactModal id={listing.id} />);
  };

  return (
    <BottomAction>
      <ButtonWrapper>
        <Button title="Call Agent" type="button" variant="primary" />
        <Button
          title="Email Agent"
          onClick={handleOpenModal}
          type="button"
          variant="outline"
        />
      </ButtonWrapper>
    </BottomAction>
  );
};

export default ListingAction;
