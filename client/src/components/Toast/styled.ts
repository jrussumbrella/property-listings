import styled from 'styled-components';

interface StyledProps {
  type: string;
}

export const Container = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  background: ${(props) =>
    props.type === 'success' ? '#8bc34a' : 'var(--color-primary)'};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 6px;
  color: #fff;
`;

export const Message = styled.div`
  font-size: 1.1rem;
  flex: 1;
`;

export const CloseWrapper = styled.div`
  padding-left: 1rem;

  svg {
    cursor: pointer;
  }
`;
