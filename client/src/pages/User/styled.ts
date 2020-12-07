import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    max-width: 1200px;
    margin: 1rem auto;
  }
`;

export const HostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const HostImg = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  margin: 1rem 0;
`;

export const HostName = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
`;

export const LoadMoreWrapper = styled.div`
  text-align: center;
`;

export const ReachedEndText = styled.div`
  text-align: center;
  font-size: 1.1rem;
  color: var(--color-primary);
`;
