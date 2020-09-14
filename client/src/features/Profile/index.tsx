import React from 'react';
import { useAuth } from 'globalState';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Alert from 'components/Alert';
import { useHistory } from 'react-router-dom';
import {
  AlertWrapper,
  Img,
  Container,
  Text,
  Info,
  Settings,
  BottomContainer,
  LogOutButton,
  Avatar,
} from './styled';

const Profile = (): JSX.Element => {
  const history = useHistory();
  const { user, logout } = useAuth();

  const handleLogOut = () => {
    logout();
    history.push('/login');
  };

  const isEmailVerifiedMessage = !user?.isEmailVerified ? (
    <AlertWrapper>
      <Alert
        message="Your email is not verified. We sent you a verification email in your register email."
        type="info"
      />
    </AlertWrapper>
  ) : null;

  const userPhotoElement = user?.photoUrl ? (
    <Img src={user?.photoUrl} alt={user?.name} />
  ) : (
    <Avatar>{user?.name.charAt(0)}</Avatar>
  );

  return (
    <Container>
      <h2> Personal Info </h2>
      {isEmailVerifiedMessage}
      <Info>
        {userPhotoElement}
        <Text>{user?.name}</Text>
        <Text>{user?.email}</Text>
      </Info>
      <h2> Settings </h2>
      <Settings>
        <li>
          <span>Edit Profile </span>
          <span>
            <MdKeyboardArrowDown />
          </span>
        </li>
        <li>
          <span> Change Password </span>
          <span>
            <MdKeyboardArrowDown />
          </span>
        </li>
      </Settings>
      <BottomContainer>
        <LogOutButton type="button" onClick={handleLogOut}>
          Log Out
        </LogOutButton>
      </BottomContainer>
    </Container>
  );
};

export default Profile;
