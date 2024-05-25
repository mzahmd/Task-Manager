interface Props {
  task: { name: string }
}

export default function Task({ task }: Props) {
  return (
    <div className="flex justify-center flex-row my-2">
      <span>{task.name}</span>
      <button className="font-bold bg-gray-500 hover:bg-gray-700 rounded text-slate-200 shadow ms-2 py-1 px-1" type="button">Edit</button>
      <button className="font-bold bg-red-500 hover:bg-red-700 rounded text-slate-200 shadow ms-2 py-1 px-1" type="button">Delete</button>
    </div>
  )
}