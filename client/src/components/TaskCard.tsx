import { useState } from "react";
import { FaPencilAlt, FaRegSave, FaTrash } from "react-icons/fa";
import { useMutation } from "urql";
import { DeleteTaskMutation, UpdateTaskMutation } from "../lib/queries";

interface Task {
  name: string
  id: string
}
interface Props {
  task: { name: string, id: string }
}

export default function TaskCard({ task }: Props) {
  const [_, deleteTask] = useMutation(DeleteTaskMutation);
  const [__, updateTask] = useMutation(UpdateTaskMutation);
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskName, setTaskName] = useState(task.name);

  async function handleEdit(isEdit: boolean, task = {} as Task) {
    setIsEditing(isEdit);
    if (task) {
      await updateTask({ id: task.id, name: newTaskName })
    }
  }

  async function handleDelete(id: string) {
    await deleteTask({ id });
  }

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 mx-auto my-2">
      <input type="text" className="p-1" onChange={(e) => setTaskName(e.target.value)} value={newTaskName} readOnly={!isEditing} />
      {isEditing ?
        <button className="font-bold bg-gray-500 hover:bg-gray-700 rounded text-slate-200 shadow ms-2 p-2" type="button" onClick={() => handleEdit(false, task)}><FaRegSave /></button>
        :
        <button className="font-bold bg-gray-500 hover:bg-gray-700 rounded text-slate-200 shadow ms-2 p-2" type="button" onClick={() => handleEdit(true)}><FaPencilAlt /></button>
      }
      <button className="font-bold bg-red-500 hover:bg-red-700 rounded text-slate-200 shadow ms-2 p-2" type="button" onClick={() => handleDelete(task.id)}><FaTrash /></button>
    </div>
  )
}