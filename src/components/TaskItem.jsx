import { useState } from "react";

function TaskItem({
  task,
  onDelete,
  onToggle,
  onEdit,
}) {

  // Controls edit mode
  const [isEditing,
    setIsEditing] =
    useState(false);

  // State for edited task name
  const [editedText,
    setEditedText] =
    useState(task.text);

  // State for edited priority
  const [editedPriority,
    setEditedPriority] =
    useState(task.priority);

  // State for edited due date
  const [editedDueDate,
    setEditedDueDate] =
    useState(
      task.dueDate || ""
    );

  // State for edited category
  const [editedCategory,
    setEditedCategory] =
    useState(
      task.category ||
      "Personal"
    );

  // Controls delete confirmation
  const [showDeleteConfirm,
    setShowDeleteConfirm] =
    useState(false);

  // Save edited task
  const handleSave = () => {

    // Prevent empty task name
    if (
      editedText.trim() === ""
    ) return;

    // Send updated task data
    onEdit(
      task.id,
      editedText,
      editedPriority,
      editedDueDate,
      editedCategory
    );

    // Exit edit mode
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

        // Better mobile alignment
        alignItems: "flex-start",
        marginBottom: "10px",
        listStyle: "none",
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "8px",

        // Allow wrapping
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      {isEditing ? (

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >

          {/* Edit task name */}
          <input
            value={editedText}
            onChange={(e) =>
              setEditedText(
                e.target.value
              )
            }
            style={{
              padding: "8px",
            }}
          />

          {/* Edit priority */}
          <select
            value={editedPriority}
            onChange={(e) =>
              setEditedPriority(
                e.target.value
              )
            }
            style={{
              padding: "8px",
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

          {/* Edit due date */}
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) =>
              setEditedDueDate(
                e.target.value
              )
            }
            style={{
              padding: "8px",
            }}
          />

          {/* Edit category */}
          <select
            value={editedCategory}
            onChange={(e) =>
              setEditedCategory(
                e.target.value
              )
            }
            style={{
              padding: "8px",
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

        </div>
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

              {/* Shows warning if overdue */}
              {isOverdue && "⚠ OVERDUE - "}

              Due: {task.dueDate}
            </div>
          )}

          {/* Show task category */}
          <div
            style={{
              fontSize: "14px",
              color: "steelblue",
              marginTop: "5px",
            }}
          >
            Category: {task.category}
          </div>

        </div>
      )}

      <div>

        {/* Show Save button while editing */}
        {isEditing ? (
          <button
            onClick={handleSave}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        ) : (

          /* Show Edit button when NOT editing */
          <button
            onClick={() =>
              setIsEditing(true)
            }
            style={{
              padding: "6px 14px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              minWidth: "60px",
            }}
          >
            Edit
          </button>
        )}


        {/* Delete button
      Shows confirmation first */}
        <button
          onClick={() =>
            setShowDeleteConfirm(true)
          }
          style={{
            marginLeft: "10px",
            padding: "6px 14px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontSize: "12px",
            minWidth: "60px",
          }}
        >
          Delete
        </button>

        {/* Show delete confirmation */}
        {showDeleteConfirm && (

          <div
            style={{
              marginTop: "10px",
              fontSize: "14px",
            }}
          >

            {/* Confirmation message */}
            <p>
              Delete this task?
            </p>

            {/* Confirm delete button */}
            <button
              onClick={() =>
                onDelete(task.id)
              }
              style={{
                marginRight: "10px",
                padding: "6px 12px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Yes
            </button>

            {/* Cancel delete button */}
            <button
              onClick={() =>
                setShowDeleteConfirm(false)
              }
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>

          </div>
        )}

      </div>
    </li>
  );
}

export default TaskItem;