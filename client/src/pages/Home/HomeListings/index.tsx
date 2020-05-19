import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { LISTINGS } from "../../../graphql/queries";

const HomeListings: React.FC<{}> = () => {
  const { loading, data, error } = useQuery(LISTINGS, {
    variables: { page: 1, limit: 10 },
  });

  console.log(data);

  return (
    <div>
      <h2> Popular Listings </h2>
    </div>
  );
};

export default HomeListings;
