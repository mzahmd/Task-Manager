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
    createTask(name: String): [Task]!
    updateTask(id: ID): [Task!]!
    deleteTask(id: ID): [Task]!
  }
`;

const resolvers = {
  Query: {
    tasks: () => tasks,
  },
  Mutation: {
    createTask: (_, args) => {
      tasks.push({...args.task, id: tasks.length+1+"", name: args.name});
      return tasks;
    },
    updateTask: (id) => tasks,
    deleteTask: (id) => tasks,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
