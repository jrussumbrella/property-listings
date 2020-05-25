import React from "react";
import { useAuth } from "../../store";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;
`;

const Info = styled.div`
  padding: 1rem 0;
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
`;

const Name = styled.div`
  padding: 0 1rem;
  font-size: 1.2rem;
`;

export const Profile = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <Container>
      <h1> Personal Info </h1>
      <Info>
        <Img src={user?.photoUrl} alt={user?.name} />
        <Name>{user?.name}</Name>
      </Info>
    </Container>
  );
};
