import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { LISTINGS } from "../../../graphql/queries";
import { Listings, ListingsSkeleton } from "../../../components";

const HomeListings: React.FC<{}> = () => {
  const { loading, data, error } = useQuery(LISTINGS, {
    variables: { page: 1, limit: 10 },
  });

  if (loading) return <ListingsSkeleton numbers={10} />;

  if (error) return <h2>Error</h2>;

  const listings = data.listings.result;

  return (
    <div>
      <h2> Popular Listings </h2>
      <Listings listings={listings} />
    </div>
  );
};

export default HomeListings;
