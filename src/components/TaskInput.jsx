import { useState } from "react";

function TaskInput({ onAddTask }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] =
  useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
      priority: priority,
      dueDate:dueDate,
    };

    onAddTask(newTask);
    setText("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Enter a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: "8px", width: "70%" }}
      />
      <select
  value={priority}
  onChange={(e) =>
    setPriority(e.target.value)
  }
  style={{
    padding: "8px",
    marginLeft: "10px",
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

<input
  type="date"
  value={dueDate}
  onChange={(e) =>
    setDueDate(e.target.value)
  }
  style={{
    padding: "8px",
    marginLeft: "10px",
  }}
/>

      <button style={{ padding: "8px", marginLeft: "10px" }}>
        Add
      </button>
    </form>
  );
}


export default TaskInput;