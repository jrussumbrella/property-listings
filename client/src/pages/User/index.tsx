import React from "react";
import UserListings from "./UserListings";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;
`;

const HostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HostImg = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  margin: 1rem 0;
`;

const HostName = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
`;

export const User = () => {
  return (
    <Container>
      <HostWrapper>
        <HostImg
          src="https://img.rentberry.com/7yWNLnGpZGjVjo2HAMJJIwwcvC__o-v-yZYkuQ7dpXc/auto/280/280/sm/1/plain/media/users/profile_picture/80ee6ff8-592f-11e9-9636-7298b86db087.jpeg"
          alt=""
        />
        <HostName> Angela Yu </HostName>
      </HostWrapper>
      <UserListings />
    </Container>
  );
};
