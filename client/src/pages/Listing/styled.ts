import styled from 'styled-components';

export const Container = styled.div`
  padding-bottom: 6rem;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    max-width: 1200px;
    margin: 1rem auto;
  }
`;

export const InfoContainer = styled.div`
  @media ${(props) => props.theme.mediaQueries.desktop} {
    display: flex;
  }
`;

export const CoverImg = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 60%;
  background-color: var(--color-gray);

  @media ${(props) => props.theme.mediaQueries.desktop} {
    width: 55%;
    padding-bottom: 50%;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

export const Wrapper = styled.div`
  padding: 1rem;
  @media only screen and (min-width: 768px) {
    flex: 1;
  }
`;

export const Title = styled.div`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  line-height: 1.2;
`;

export const PriceWrapper = styled.div`
  font-size: 1.6rem;
  margin-bottom: 2rem;
`;

export const Price = styled.span`
  color: var(--color-primary);
  font-weight: 600;
`;

export const Location = styled.div`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--color-dark-gray);
`;

export const Description = styled.div`
  font-size: 1rem;
  line-height: 1.5;
`;

export const Heading = styled.div`
  font-size: 1.4rem;
  margin: 1rem 0;
  font-weight: 600;
`;

export const Details = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  li {
    padding-right: 0.5rem;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  span {
    font-size: 1rem;
    padding: 0 0.2rem;
  }
  svg {
    font-size: 1.2rem;
    color: var(--color-dark-gray);
  }
`;

export const ActionWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
`;

export const IconWrapper = styled.button`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 6px;
  height: 2.6rem;
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  font-size: 1.5rem;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  &:focus {
    outline: none;
  }
`;

export const BottomAction = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  width: 100%;
  height: 5rem;
  background-color: #fff;
  border-top: 1px solid var(--color-gray);
  margin-top: 20px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;

  @media only screen and (min-width: 768px) {
    max-width: 1200px;
    margin: 0 auto;
    justify-content: center;
  }

  button {
    width: 100%;

    &:not(:last-child) {
      margin-right: 1rem;
    }

    @media only screen and (min-width: 768px) {
      width: 15rem;
    }
  }
`;
