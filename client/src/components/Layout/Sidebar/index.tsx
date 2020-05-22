import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { Button } from "../../Common";

interface Props {
  isOpen: boolean;
  onClose?(): void;
}

const StyledSideBar = styled.div<Props>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 15rem;
  background-color: #fff;
  height: 100vh;
  padding: 1rem;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(-100vh)"};
  transition: 0.3s ease;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vh;
  height: 100vh;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.5);
`;

const NavList = styled.ul`
  margin-top: 2rem;
  li {
    margin-bottom: 1rem;
    &:not(:last-child) {
      border-bottom: 1px solid var(--color-gray);
    }
  }

  a {
    padding: 1rem 0;
    font-size: 1.2rem;
    display: block;
  }
`;

const Title = styled.h1`
  font-weight: 600;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Sidebar = ({ isOpen, onClose }: Props) => {
  return (
    <>
      <StyledSideBar isOpen={isOpen}>
        <Head>
          <Link to="/" onClick={onClose}>
            <Title> Property </Title>
          </Link>{" "}
          <span onClick={onClose}>
            <MdClose size={30} />
          </span>
        </Head>

        <NavList>
          <li onClick={onClose}>
            <Link to="/auth"> Log In </Link>
          </li>
          <li onClick={onClose}>
            <Link to="/auth"> Sign Up </Link>
          </li>
          <li>
            <Button
              classType="primary"
              type="button"
              title="List your property"
            />
          </li>
        </NavList>
      </StyledSideBar>
      {isOpen && <Overlay onClick={onClose} />}
    </>
  );
};

export default Sidebar;
