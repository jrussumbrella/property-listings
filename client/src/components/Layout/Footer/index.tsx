import React from 'react';
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiOutlineCodepen,
} from 'react-icons/ai';
import { StyledFooter, Text, Social, SocialList } from './styled';

const Footer = (): JSX.Element => {
  return (
    <StyledFooter>
      <Text>Made with love by James Russel C. Bautista</Text>
      <Text> Follow me on </Text>
      <Social>
        <SocialList>
          <a
            href="https://github.com/jrussumbrella"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub />
          </a>
        </SocialList>
        <SocialList>
          <a
            href="https://twitter.com/jruss_bautista"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineTwitter />
          </a>
        </SocialList>
        <SocialList>
          <a
            href="https://codepen.io/james-russel-c-bautista"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineCodepen />
          </a>
        </SocialList>
      </Social>
    </StyledFooter>
  );
};

export default Footer;
