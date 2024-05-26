import { useState } from "react";
import { useQuery } from "urql";
import TaskCard from "./TaskCard"
import { graphql } from "gql.tada"

interface Task {
  id: string
  name: string
}

interface FetchResponse {
  tasks: Array<Task>
}

const TaskQuery = graphql(`
  query Tasks {
    tasks {
      id
      name
    } 
  }
`)

export default function Tasks() {
  const [newTask, setNewTask] = useState({} as Task)
  const [result] = useQuery<FetchResponse>({ query: TaskQuery })

  function handleClick(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      <div className="my-5">
        <input type="text" className="shadow border border-slate-300 p-1" onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} />
        <button className="font-bold bg-emerald-500 hover:bg-emerald-700 rounded text-slate-200 shadow ms-2 py-1 px-2" type="button" onClick={handleClick}>ADD</button>
      </div>

      {result.data?.tasks?.map(task =>
        <TaskCard task={task} key={task.id} />
      )}
    </>
  )
}
