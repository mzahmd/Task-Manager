import { useState } from "react";
import { useMutation, useQuery } from "urql";
import { CreateTaskMutation, TaskQuery } from "../lib/queries";
import TaskCard from "./TaskCard";

export default function Tasks() {
  const [name, setName] = useState("")
  const [{ data, error, fetching }] = useQuery({ query: TaskQuery })
  const [_, createTask] = useMutation(CreateTaskMutation)

  function handleAddClick() {
    name && createTask({ name })
    setName("")
  }

  if (error) {
    return <p>Error...</p>
  }

  if (fetching) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className="my-5">
        <input type="text" className="shadow border border-slate-300 p-1" onChange={(e) => setName(e.target.value)} value={name} />
        <button className="font-bold bg-emerald-500 hover:bg-emerald-700 rounded text-slate-200 shadow ms-2 py-1 px-2" type="button" onClick={handleAddClick}>ADD</button>
      </div>

      {data.tasks.map((task: { id: string; name: string; }) =>
        <TaskCard task={task} key={task.id}/>
      )}
    </>
  )
}
