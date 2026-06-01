import { useState } from "react";

function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleSave = () => {
    if (editedText.trim() === "") return;

    onEdit(task.id, editedText);
    setIsEditing(false);
  };

 // Check if task is overdue
 // Compare today's date with task due date
  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) <
      new Date().setHours(0, 0, 0, 0);

  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
        listStyle: "none",
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      {isEditing ? (
        <input
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
      <div
  onClick={() => onToggle(task.id)}
  style={{
    cursor: "pointer",
    textDecoration: task.completed
      ? "line-through"
      : "none",
  }}
>
  <strong
    style={{
      color:
        task.priority === "High"
          ? "red"
          : task.priority === "Medium"
          ? "orange"
          : "green",
    }}
  >
    [{task.priority}]
  </strong>{" "}
  {task.text}
{/* Show due date if one exists */}
{task.dueDate && (
  <div
    style={{
      fontSize: "14px",

      // If overdue = red
      // Otherwise gray
      color: isOverdue
        ? "red"
        : "gray",

      marginTop: "5px",
    }}
  >

    {/* Show warning if overdue */}
    {isOverdue && "⚠ OVERDUE - "}

    Due: {task.dueDate}
  </div>
)}
</div>
      )}

      <div>
        {isEditing ? (
          <button onClick={handleSave}>
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}

        <button
          onClick={() => onDelete(task.id)}
          style={{ marginLeft: "10px" }}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;