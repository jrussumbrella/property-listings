import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { LISTING } from "../../graphql/queries";
import ListingInfo from "./ListingInfo";
import ListingAction from "./ListingAction";
import ListingSkeleton from "./ListingSkeleton";

export const Listing = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(LISTING, { variables: { id } });

  if (loading) return <ListingSkeleton />;

  if (error) return <h2>Error</h2>;

  const { listing } = data;

  return (
    <div>
      <ListingInfo listing={listing} />
      <ListingAction />
    </div>
  );
};
