import React from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { motion } from 'framer-motion';
import { SearchBarForm } from '../SearchBarForm';

const Container = styled.div`
  display: block;
  @media ${(props) => props.theme.mediaQueries.large}) {
    display: none;
  }
`;

const CloseWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 100;
`;

interface Props {
  isOpenSearchBar: boolean;
  setIsOpenSearchBar(val: boolean): void;
}

export const SearchBarMobile: React.FC<Props> = ({
  isOpenSearchBar,
  setIsOpenSearchBar,
}): JSX.Element => {
  return (
    <Container>
      <motion.div
        initial={{ top: -1000 }}
        animate={{
          top: isOpenSearchBar ? 0 : -1000,
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 999,
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 1rem',
        }}
      >
        <Container>
          <CloseWrapper onClick={() => setIsOpenSearchBar(false)}>
            <MdClose size={30} />
          </CloseWrapper>
          <SearchBarForm onSubmit={() => setIsOpenSearchBar(false)} />
        </Container>
      </motion.div>
    </Container>
  );
};
