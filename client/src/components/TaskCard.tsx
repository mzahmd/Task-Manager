import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useMutation } from "urql";
import { DeleteTaskMutation } from "../lib/queries";

interface Props {
  task: { name: string, id: string }
}

export default function TaskCard({ task }: Props) {
  const [_, deleteTask] = useMutation(DeleteTaskMutation)
  console.log(task);


  function handleEdit() {

  }

  function handleDelete(id: string) {
    deleteTask({ id })
  }

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 mx-auto my-2">
      <input type="text" className="p-1" defaultValue={task.name} readOnly />
      <button className="font-bold bg-gray-500 hover:bg-gray-700 rounded text-slate-200 shadow ms-2 p-2" type="button" onClick={() => handleEdit()}><FaPencilAlt /></button>
      <button className="font-bold bg-red-500 hover:bg-red-700 rounded text-slate-200 shadow ms-2 p-2" type="button" onClick={() => handleDelete(task.id)}><FaTrash /></button>
    </div>
  )
}