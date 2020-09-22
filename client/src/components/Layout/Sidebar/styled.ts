import styled from 'styled-components';

interface StyledProps {
  isOpen: boolean;
}

export const StyledSideBar = styled.div<StyledProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 15rem;
  background-color: #fff;
  height: 100%;
  padding: 1rem;
  transform: ${(props) =>
    props.isOpen ? 'translateX(0)' : 'translateX(-100vh)'};
  transition: 0.3s ease;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const NavList = styled.ul`
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

export const Title = styled.h1`
  font-weight: 600;
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }

  span {
    padding: 0 1rem;
    flex: 1;
  }
`;

export const Avatar = styled.div`
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

export const CloseButton = styled.button`
  background-color: transparent;
  border: 1px solid transparent;
`;
