import { graphql } from "gql.tada";
import { TaskFragment } from "../components/TaskCard";

export const TaskQuery = graphql(
  `
    query Tasks {
      tasks {
        ...Task
      }
    }
  `,
  [TaskFragment]
);

export const CreateTaskMutation = graphql(
  `
    mutation CreateTask($name: String!) {
      createTask(name: $name) {
        ...Task
      }
    }
  `,
  [TaskFragment]
);

export const UpdateTaskMutation = graphql(
  `
    mutation UpdateTask($id: ID!, $name: String!) {
      updateTask(id: $id, name: $name) {
        ...Task
      }
    }
  `,
  [TaskFragment]
);

export const DeleteTaskMutation = graphql(
  `
    mutation DeleteTask($id: ID!) {
      deleteTask(id: $id) {
        ...Task
      }
    }
  `,
  [TaskFragment]
);
