import styled from 'styled-components';

export const Title = styled.div`
  background-color: var(--color-gray);
  width: 12rem;
  height: 2rem;
  margin: 0 auto;
`;

export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  margin: 1rem 0;

  @media ${(props) => props.theme.mediaQueries.tablet} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${(props) => props.theme.mediaQueries.desktop} {
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }
`;

export const Info = styled.div`
  padding: 0.5rem;
`;

export const CoverWrapper = styled.div`
  width: 100%;
  padding-top: 80%;
  position: relative;
  background-color: var(--color-gray);
`;

export const Line = styled.div`
  background-color: var(--color-gray);
  height: 1.2rem;
  margin-bottom: 0.5rem;
`;
