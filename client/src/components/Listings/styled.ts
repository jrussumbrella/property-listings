import styled from 'styled-components';

export const StyledList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  margin: 1rem 0;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
export const CoverWrapper = styled.div`
  width: 100%;
  padding-top: 80%;
  position: relative;
`;
export const ItemImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;
export const Info = styled.div`
  padding: 0.5rem;
`;
export const Title = styled.div`
  font-size: 1rem;
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  height: 2.5rem;
  line-height: 1.25rem;
`;
export const Price = styled.div`
  margin-top: 0.5rem;
  color: var(--color-primary);
  font-weight: 600;
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
  padding: 0.5rem;
`;
export const IconWrapper = styled.button`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  height: 2.6rem;
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  font-size: 1.5rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;
