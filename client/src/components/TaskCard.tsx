import { useState } from "react";
import { FaPencilAlt, FaRegSave, FaTrash } from "react-icons/fa";
import { useMutation } from "urql";
import { DeleteTaskMutation, UpdateTaskMutation } from "../lib/queries";
import { type FragmentOf } from "gql.tada";
import { graphql } from "gql.tada";

export const TaskFragment = graphql(`
  fragment Task on Task @_unmask {
    id
    name
  }
`);

interface TaskCardProps extends FragmentOf<typeof TaskFragment> { }


export default function TaskCard({ name, id }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskName, setTaskName] = useState(name);

  const [_, deleteTask] = useMutation(DeleteTaskMutation);
  const [__, updateTask] = useMutation(UpdateTaskMutation);

  async function handleEdit(isEdit: boolean, oldTask?: TaskCardProps) {
    setIsEditing(isEdit);
    if (oldTask) {
      await updateTask({ ...oldTask, name: newTaskName })
    }
  }

  async function handleDelete(id: string) {
    await deleteTask({ id });
  }

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 mx-auto my-2">
      <input type="text" className="p-1" onChange={(e) => setTaskName(e.target.value)} value={newTaskName} readOnly={!isEditing} />
      {isEditing ?
        <button className="font-bold bg-gray-500 hover:bg-gray-700 rounded text-slate-200 shadow ms-2 p-2" type="button" onClick={() => handleEdit(false, { id, name })}><FaRegSave /></button>
        :
        <button className="font-bold bg-gray-500 hover:bg-gray-700 rounded text-slate-200 shadow ms-2 p-2" type="button" onClick={() => handleEdit(true)}><FaPencilAlt /></button>
      }
      <button className="font-bold bg-red-500 hover:bg-red-700 rounded text-slate-200 shadow ms-2 p-2" type="button" onClick={() => handleDelete(id)}><FaTrash /></button>
    </div>
  )
}