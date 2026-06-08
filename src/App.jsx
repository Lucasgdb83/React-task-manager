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

 // Save dark mode preference
const [darkMode, setDarkMode] =
useState(() => {

  const savedDarkMode =
    localStorage.getItem(
      "darkMode"
    );

  return savedDarkMode
    ? JSON.parse(savedDarkMode)
    : false;
});

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
const editTask = (
  id,
  newText,
  newPriority,
  newDueDate,
  newCategory
) => {

  setTasks(
    tasks.map((task) =>
      task.id === id
        ? {

            // Keep old task data
            ...task,

            // Update task fields
            text: newText,
            priority:
              newPriority,
            dueDate:
              newDueDate,
            category:
              newCategory,
          }
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

// Total number of tasks
const totalTasks = tasks.length;

// Count completed tasks
const completedTasks =
  tasks.filter(
    (task) => task.completed
  ).length;

// Count pending tasks
const pendingTasks =
  tasks.filter(
    (task) => !task.completed
  ).length;

// Count overdue tasks
const overdueTasks =
  tasks.filter((task) => {

    // Skip if no due date
    if (!task.dueDate) return false;

    // Compare task date with today
    return (
      new Date(task.dueDate) <
      new Date().setHours(
        0,
        0,
        0,
        0
      )
    );
  }).length;

  // Save tasks to localStorage
  // Runs every time tasks changes
  useEffect(() => {

    // Save tasks as JSON string
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
    

  }, [tasks]); // dependency array = run when tasks changes

  // Save dark mode preference
useEffect(() => {

  localStorage.setItem(
    "darkMode",
    JSON.stringify(darkMode)
  );

}, [darkMode]);

  return (
 <div
  style={{
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "Arial",
    paddingTop: "40px",

    // Change colors in dark mode
    backgroundColor: darkMode
      ? "#1e1e1e"
      : "white",

    color: darkMode
      ? "white"
      : "black",

    padding: "20px",
    borderRadius: "10px",

    transition: "0.3s",
    minHeight: "100vh",
  }}
>

{/* Dark mode toggle */}
<button
  onClick={() =>
    setDarkMode(!darkMode)
  }
  style={{
     display: "block",
     marginLeft: "auto",
     marginBottom: "10px",
     padding: "8px 12px",
     cursor: "pointer",
  }}
>
  {darkMode
    ? "☀ Light Mode"
    : "🌙 Dark Mode"}
</button>

      {/* App title */}
      <h1
        style={{
          textAlign: "center",

      // Change title color
        color: darkMode
          ? "white"
          : "black",

      // Better spacing
        marginTop: "20px",

    // Responsive font size
       fontSize: "48px",

       wordBreak: "break-word",
  
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

    backgroundColor: darkMode
  ? "#333"
  : "white",

color: darkMode
  ? "white"
  : "black",

border: darkMode
  ? "1px solid #555"
  : "1px solid #ccc",
  }}
/>

{/* Dashboard stats */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 0",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    
    backgroundColor: darkMode
      ? "#2a2a2a"
      : "white",

    border: darkMode
      ? "1px solid #444"
      : "1px solid #ddd",
   
  }}
>
  <div>
    <strong>Total:</strong>{" "}
    {totalTasks}
  </div>

  <div>
    <strong>Completed:</strong>{" "}
    {completedTasks}
  </div>

  <div>
    <strong>Pending:</strong>{" "}
    {pendingTasks}
  </div>

  <div>
    <strong>Overdue:</strong>{" "}
    {overdueTasks}
  </div>
</div>

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
