import React from "react";
import { useAuth } from "../../store";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Alert } from "../../components";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;

  @media only screen and (min-width: 768px) {
    max-width: 1200px;
    margin: 0 auto;
  }

  h2 {
    font-weight: 600;
  }
`;

const Info = styled.div`
  padding: 1rem 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Img = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  margin-bottom: 1rem;
  background-color: var(--color-primary);
  color: #fff;
  font-size: 2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  padding: 0.5rem;
  font-size: 1.2rem;
`;

const Settings = styled.ul`
  margin: 1rem 0;
  li {
    padding: 1rem 0;
    border-bottom: 1px solid var(--color-gray);
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const AlertWrapper = styled.div`
  margin: 2rem 0;
`;

export const Profile = () => {
  const { user } = useAuth();

  const isEmailVerifiedMessage = !user?.isEmailVerified ? (
    <AlertWrapper>
      <Alert
        message="Please confirm your email before creating your property."
        type="info"
      />
    </AlertWrapper>
  ) : null;

  return (
    <Container>
      <h2> Personal Info </h2>
      {isEmailVerifiedMessage}
      <Info>
        {user?.photoUrl ? (
          <Img src={user?.photoUrl} alt={user?.name} />
        ) : (
          <Avatar>{user?.name.charAt(0)}</Avatar>
        )}

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
    </Container>
  );
};
