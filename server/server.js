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
    createTask(name: String!): [Task]!
    updateTask(id: ID!): [Task!]!
    deleteTask(id: ID!): [Task]!
  }
`;

const resolvers = {
  Query: {
    tasks: () => tasks,
  },
  Mutation: {
    createTask: (_, { name }) => {
      tasks.push({ id: String(tasks.length), name });
      return tasks;
    },
    updateTask: (_, { id }) => {
      return tasks.map((task) => {
        if (task.id === id) {
          return task;
        }
        return task;
      });
    },
    deleteTask: (_, { id }) => {
      const taskIndex = tasks.findIndex(task => task.id === id);
      return tasks.splice(taskIndex, 1);
    },
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
