import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'contexts';
import Button from 'components/Button';
import { Avatar, Nav, NavList, UserInfo } from './styled';

const DesktopMenu = (): JSX.Element => {
  const { user, isLoading } = useAuth();

  const userAvatar = user?.photoUrl ? (
    <img src={user.photoUrl} alt={user.name} />
  ) : (
    <Avatar>{user?.name.charAt(0)}</Avatar>
  );

  const guestRoutes = () => (
    <Nav>
      <NavList>
        <Link to="/login" className="link">
          Log In
        </Link>
      </NavList>
      <NavList>
        <Link to="/sign-up" className="link">
          Sign Up
        </Link>
      </NavList>
      <NavList>
        <Button
          to="/listing/create"
          variant="outline"
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
          variant="outline"
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

  if (isLoading) {
    return <div />;
  }

  return <>{user ? authRoutes() : guestRoutes()}</>;
};

export default DesktopMenu;
