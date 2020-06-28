import React from "react";
import { useHistory } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { Button } from "../../Common";
import { useAuth } from "../../../store";
import styled from "styled-components";

interface StyledProps {
  isOpen: boolean;
}

interface Props {
  isOpen: boolean;
  onClose(): void;
}

const StyledSideBar = styled.div<StyledProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 15rem;
  background-color: #fff;
  height: 100%;
  padding: 1rem;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(-100vh)"};
  transition: 0.3s ease;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.5);
`;

const NavList = styled.ul`
  margin-top: 2rem;
  li {
    padding: 1rem 0;
    margin-bottom: 1rem;
    &:not(:last-child) {
      border-bottom: 1px solid var(--color-gray);
    }
  }

  .link {
    font-size: 1.2rem;
    display: block;
  }
`;

const Title = styled.h1`
  font-weight: 600;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }

  span {
    padding: 0 1rem;
  }
`;

const Avatar = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Sidebar = ({ isOpen, onClose }: Props) => {
  const { user, logout } = useAuth();
  const history = useHistory();

  const handleLogOut = () => {
    onClose();
    logout();
    history.push("/auth");
  };

  return (
    <>
      <StyledSideBar isOpen={isOpen}>
        <Head>
          <Link to="/" onClick={onClose}>
            <Title> Property </Title>
          </Link>
          <span onClick={onClose}>
            <MdClose size={30} />
          </span>
        </Head>

        {user ? (
          <NavList>
            <li onClick={onClose}>
              <Link to="/profile" className="link">
                <UserInfo>
                  {user.photoUrl ? (
                    <img src={user.photoUrl} alt={user.name} />
                  ) : (
                    <Avatar>{user.name.charAt(0)}</Avatar>
                  )}
                  <span>{user.name}</span>
                </UserInfo>
              </Link>
            </li>
            <li onClick={onClose}>
              <Link to="/my-properties" className="link">
                {" "}
                My Properties{" "}
              </Link>
            </li>
            <li onClick={onClose}>
              <Link to="/my-favorites" className="link">
                {" "}
                My Favorites{" "}
              </Link>
            </li>
            <li onClick={onClose}>
              <Button
                classtype="outline"
                type="button"
                title="List your property"
                style={{ width: "100%" }}
                to="/listing/create"
              />
            </li>
            <li>
              <Button
                classtype="primary"
                type="button"
                title="Log Out"
                onClick={handleLogOut}
                style={{ width: "100%" }}
              />
            </li>
          </NavList>
        ) : (
          <NavList>
            <li onClick={onClose}>
              <Link to="/auth" className="link">
                {" "}
                Log In{" "}
              </Link>
            </li>
            <li onClick={onClose}>
              <Link to="/auth/sign-up" className="link">
                {" "}
                Sign Up{" "}
              </Link>
            </li>
            <li onClick={onClose}>
              <Button
                to="/listing/create"
                classtype="outline"
                type="button"
                title="List your property"
                style={{ width: "100%" }}
              />
            </li>
          </NavList>
        )}
      </StyledSideBar>
      {isOpen && <Overlay onClick={onClose} />}
    </>
  );
};

export default Sidebar;
