import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { LISTINGS } from "../../../graphql/queries";
import { ListingsSkeleton, Listings, EmptyMessage } from "../../../components";

const PAGE = 1;
const PAGE_LIMIT = 12;

interface Props {
  location: string;
}

const SearchListings: React.FC<Props> = ({ location }) => {
  const { data, loading } = useQuery(LISTINGS, {
    variables: { page: PAGE, limit: PAGE_LIMIT, location },
  });

  if (loading) return <ListingsSkeleton numbers={12} />;

  const { listings } = data;

  if (listings.total === 0) {
    return (
      <EmptyMessage
        message="No Results Found"
        description="Try searching for another location."
      />
    );
  }

  return <Listings listings={listings.result} />;
};

export default SearchListings;
