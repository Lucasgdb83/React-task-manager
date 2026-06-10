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

  // Controls hover effect
  const [isHovered,
    setIsHovered] =
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

  // Reusable button style
  const buttonStyle = {
    padding: "8px 14px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    cursor: "pointer",
    fontSize: "13px",
    minWidth: "70px",
    transition: "0.2s ease",
  };

  return (
    <li
      onMouseEnter={() =>
        setIsHovered(true)
      }

      onMouseLeave={() =>
        setIsHovered(false)
      }

      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        // Better mobile alignment
        alignItems: "flex-start",

        // Allow wrapping on small screens
        flexWrap: "wrap",
        gap: "10px",

        // Card spacing
        marginBottom: "16px",
        listStyle: "none",
        padding: "20px",

        // Cleaner dark mode card
        border: "1px solid #444",
        borderRadius: "18px",

        // Softer background
        backgroundColor:
          task.completed
            ? "#252525"
            : "#1e1e1e",

        // Subtle shadow
        boxShadow: isHovered
          ? "0 8px 20px rgba(0,0,0,0.35)"
          : "0 4px 12px rgba(0,0,0,0.2)",

        // Smooth animation
        transform: isHovered
          ? "translateY(-3px)"
          : "translateY(0)",

        // Smooth animation
        transition: "0.2s ease",
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
          onClick={() =>
            onToggle(task.id)
          }
          style={{
            cursor: "pointer",

            // Strike-through completed task
            textDecoration:
              task.completed
                ? "line-through"
                : "none",

            // Fade completed task
            opacity:
              task.completed
                ? 0.65
                : 1,

            transition:
              "0.2s ease",
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
          {task.completed &&
            "✔ "}
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
              display: "inline-block",
              padding: "4px 10px",
              borderRadius: "12px",

              // Different color
              // for each category
              backgroundColor:
                task.category === "Work"
                  ? "#1e3a5f"
                  : task.category === "Study"
                    ? "#4b2c69"
                    : task.category === "Gym"
                      ? "#1b5e20"
                      : "#5d4037",

              color:
                task.category === "Work"
                  ? "#4da6ff"
                  : task.category === "Study"
                    ? "#bb86fc"
                    : task.category === "Gym"
                      ? "#66bb6a"
                      : "#ffb74d",

              fontSize: "13px",
              fontWeight: "bold",
              marginTop: "8px",
            }}
          >
            {task.category}
          </div>

        </div>
      )}

      <div>

        {/* Show Save button while editing */}
        {isEditing ? (
          <button
            onClick={handleSave}
            style={buttonStyle}

          >
            Save
          </button>
        ) : (

          /* Show Edit button when NOT editing */
          <button
            onClick={() =>
              setIsEditing(true)
            }
            style={buttonStyle}
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
            ...buttonStyle,
            marginLeft: "10px",
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
                ...buttonStyle,
                marginRight: "10px",
              }}
            >
              Yes
            </button>

            {/* Cancel delete button */}
            <button
              onClick={() =>
                setShowDeleteConfirm(false)
              }
              style={buttonStyle}
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