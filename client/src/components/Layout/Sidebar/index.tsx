import React, { useEffect } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { useAuth } from 'contexts';
import Button from 'components/Button';

import {
  StyledSideBar,
  Head,
  Title,
  NavList,
  UserInfo,
  Avatar,
  Overlay,
  CloseButton,
} from './styled';

interface Props {
  isOpen: boolean;
  onClose(): void;
}

const Sidebar = ({ isOpen, onClose }: Props): JSX.Element => {
  const { user, logout } = useAuth();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // on close side bar on route change
    if (isOpen) {
      onClose();
    }
  }, [location]);

  const handleLogOut = (): void => {
    onClose();
    logout();
    history.push('/login');
  };

  const userAvatar = user?.photoUrl ? (
    <img src={user.photoUrl} alt={user.name} />
  ) : (
    <Avatar>{user?.name.charAt(0)}</Avatar>
  );

  const authNav = user ? (
    <NavList>
      <li>
        <Link to="/profile" className="link">
          <UserInfo>
            {userAvatar}
            <span>{user.name}</span>
          </UserInfo>
        </Link>
      </li>
      <li>
        <Link to="/my-properties" className="link">
          My Properties
        </Link>
      </li>
      <li>
        <Link to="/my-favorites" className="link">
          My Favorites
        </Link>
      </li>
      <li>
        <Button
          variant="outline"
          type="button"
          title="List your property"
          style={{ width: '100%' }}
          to="/listing/create"
        />
      </li>
      <li>
        <Button
          variant="primary"
          type="button"
          title="Log Out"
          onClick={handleLogOut}
          style={{ width: '100%' }}
        />
      </li>
    </NavList>
  ) : null;

  const guestNav = !user ? (
    <NavList>
      <li>
        <Link to="/login" className="link">
          Log In
        </Link>
      </li>
      <li>
        <Link to="/sign-up" className="link">
          Sign Up
        </Link>
      </li>
      <li>
        <Button
          to="/listing/create"
          variant="outline"
          type="button"
          title="List your property"
          style={{ width: '100%' }}
        />
      </li>
    </NavList>
  ) : null;

  const overlayElement = isOpen && <Overlay onClick={onClose} />;

  return (
    <>
      <StyledSideBar isOpen={isOpen}>
        <Head>
          <Link to="/" onClick={onClose}>
            <Title> Property </Title>
          </Link>
          <CloseButton type="button" onClick={onClose}>
            <MdClose size={30} />
          </CloseButton>
        </Head>
        {authNav}
        {guestNav}
      </StyledSideBar>
      {overlayElement}
    </>
  );
};

export default Sidebar;
