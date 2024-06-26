import { useState } from "react";
import { useMutation, useQuery } from "urql";

import TaskCard from "@/components/TaskCard";
import { CreateTaskMutation, TaskQuery } from "@/lib/queries";

export default function Tasks() {
  const [taskName, setTaskName] = useState("");

  const [{ data, error, fetching }, reexecuteQuery] = useQuery({ query: TaskQuery });
  const [_, createTask] = useMutation(CreateTaskMutation);

  async function handleAddTask() {
    if (taskName) {
      await createTask({ name: taskName });
      reexecuteQuery({ requestPolicy: 'network-only' })
      setTaskName("");
    }
  }

  if (fetching) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...</p>;
  }

  return (
    <div className="my-5">
      <input
        type="text"
        className="shadow border border-slate-300 p-1"
        onChange={(e) => setTaskName(e.target.value)}
        value={taskName}
      />
      <button
        className="font-bold bg-emerald-500 hover:bg-emerald-700 rounded text-slate-200 shadow ms-2 py-1 px-2"
        type="button"
        onClick={handleAddTask}
      >
        ADD
      </button>
      {data?.tasks.map((item) => <TaskCard {...item} key={item.id} />)}
    </div>
  );
}
