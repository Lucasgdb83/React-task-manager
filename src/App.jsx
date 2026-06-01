// Import React hooks
// useState = stores changing data
// useEffect = runs code when something changes
import { useState, useEffect } from "react";

import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {

  // State for tasks
  // This runs ONCE when the app starts
  // It checks if there are saved tasks in localStorage
  const [tasks, setTasks] = useState(() => {

    // Get saved tasks from browser storage
    const savedTasks = localStorage.getItem("tasks");

    // If tasks exist:
    // convert JSON string back into JavaScript array
    // Otherwise return an empty array []
    return savedTasks
      ? JSON.parse(savedTasks)
      : [];
  });

   // It adds search state to the list of tasks
  const [search, setSearch] =
  useState("");

  // Add new task
  // Receives a task object from TaskInput.jsx
  const addTask = (newTask) => {

    // Add the new task to existing tasks
    setTasks([...tasks, newTask]);
  };

  // Delete task
  // Receives task id
  const deleteTask = (id) => {

    // Keep every task EXCEPT the one clicked
    setTasks(
      tasks.filter((task) => task.id !== id)
    );
  };

  // Toggle task completed/not completed
  const toggleTask = (id) => {

    // Loop through tasks
    // If id matches → flip completed true/false
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task, // copy old task data
              completed: !task.completed,
            }
          : task
      )
    );
  };

// Edit task
const editTask = (id, newText) => {
  setTasks(
    tasks.map((task) =>
      task.id === id
        ? { ...task, text: newText }
        : task
    )
  );
};
// It adds filter to the search tasks
const filteredTasks = tasks.filter(
  (task) =>
    task.text
      .toLowerCase()
      .includes(search.toLowerCase())
);
  // Save tasks to localStorage
  // Runs every time tasks changes
  useEffect(() => {

    // Save tasks as JSON string
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );

  }, [tasks]); // dependency array = run when tasks changes

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        fontFamily: "Arial",
      }}
    >

      {/* App title */}
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Task Manager  ({tasks.length})
      </h1>

      {/* Input component */}
      <TaskInput onAddTask={addTask} />

      <input
  type="text"
  placeholder="Search tasks..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    marginTop: "10px",
  }}
/>

      {/* Task list component */}
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onEdit={editTask}
      />
    </div>
  );
}

export default App;
