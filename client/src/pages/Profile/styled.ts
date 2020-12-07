import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem;
  @media ${(props) => props.theme.mediaQueries.desktop} {
    max-width: 1200px;
    margin: 0 auto;
  }
  h2 {
    font-weight: 600;
  }
`;

export const Info = styled.div`
  padding: 1rem 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Img = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

export const Avatar = styled.div`
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

export const Text = styled.div`
  padding: 0.5rem;
  font-size: 1.2rem;
`;

export const Settings = styled.ul`
  margin: 1rem 0;
  li {
    padding: 1rem 0;
    border-bottom: 1px solid var(--color-gray);
  }

  .btn-settings {
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: transparent;
    border: 1px solid transparent;
    width: 100%;
    cursor: pointer;
  }

  button:focus {
    outline: none;
  }
`;

export const AlertWrapper = styled.div`
  margin: 2rem 0;
`;

export const BottomContainer = styled.div`
  text-align: center;
  padding: 3rem 0;
`;

export const LogOutButton = styled.button`
  background-color: transparent;
  border: 1px solid transparent;
  color: var(--color-primary);
  font-size: 1.2rem;
  cursor: pointer;
`;
