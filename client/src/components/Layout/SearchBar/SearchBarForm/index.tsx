import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { StyledSearchBar, Wrapper, Input, Button } from './styled';

interface Props {
  onSubmit?(): void;
}

export const SearchBarForm: React.FC<Props> = ({ onSubmit }): JSX.Element => {
  const [searchText, setSearchText] = useState('');
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchText.trim()) return;
    const url = `/listings/${searchText}`;
    history.push(url);
    if (onSubmit) onSubmit();
  };

  return (
    <StyledSearchBar onSubmit={handleSubmit}>
      <Wrapper>
        <Input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target.value)
          }
          value={searchText}
          placeholder="Where do you want to live?"
        />
      </Wrapper>
      <Button type="submit">
        <BsSearch />
      </Button>
    </StyledSearchBar>
  );
};
