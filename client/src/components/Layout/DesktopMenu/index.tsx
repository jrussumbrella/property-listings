import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../store';
import { Button } from '../../Common';
import styled from 'styled-components';

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
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 50%;
  }

  span {
    padding: 0 1rem;
  }
`;

const Avatar = styled.div`
  width: 2.6rem;
  height: 2.6rem;
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

  const userAvatar = user?.photoUrl ? (
    <img src={user.photoUrl} alt={user.name} />
  ) : (
    <Avatar>{user?.name.charAt(0)}</Avatar>
  );

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
          style={{ width: '100%' }}
        />
      </NavList>
    </Nav>
  );

  const authRoutes = () => (
    <Nav>
      <NavList>
        <Link to="/my-properties" className="link">
          My Properties
        </Link>
      </NavList>
      <NavList>
        <Link to="/my-favorites" className="link">
          My Favorites
        </Link>
      </NavList>
      <NavList>
        <Button
          classtype="outline"
          type="button"
          title="List your property"
          style={{ width: '100%' }}
          to="/listing/create"
        />
      </NavList>
      <NavList>
        <Link to="/profile">
          <UserInfo>{userAvatar}</UserInfo>
        </Link>
      </NavList>
    </Nav>
  );

  return <>{user ? authRoutes() : guestRoutes()}</>;
};

export default DesktopMenu;
