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
      gap: "10px",
      marginBottom: "20px",
    }}
  >

    {/* First row */}
    <div
      style={{
        display: "flex",
        gap: "10px",
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
          padding: "8px",
          width: "100%",
        }}
      />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value)
        }
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
    </div>

    {/* Second row */}
    <div
      style={{
        display: "flex",
        gap: "10px",
      }}
    >
      <input
        type="date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(e.target.value)
        }
        style={{
          padding: "8px",
        }}
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
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

      <button
        style={{
          padding: "8px 16px",
        }}
      >
        Add
      </button>
    </div>
  </form>
);
}


export default TaskInput;