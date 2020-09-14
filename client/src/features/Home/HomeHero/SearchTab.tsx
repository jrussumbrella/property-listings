import React from 'react';
import styled, { css } from 'styled-components';

interface Props {
  onChangeTab(selected: string): void;
  selected: string;
}

interface TabListProps {
  active?: boolean;
}

const Tab = styled.ul`
  display: flex;
  align-items: center;
`;

const TabList = styled.li<TabListProps>`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 1rem;
  border-radius: 6px 6px 0px 0px;
  cursor: pointer;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    width: 7rem;
    font-size: 1.2rem;
    height: 3.5rem;
  }

  ${(props) =>
    props.active &&
    css`
      background: #fff;
      color: var(--color-primary);
    `}
`;

const SearchTab: React.FC<Props> = ({ onChangeTab, selected }): JSX.Element => {
  const handleClick = (val: string) => {
    if (val === selected) return;
    onChangeTab(val);
  };

  return (
    <Tab>
      <TabList onClick={() => handleClick('rent')} active={selected === 'rent'}>
        Rent
      </TabList>
      <TabList onClick={() => handleClick('buy')} active={selected === 'buy'}>
        Buy
      </TabList>
    </Tab>
  );
};

export default SearchTab;
