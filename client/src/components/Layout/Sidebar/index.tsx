import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { Button } from "../../Common";
import { useAuth } from "../../../store";

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
    padding: 1rem 0;
    margin-bottom: 1rem;
    &:not(:last-child) {
      border-bottom: 1px solid var(--color-gray);
    }
  }

  a {
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

const UserInfo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }

  span {
    padding: 0 1rem;
  }
`;

const Sidebar = ({ isOpen, onClose }: Props) => {
  const { user } = useAuth();

  return (
    <>
      <StyledSideBar isOpen={isOpen}>
        <Head>
          <Link to="/" onClick={onClose}>
            <Title> Property </Title>
          </Link>
          <span onClick={onClose}>
            <MdClose size={30} />
          </span>
        </Head>

        {user ? (
          <NavList>
            <li onClick={onClose}>
              <Link to="/profile">
                <UserInfo>
                  <img src={user.photoUrl} alt={user.name} />
                  <span>{user.name}</span>
                </UserInfo>
              </Link>
            </li>
            <li onClick={onClose}>
              <Link to="/auth"> My Property </Link>
            </li>
            <li onClick={onClose}>
              <Link to="/auth"> My Favorites </Link>
            </li>
            <li>
              <Button
                classType="outline"
                type="button"
                title="List your property"
                style={{ width: "100%" }}
              />
            </li>
            <li>
              <Button
                classType="primary"
                type="button"
                title="Log Out"
                style={{ width: "100%" }}
              />
            </li>
          </NavList>
        ) : (
          <NavList>
            <li onClick={onClose}>
              <Link to="/auth"> Log In </Link>
            </li>
            <li onClick={onClose}>
              <Link to="/auth"> Sign Up </Link>
            </li>
            <li>
              <Button
                classType="outline"
                type="button"
                title="List your property"
                style={{ width: "100%" }}
              />
            </li>
          </NavList>
        )}
      </StyledSideBar>
      {isOpen && <Overlay onClick={onClose} />}
    </>
  );
};

export default Sidebar;
