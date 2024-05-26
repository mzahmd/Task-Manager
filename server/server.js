import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { tasks } from "./db.js";

const typeDefs = `#graphql
  type Task {
    id: ID!
    name: String!
  }
  type Query {
    tasks: [Task]!
  }
  type Mutation {
    updateTask(id: ID): [Task]!
    deleteTask(id: ID): [Task]!
  }
`;

const resolvers = {
  Query: {
    tasks: () => tasks,
  },
  Mutation: {
    updateTask: (id) => tasks,
    deleteTask: (id) => tasks
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
