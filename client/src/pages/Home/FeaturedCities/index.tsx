import React from "react";
import { City } from "../../../lib/types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  margin: 2rem 0 3rem 0;
`;

const List = styled.div`
  background-size: cover;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  padding-top: 70%;
`;

const Info = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CityTitle = styled.h3`
  color: #fff;
  font-size: 1.5rem;
`;

const cities: City[] = [
  {
    id: "1",
    imageUrl:
      "https://www.lamudi.com.ph/static/media/bm9uZS9ub25l/10000x10000/0f5621810a7510.jpg",
    name: "Makati",
  },
  {
    id: "2",
    imageUrl:
      "https://www.lamudi.com.ph/static/media/bm9uZS9ub25l/10000x10000/f687fa0a65791b.jpg",
    name: "Paranaque",
  },
  {
    id: "3",
    imageUrl:
      "https://www.lamudi.com.ph/static/media/bm9uZS9ub25l/10000x10000/144abfe86b8095.jpg",
    name: "Quezon",
  },
  {
    id: "4",
    imageUrl:
      "https://www.lamudi.com.ph/static/media/bm9uZS9ub25l/10000x10000/4365f68cfebc74.jpg",
    name: "Taguig",
  },
];

const FeaturedCities = () => {
  return (
    <div>
      <Title> Featured Cities </Title>
      <ListWrapper>
        {cities.map((city) => (
          <Link to={`/listings?city=${city.name}`}>
            <List
              key={city.id}
              style={{
                backgroundImage: `url(${city.imageUrl})`,
              }}
            >
              <Info>
                <CityTitle> {city.name} </CityTitle>
              </Info>
            </List>
          </Link>
        ))}
      </ListWrapper>
    </div>
  );
};

export default FeaturedCities;
