import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";

const Container = styled.div`
  display: block;
  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const Input = styled.input`
  height: 100%;
  border: 1px solid transparent;
  padding: 0 10px;
  font-size: 1rem;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const StyledSearchBar = styled.form`
  height: 3rem;
  border-radius: 50px;
  overflow: hidden;
  border: 1px solid var(--color-dark-gray);
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background-color: var(--color-primary);
  height: 100%;
  color: #fff;
  border: 1px solid var(--color-primary);
  font-size: 1rem;
  width: 5rem;
`;

const Wrapper = styled.div`
  padding-left: 1rem;
  flex: 1;
  display: flex;
  align-items: center;
`;

const CloseWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 99;
`;

interface Props {
  isOpenSearchBar: boolean;
  setIsOpenSearchBar(val: boolean): void;
}

export const SearchBarMobile: React.FC<Props> = ({
  isOpenSearchBar,
  setIsOpenSearchBar,
}) => {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchText.trim()) return;
    const url = `/listings/${searchText}`;
    history.push(url);
    setIsOpenSearchBar(false);
  };

  return (
    <Container>
      <motion.div
        initial={{ top: -1000 }}
        animate={{
          top: isOpenSearchBar ? 0 : -1000,
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 999,
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 1rem",
        }}
      >
        <Container>
          <CloseWrapper onClick={() => setIsOpenSearchBar(false)}>
            <MdClose size={30} />
          </CloseWrapper>
          <StyledSearchBar onSubmit={handleSubmit}>
            <Wrapper>
              <BsSearch />
              <Input
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchText(e.target.value)
                }
                value={searchText}
                placeholder="Where do you want to live?"
              />
            </Wrapper>
            <Button type="submit"> Search </Button>
          </StyledSearchBar>
        </Container>
      </motion.div>
    </Container>
  );
};
