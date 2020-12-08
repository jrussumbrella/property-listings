import styled from 'styled-components';
import Button from 'components/Button';

export const Container = styled.div`
  padding: 2rem 1rem;
  @media ${(props) => props.theme.mediaQueries.desktop} {
    max-width: 1200px;
    margin: 1rem auto;
  }
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

export const BottomContainer = styled.div`
  text-align: center;
  padding: 3rem 0;
`;

export const ViewMoreButton = styled(Button)`
  width: 15rem;
  border-radius: 50px;
`;

export const ReachedEndText = styled.div`
  color: var(--color-primary);
  font-weight: 600;
  font-size: 1.1rem;
`;
