import { useState } from "react";
import { useMutation, useQuery } from "urql";
import { CreateTaskMutation, TaskQuery } from "../lib/queries";
import TaskCard from "./TaskCard";

interface Task {
  id?: string
  name: string
}

interface FetchResponse {
  tasks: Array<Task>
}

export default function Tasks() {
  const [newTask, setNewTask] = useState<Task>({} as Task)
  const [{ data, error }] = useQuery<FetchResponse>({ query: TaskQuery })
  const [_, createTask] = useMutation(CreateTaskMutation)

  function handleClick() {
    createTask(newTask)
  }

  if (error) {
    return <p>Error...</p>
  }

  return (
    <>
      <div className="my-5">
        <input type="text" className="shadow border border-slate-300 p-1" onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} />
        <button className="font-bold bg-emerald-500 hover:bg-emerald-700 rounded text-slate-200 shadow ms-2 py-1 px-2" type="button" onClick={handleClick}>ADD</button>
      </div>

      {data && data.tasks.map(task =>
        <TaskCard task={task} key={task.id} />
      )}
    </>
  )
}
