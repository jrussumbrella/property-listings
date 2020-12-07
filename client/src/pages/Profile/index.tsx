import React, { useState } from 'react';
import { useAuth } from 'globalState';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import Alert from 'components/Alert';
import Meta from 'components/Meta';
import { useHistory } from 'react-router-dom';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
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

type SelectedSettings = Array<string>;

const menuSettings = [
  {
    name: 'edit-profile',
    label: 'Edit Profile',
  },
  {
    name: 'change-password',
    label: 'Change Password',
  },
];

const Profile = (): JSX.Element => {
  const history = useHistory();
  const { user, logout } = useAuth();

  const [selectedSettings, setSelectedSettings] = useState<SelectedSettings>(
    []
  );

  const handleLogOut = () => {
    logout();
    history.push('/login');
  };

  const handleSelectSettings = (selected: string) => {
    const isAlreadySelected = selectedSettings.some(
      (setting) => setting === selected
    );
    if (isAlreadySelected) {
      const filteredSettings = selectedSettings.filter(
        (setting) => setting !== selected
      );
      setSelectedSettings(filteredSettings);
    } else {
      setSelectedSettings([...selectedSettings, selected]);
    }
  };

  const renderMenu = (element: string) => {
    switch (element) {
      case 'edit-profile':
        return <EditProfile />;
      case 'change-password':
        return <ChangePassword />;
      default:
        return null;
    }
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

  const renderMenuSettings = () => {
    return menuSettings.map((setting) => (
      <li key={setting.name}>
        <button
          className="btn-settings"
          type="button"
          onClick={() => handleSelectSettings(setting.name)}
        >
          <span>{setting.label} </span>
          <span>
            {selectedSettings.includes(setting.name) ? (
              <MdKeyboardArrowUp />
            ) : (
              <MdKeyboardArrowDown />
            )}
          </span>
        </button>
        {selectedSettings.includes(setting.name) && renderMenu(setting.name)}
      </li>
    ));
  };

  return (
    <Container>
      <Meta title={`${user?.name}`} />
      <h2> Personal Info </h2>
      {isEmailVerifiedMessage}
      <Info>
        {userPhotoElement}
        <Text>{user?.name}</Text>
        <Text>{user?.email}</Text>
      </Info>
      <h2> Settings </h2>
      <Settings>{renderMenuSettings()}</Settings>
      <BottomContainer>
        <LogOutButton type="button" onClick={handleLogOut}>
          Log Out
        </LogOutButton>
      </BottomContainer>
    </Container>
  );
};

export default Profile;
