import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    max-width: 1200px;
    margin: 1rem auto;
  }
`;

export const SearchText = styled.div`
  padding: 1rem 0;
  font-size: 1.2rem;

  span {
    font-weight: 600;
  }
`;

export const Wrapper = styled.div`
  @media ${(props) => props.theme.mediaQueries.desktop} {
    display: flex;
  }
`;

export const ListingsFilterContainer = styled.div`
  @media ${(props) => props.theme.mediaQueries.desktop} {
    width: 15rem;
    padding-right: 1rem;
  }
`;

export const SearchListingsContainer = styled.div`
  flex: 1;
`;
