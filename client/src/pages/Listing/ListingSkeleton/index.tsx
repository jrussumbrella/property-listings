import React from "react";
import styled from "styled-components";

const CoverImg = styled.div`
  padding-bottom: 60%;
  background-color: var(--color-gray);
`;

const Line = styled.div`
  background-color: var(--color-gray);
  height: 2rem;
  margin-bottom: 1rem;
`;

const Info = styled.div`
  padding: 1rem;
`;

const ListingSkeleton = () => {
  return (
    <div>
      <CoverImg />
      <Info>
        <Line style={{ height: "3rem" }} />
        <Line style={{ width: "60%" }} />
        <Line style={{ width: "40%" }} />
        <Line style={{ width: "60%" }} />
        <Line style={{ width: "60%" }} />
      </Info>
    </div>
  );
};

export default ListingSkeleton;
