import styled from 'styled-components';

export const StyledFooter = styled.footer`
  color: #fff;
  padding: 2.5rem;
  text-align: center;
  background-color: var(--color-darker);
  font-size: 1rem;
`;

export const Text = styled.div`
  margin-bottom: 0.6rem;
  line-height: 1.5;
`;

export const Social = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SocialList = styled.li`
  &:not(last-child) {
    margin-right: 0.6rem;
  }

  svg {
    font-size: 1.3rem;
  }

  a {
    color: #fff;
  }
`;
