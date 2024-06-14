import { useState } from "react";
import { useMutation, useQuery } from "urql";
import { CreateTaskMutation, TaskFragment, TaskQuery } from "../lib/queries";
import TaskCard from "./TaskCard";
import { readFragment } from "gql.tada";

export default function Tasks() {
  const [taskName, setTaskName] = useState("")

  const [{ data, error, fetching }] = useQuery({ query: TaskQuery })
  const [_, createTask] = useMutation(CreateTaskMutation)

  async function handleAddClick() {
    if (taskName) {
      await createTask({ name: taskName })
      setTaskName("")
    }
  }

  if (fetching) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error...</p>
  }

  return (
    <>
      <div className="my-5">
        <input type="text" className="shadow border border-slate-300 p-1" onChange={(e) => setTaskName(e.target.value)} value={taskName} />
        <button className="font-bold bg-emerald-500 hover:bg-emerald-700 rounded text-slate-200 shadow ms-2 py-1 px-2" type="button" onClick={handleAddClick}>ADD</button>
      </div>

      {data?.tasks.map((item) => {
        const { id } = readFragment(TaskFragment, item);
        return <TaskCard data={item} key={id} />
      }
      )}
    </>
  )
}
