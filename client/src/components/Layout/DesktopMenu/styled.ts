import styled from 'styled-components';

export const Nav = styled.ul`
  display: none;
  align-items: center;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    display: flex;
  }

  .link {
    font-size: 1rem;
    display: block;
  }

  .link:hover {
    color: var(--color-primary);
  }
`;

export const NavList = styled.li`
  padding: 0 1rem;
  position: relative;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 50%;
  }

  span {
    padding: 0 1rem;
  }
`;

export const Avatar = styled.div`
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
`;
