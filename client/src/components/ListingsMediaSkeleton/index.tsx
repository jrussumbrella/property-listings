import React from "react";
import styled from "styled-components";

const Heading = styled.div`
  background-color: var(--color-gray);
  width: 15rem;
  height: 2rem;
`;

const Item = styled.div`
  display: flex;
  margin: 1rem 0;
  border: 1px solid var(--color-gray);
`;

const Line = styled.div`
  background-color: var(--color-gray);
  height: 1.5rem;
  margin-bottom: 0.5rem;
`;

const Info = styled.div`
  flex: 1;
  padding: 0.5rem;
`;

const Box = styled.div`
  background-color: var(--color-gray);
  width: 120px;
  height: 90px;
`;

export const ListingsMediaSkeleton = () => {
  const listArr = Array(10)
    .fill(null)
    .map((_, i) => i + 1);

  return (
    <div>
      <Heading />
      <div>
        {listArr.map((arr) => (
          <Item key={arr}>
            <Box />
            <Info>
              <Line />
              <Line />
            </Info>
          </Item>
        ))}
      </div>
    </div>
  );
};
