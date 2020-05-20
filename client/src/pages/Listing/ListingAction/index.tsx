import React from "react";
import styled from "styled-components";
import { Button } from "../../../components/Common";

const BottomAction = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  width: 100%;
  height: 4rem;
  background-color: #fff;
  border-top: 1px solid var(--color-dark-gray);
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;

  button {
    flex: 1;
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const ListingAction = () => {
  return (
    <BottomAction>
      <ButtonWrapper>
        <Button title="Contact Agent" type="button" classType="outline" />
        <Button title="Book Now" type="button" classType="primary" />
      </ButtonWrapper>
    </BottomAction>
  );
};

export default ListingAction;
