import { useState } from "react";
import { tasks } from "../db/tasks"
import TaskCard from "./TaskCard"

interface Task {
  id: string
  name: string
}

export default function Tasks() {
  const [newTask, setNewTask] = useState({} as Task)

  function handleClick(e: React.FormEvent) {
    e.preventDefault();
    tasks.push(newTask)
  }

  return (
    <>
      <div className="my-5">
        <input type="text" className="shadow border border-slate-300 p-1" onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} />
        <button className="font-bold bg-emerald-500 hover:bg-emerald-700 rounded text-slate-200 shadow ms-2 py-1 px-2" type="button" onClick={handleClick}>ADD</button>
      </div>

      {tasks.map(task =>
        <TaskCard task={task} key={task.id} />
      )}
    </>
  )
}
