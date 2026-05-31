import { useState } from "react";

function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleSave = () => {
    if (editedText.trim() === "") return;

    onEdit(task.id, editedText);
    setIsEditing(false);
  };

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
        <span
          onClick={() => onToggle(task.id)}
          style={{
            cursor: "pointer",
            textDecoration: task.completed
              ? "line-through"
              : "none",
          }}
        >
          {task.text}
        </span>
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