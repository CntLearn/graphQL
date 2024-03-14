const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const express = require("express");
require("dotenv").config();
const app = express();
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const PORT = process.env.PORT || 4000;
// server setup.
// it take a object with the two parameters, typeDefinitions and resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const start = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });
  console.log(`🚀  Server ready at: ${url}`);
};
start().catch((err) => console.error(err));
