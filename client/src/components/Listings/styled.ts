import styled from 'styled-components';

export const StyledList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  margin: 1rem 0;

  @media ${(props) => props.theme.mediaQueries.tablet} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${(props) => props.theme.mediaQueries.desktop} {
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }
`;
export const CoverWrapper = styled.div`
  width: 100%;
  padding-top: 80%;
  position: relative;
  background-color: var(--color-gray);
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
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
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
  width: 4rem;
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

export const Item = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;

  .label {
    padding: 0 0.5rem;
  }

  .icon {
    color: var(--color-dark-gray);
  }
`;

export const ListItem = styled.div`
  transition: box-shadow 0.2s ease-out, transform 0.2s ease-out;
  border-radius: 6px;
  overflow: hidden;

  &:hover {
    transform: scale(1.1, 1.1);
    box-shadow: 0 14px 24px 0 rgba(50, 49, 58, 0.25);
    z-index: 2;
  }
`;
