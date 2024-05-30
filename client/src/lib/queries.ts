import { graphql } from "gql.tada"

export const TaskQuery = graphql(`
  query Tasks {
    tasks {
      id
      name
    } 
  }
`)

export const CreateTaskMutation = graphql(`
  mutation CreateTask($name: String!) {
    createTask(name: $name) {
      name
    }
  }
`)

export const UpdateTaskMutation = graphql(`
  mutation UpdateTask($id: ID!) {
    updateTask(id: $id) {
      name
    }
  }
`)

export const DeleteTaskMutation = graphql(`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      name
    }
  }
`)