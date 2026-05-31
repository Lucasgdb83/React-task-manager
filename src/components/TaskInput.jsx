import { useState } from "react";

function TaskInput({ onAddTask }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    onAddTask(newTask);
    setText("");
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

      <button style={{ padding: "8px", marginLeft: "10px" }}>
        Add
      </button>
    </form>
  );
}

export default TaskInput;