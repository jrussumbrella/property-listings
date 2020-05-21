import React from "react";
import styled from "styled-components";

const Title = styled.div`
  background-color: var(--color-gray);
  width: 12rem;
  height: 2rem;
  margin: 0 auto;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  margin: 1rem 0;
`;

const Info = styled.div`
  padding: 0.5rem;
`;

const CoverWrapper = styled.div`
  width: 100%;
  padding-top: 80%;
  position: relative;
  background-color: var(--color-gray);
`;

const Line = styled.div`
  background-color: var(--color-gray);
  height: 1.2rem;
  margin-bottom: 0.5rem;
`;

interface Props {
  numbers: number;
}

export const ListingsSkeleton: React.FC<Props> = ({ numbers = 10 }) => {
  const listingBox = Array(numbers)
    .fill(null)
    .map((_, i) => i + 1);

  return (
    <div>
      <Title></Title>
      <List>
        {listingBox.map((listing) => (
          <div key={listing}>
            <CoverWrapper></CoverWrapper>
            <Info>
              <Line />
              <Line style={{ width: "40%" }} />
            </Info>
          </div>
        ))}
      </List>
    </div>
  );
};
