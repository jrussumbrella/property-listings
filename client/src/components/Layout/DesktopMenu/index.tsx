import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../store";
import { Button } from "../../Common";
import styled from "styled-components";
import Dropdown from "./Dropdown";

const Nav = styled.ul`
  display: none;
  align-items: center;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    display: flex;
  }

  .link {
    font-size: 1rem;
    display: block;
  }
`;

const NavList = styled.li`
  padding: 0 1rem;
  position: relative;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }

  span {
    padding: 0 1rem;
  }
`;

const Avatar = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
`;

const DesktopMenu = () => {
  const { user } = useAuth();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => document.removeEventListener("click", handleClickOutSide);
  }, []);

  const handleClickOutSide = (e: Event) => {
    const target = e.target;
    if (target instanceof Node && avatarRef.current?.contains(target)) {
      return;
    }
    setIsOpenDropdown(false);
  };

  const dropdownElement = isOpenDropdown && <Dropdown />;

  const guestRoutes = () => (
    <Nav>
      <NavList>
        <Link to="/auth" className="link">
          Log In
        </Link>
      </NavList>
      <NavList>
        <Link to="/auth/sign-up" className="link">
          Sign Up
        </Link>
      </NavList>
      <NavList>
        <Button
          to="/listing/create"
          classtype="outline"
          type="button"
          title="List your property"
          style={{ width: "100%" }}
        />
      </NavList>
    </Nav>
  );

  const authRoutes = () => (
    <Nav>
      <NavList>
        <Link to="/my-properties" className="link">
          {" "}
          My Properties{" "}
        </Link>
      </NavList>
      <NavList>
        <Link to="/my-favorites" className="link">
          {" "}
          My Favorites{" "}
        </Link>
      </NavList>
      <NavList>
        <Button
          classtype="outline"
          type="button"
          title="List your property"
          style={{ width: "100%" }}
          to="/listing/create"
        />
      </NavList>
      <NavList>
        <UserInfo
          onClick={() => setIsOpenDropdown(!isOpenDropdown)}
          ref={avatarRef}
        >
          {user?.photoUrl ? (
            <img src={user.photoUrl} alt={user.name} />
          ) : (
            <Avatar>{user?.name.charAt(0)}</Avatar>
          )}
        </UserInfo>
        {dropdownElement}
      </NavList>
    </Nav>
  );

  return <>{user ? authRoutes() : guestRoutes()}</>;
};

export default DesktopMenu;
