require("dotenv").config();

import { ApolloServer } from "apollo-server";
import { connectDb } from "./database";
import { typeDefs, resolvers } from "./graphql";

const start = async () => {
  const db = await connectDb();
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: ({ req, res }) => ({ db, req, res }),
  });
  server.listen().then(({ url }) => console.log(`Server ready at ${url}. `));
};

start();
