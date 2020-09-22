import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 0;
  }
`;

export const Heading = styled.h1`
  margin: 2rem 0;
`;
