import React from 'react';

interface Props {
  count: number;
  name: string;
  icon: any;
}

const ListingCountInfo: React.FC<Props> = ({ count, icon, name }) => {
  return (
    <li>
      <span>{icon}</span>
      <span>
        {' '}
        {count} {name}{' '}
      </span>
    </li>
  );
};

export default ListingCountInfo;
