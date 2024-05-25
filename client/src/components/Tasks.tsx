import { tasks } from "../db/tasks"
import Task from "./Task"

export default function Tasks() {
  return (
    <>
      <div className="my-5">
        <input type="text" className="shadow border border-slate-300 p-1" defaultValue="" />
        <button className="font-bold bg-emerald-500 hover:bg-emerald-700 rounded text-slate-200 shadow ms-2 py-1 px-2" type="button">ADD</button>
      </div>

      {tasks.map(task =>
        <Task task={task} key={task.id} />
      )}
    </>
  )
}
