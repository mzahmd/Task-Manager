import { FaPencilAlt, FaTrash  } from "react-icons/fa";

interface Props {
  task: { name: string }
}

export default function TaskCard({ task }: Props) {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 mx-auto my-2">
      <input type="text" className="p-1" defaultValue={task.name} readOnly/>
      <button className="font-bold bg-gray-500 hover:bg-gray-700 rounded text-slate-200 shadow ms-2 p-2" type="button"><FaPencilAlt /></button>
      <button className="font-bold bg-red-500 hover:bg-red-700 rounded text-slate-200 shadow ms-2 p-2" type="button"><FaTrash /></button>
    </div>
  )
}