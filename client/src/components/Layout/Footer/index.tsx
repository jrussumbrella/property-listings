import React from "react";
import styled from "styled-components";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiOutlineCodepen,
} from "react-icons/ai";

const StyledFooter = styled.footer`
  color: #fff;
  padding: 2.5rem;
  text-align: center;
  background-color: var(--color-darker);
  font-size: 1.1rem;
`;

const Text = styled.div`
  margin-bottom: 0.6rem;
  line-height: 1.5;
`;

const Social = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SocialList = styled.li`
  &:not(last-child) {
    margin-right: 0.6rem;
  }

  svg {
    font-size: 1.2rem;
  }

  a {
    color: #fff;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Text>Made with love by James Russel C. Bautista</Text>
      <Text> Follow me on </Text>
      <Social>
        <SocialList>
          <a href="https://github.com/jrussumbrella" target="_blank">
            <AiFillGithub />
          </a>
        </SocialList>
        <SocialList>
          <a href="https://twitter.com/jruss_bautista" target="_blank">
            <AiOutlineTwitter />
          </a>
        </SocialList>
        <SocialList>
          <a href="https://codepen.io/james-russel-c-bautista" target="_blank">
            <AiOutlineCodepen />
          </a>
        </SocialList>
      </Social>
    </StyledFooter>
  );
};

export default Footer;
