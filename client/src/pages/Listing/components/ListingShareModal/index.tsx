import React from 'react';
import { Modal } from '../../../../components/Common';
import { FacebookIcon, TwitterIcon } from '../../../../components/Common/Icons';
import { share } from '../../../../lib/utils/socialShare';
import copyToClipBoard from '../../../../utils/copyToClipboard';
import { useToast, useModal } from '../../../../store';
import { MdContentCopy } from 'react-icons/md';
import styled from 'styled-components';

const SocialButton = styled.button`
  background-color: #fff;
  border: 1px solid var(--color-dark-gray);
  border-radius: 6px;
  width: 6rem;
  height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const ListingShareModal = () => {
  const { setToast } = useToast();
  const { toggleModal } = useModal();

  const handleCopyClipBoard = () => {
    copyToClipBoard();
    setToast('success', 'Copied to clipboard');
    toggleModal();
  };

  return (
    <Modal title="Share this Property">
      <Container>
        <SocialButton type="button" onClick={() => share('fb')}>
          <FacebookIcon />
        </SocialButton>
        <SocialButton type="button" onClick={() => share('twitter')}>
          <TwitterIcon />
        </SocialButton>
        <SocialButton onClick={handleCopyClipBoard}>
          <MdContentCopy />
        </SocialButton>
      </Container>
    </Modal>
  );
};