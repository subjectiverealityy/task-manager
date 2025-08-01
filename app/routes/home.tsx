import type { Route } from "./+types/home";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]); // list of tasks
  const [newTask, setNewTask] = useState(""); // input field value

  // Load the list of tasks from localStorage - it runs once after the initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks)); // converts the stored JSON array into a JavaScript array and updates the component's state
    }
  }, []);

  // Save to local storage when the list changes
  useEffect (() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); // stores the new list under the key "tasks" in the browser's local storage after converting it into JSON
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return; // checks if the input is empty after trimming
    setTasks([...tasks, newTask.trim()]);
    setNewTask("");
  };

  return (
    <main className="min-h-screen bg-gray-900 p-6">

      <h1 className="mb-[15px]">Today's Tasks</h1>

      <div className="flex gap-2 mb-4">
        <input
        type="text"
        value={newTask} // what the user types goes into 'newTask'
        onChange={(e) => setNewTask(e.target.value)} // reads what the user is typing and updates state with the new value
        className="p-2 border rounded"
        placeholder="Type a new task here."
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-900 text-white rounded"
        >Add to List of Tasks
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li
          key={index}
          className="p-2 bg-white text-black rounded"
          >
            {task}
          </li>
        ))}
      </ul>

    </main>
  );
};