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

  // Filter tasks based on search
  const filteredTasks = tasks

    .filter((task) =>
      task.text
        .toLowerCase()
        .includes(search.toLowerCase())
    )

    // Sort tasks
    .sort((a, b) => {

      // Put completed tasks last
      if (
        a.completed !==
        b.completed
      ) {
        return a.completed
          ? 1
          : -1;
      }

      // Check overdue tasks
      const aOverdue =
        a.dueDate &&
        new Date(a.dueDate) <
        new Date().setHours(
          0,
          0,
          0,
          0
        );

      const bOverdue =
        b.dueDate &&
        new Date(b.dueDate) <
        new Date().setHours(
          0,
          0,
          0,
          0
        );

      // Overdue first
      if (
        aOverdue !==
        bOverdue
      ) {
        return aOverdue
          ? -1
          : 1;
      }

      // Priority ranking
      const priorityOrder = {
        High: 1,
        Medium: 2,
        Low: 3,
      };

      return (
        priorityOrder[
        a.priority
        ] -
        priorityOrder[
        b.priority
        ]
      );
    });

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

  // Calculate completion percentage
  const progressPercentage =
    totalTasks === 0
      ? 0
      : Math.round(
        (completedTasks /
          totalTasks) *
        100
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
          width: "95%",
          padding: "10px",
          marginBottom: "20px",
          marginTop: "10px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "8px",

          // Dark mode styling
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

      {/* Progress section */}
      <div
        style={{
          marginBottom: "20px",
        }}
      >

        {/* Progress text */}
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            marginBottom: "8px",
            fontSize: "14px",
          }}
        >
          <span>
            Progress
          </span>

          <span>
            {progressPercentage}%
          </span>
        </div>

        {/* Progress bar background */}
        <div
          style={{
            width: "100%",
            height: "12px",
            borderRadius: "10px",
            overflow: "hidden",

            backgroundColor:
              darkMode
                ? "#333"
                : "#ddd",
          }}
        >

          {/* Progress fill */}
          <div
            style={{
              width:
                `${progressPercentage}%`,

              height: "100%",

              backgroundColor:
                "#4caf50",

              transition:
                "0.3s ease",
            }}
          />
        </div>

        {/* Progress details */}
        <p
          style={{
            marginTop: "8px",
            fontSize: "14px",
            color: "gray",
            textAlign: "center",
          }}
        >
          {completedTasks} of{" "}
          {totalTasks} tasks
          completed
        </p>

      </div>

      {/* Dashboard stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2, 1fr)",

          gap: "12px",
          margin: "20px 0",
        }}
      >

        {/* Total Tasks */}
        <div
          style={{
            backgroundColor:
              darkMode
                ? "#2a2a2a"
                : "#f5f5f5",

            border: darkMode
              ? "1px solid #444"
              : "1px solid #ddd",

            borderRadius: "12px",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: "gray",
            }}
          >
            Total
          </div>

          <strong
            style={{
              fontSize: "24px",
            }}
          >
            {totalTasks}
          </strong>
        </div>

        {/* Completed Tasks */}
        <div
          style={{
            backgroundColor:
              darkMode
                ? "#2a2a2a"
                : "#f5f5f5",

            border: darkMode
              ? "1px solid #444"
              : "1px solid #ddd",

            borderRadius: "12px",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: "gray",
            }}
          >
            Completed
          </div>

          <strong
            style={{
              fontSize: "24px",
              color: "#4caf50",
            }}
          >
            {completedTasks}
          </strong>
        </div>

        {/* Pending Tasks */}
        <div
          style={{
            backgroundColor:
              darkMode
                ? "#2a2a2a"
                : "#f5f5f5",

            border: darkMode
              ? "1px solid #444"
              : "1px solid #ddd",

            borderRadius: "12px",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: "gray",
            }}
          >
            Pending
          </div>

          <strong
            style={{
              fontSize: "24px",
              color: "#ff9800",
            }}
          >
            {pendingTasks}
          </strong>
        </div>

        {/* Overdue Tasks */}
        <div
          style={{
            backgroundColor:
              darkMode
                ? "#2a2a2a"
                : "#f5f5f5",

            border: darkMode
              ? "1px solid #444"
              : "1px solid #ddd",

            borderRadius: "12px",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: "gray",
            }}
          >
            Overdue
          </div>

          <strong
            style={{
              fontSize: "24px",
              color: "red",
            }}
          >
            {overdueTasks}
          </strong>
        </div>

      </div>

      {/* Task list component */}
      {/* Show message if no tasks exist */}
      {filteredTasks.length === 0 ? (

        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            padding: "30px",

            backgroundColor:
              darkMode
                ? "#2a2a2a"
                : "#f5f5f5",

            borderRadius: "16px",

            border: darkMode
              ? "1px solid #444"
              : "1px solid #ddd",
          }}
        >
          <h2>
            🚀 No tasks yet
          </h2>

          <p
            style={{
              color: "gray",
            }}
          >
            Add your first task
          </p>
        </div>

      ) : (

        <TaskList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onToggle={toggleTask}
          onEdit={editTask}
        />
      )}
    </div>
  );
}

export default App;
