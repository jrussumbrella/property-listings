import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../../Common";
import { useAuth } from "../../../store";
import styled from "styled-components";

const StyledDropDown = styled.ul`
  position: absolute;
  top: calc(100% - -20px);
  right: 0;
  z-index: 8;
  border-radius: 6px;
  background-color: #fff;
  width: 15rem;
  box-shadow: 0 6px 7px 0 rgba(46, 45, 54, 0.25);
`;

const List = styled.li`
  font-size: 1rem;
  text-align: center;
  padding: 0.8rem;

  border-bottom: 1px solid var(--color-gray);
`;

const StyledLink = styled(Link)`
  display: block;
`;

const Dropdown = () => {
  const history = useHistory();
  const { logout } = useAuth();

  const handleLogOut = () => {
    logout();
    history.push("/auth");
  };

  return (
    <StyledDropDown>
      <List>
        <StyledLink to="/profile">My Profile</StyledLink>
      </List>
      <List>
        <Button title="Log Out" type="button" onClick={handleLogOut} />
      </List>
    </StyledDropDown>
  );
};

export default Dropdown;
