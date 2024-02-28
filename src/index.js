const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const getTestData = async () => {
  return await axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((response) => {
      console.log(response.data);
      return response?.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

async function start() {
  const app = express();

  // to perform operation we need to add query and resolvers.

  // if we want to get some data then it will be added into query, and if we want to push something then we will do mutation

  const server = new ApolloServer({
    typeDefs: `
        type User {
            id:String!
            name:String!
            phone:String!
            address:String!
            email:String!
        }
        type Todo {
            id:ID!
            title:String!
            completed:Boolean
            user:User
        }
        
        type Query{
            getAllTodos:[Todo],
            getApiTodos:[Todo],
            testAPI:[Todo],
            getAllUsers:[User],
            getTodosWithUsers(id:ID):[Todo],
            getUser(id:ID!):User
        }
    `,
    resolvers: {
      Todo: {
        user: async (todo) =>
          (
            await axios.get(
              `https://jsonplaceholder.typicode.com/users/${todo.id}`
            )
          ).data,
      },
      Query: {
        getAllTodos: () => [
          { id: 1, title: "Todos 1", completed: false },
          { id: 1, title: "Todos 1", completed: false },
        ],

        getApiTodos: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,

        testAPI: getTestData,

        getAllUsers: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
        getTodosWithUsers: async (parent, { id }) =>
          (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))
            .data,
        getUser: async (parent, { id }) =>
          (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))
            .data,
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(4000, () => {
    console.log("Server is listening at http://localhost:4000");
  });
}

start().catch((err) => {
  console.log("error: " + err);
});
