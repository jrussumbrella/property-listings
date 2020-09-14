import styled from 'styled-components';

export const Item = styled.div`
  display: flex;
  align-items: flex-start;
  border: 1px solid #e9eaef;
  margin-bottom: 1rem;

  a {
    display: block;
  }
`;

export const ImgCover = styled.div`
  position: relative;
  width: 120px;
`;

export const Img = styled.img`
  width: 120px;
  height: 90px;
`;

export const Info = styled.div`
  padding: 0.5rem;
  flex: 1;
  width: 300px;
`;

export const Title = styled.div`
  font-size: 1rem;
  margin-bottom: 1rem;
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  height: 2.5rem;
  line-height: 1.25rem;
`;

export const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
`;

export const Price = styled.div`
  color: var(--color-primary);
`;

export const MoreOptions = styled.div`
  padding: 0.5rem;
  cursor: pointer;
`;
