import { useState } from "react";
import { FaPencilAlt, FaRegSave, FaTrash } from "react-icons/fa";
import { useMutation } from "urql";
import { DeleteTaskMutation, TaskFragment, UpdateTaskMutation } from "../lib/queries";
import { FragmentOf, readFragment } from "gql.tada";

// TODO: check Fragments how to use it 
// TODO: use Eslint for clean code

interface Props {
  data: FragmentOf<typeof TaskFragment>
}

export default function TaskCard({ data }: Props) {
  const task = readFragment(TaskFragment, data);

  const [isEditing, setIsEditing] = useState(false);
  const [newTaskName, setTaskName] = useState(task.name);


  const [_, deleteTask] = useMutation(DeleteTaskMutation);
  const [__, updateTask] = useMutation(UpdateTaskMutation);

  async function handleEdit(isEdit: boolean, updatedTask?: typeof task) {
    setIsEditing(isEdit);
    if (updatedTask) {
      await updateTask({ ...updatedTask, name: newTaskName })
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