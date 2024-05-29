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
  mutation CreateTask($name: String) {
    createTask(name: $name) {
      name
    }
  }
`)