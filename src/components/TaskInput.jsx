import { useState } from "react";

function TaskInput({ onAddTask }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] =
    useState("");
  // State for task category
  const [category, setCategory] =
    useState("Personal");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") return;

    // Create new task object
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
      priority: priority,
      dueDate: dueDate,
      category: category,
    };

    onAddTask(newTask);
    setText("");
    setDueDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginBottom: "25px",
      }}
    >

      {/* First row */}
      <div
        style={{
          display: "flex",
          gap: "10px",

          // Wrap items on smaller screens
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Enter a task..."
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          style={{
            padding: "10px",
            width: "100%",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "14px",
            height: "20px",
          }}
        />
        
      </div>

      {/* Second row */}
      
      <div
        style={{
          display: "flex",

          // Space between buttons
          gap: "14px",

          // Better alignment
          justifyContent: "center",

          // Mobile wrap
          flexWrap: "wrap",

          marginTop: "4px",
        }}
      >

        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            setDueDate(e.target.value)
          }
          style={{
            padding: "6px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
            minHeight: "10px",
          }}
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)

          }
          style={{
            padding: "6px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
            minHeight: "10px",
          }}

        >

          <option value="Personal">
            Personal
          </option>

          <option value="Study">
            Study
          </option>

          <option value="Work">
            Work
          </option>

          <option value="Gym">
            Gym
          </option>
        </select>

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }

          style={{
            padding: "8px 12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "14px",
            height: "42px",
            minWidth: "80px",
            cursor: "pointer",
          }}
        >
          <option value="Low">
            Low
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="High">
            High
          </option>
        </select>

        <button
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "2px solid #aab4b8ff",
            fontSize: "14px",
            minHeight: "10px",
            fontWeight: "bold",
          }}
        >
          Add
        </button>
      </div>
    </form >
  );
}


export default TaskInput;