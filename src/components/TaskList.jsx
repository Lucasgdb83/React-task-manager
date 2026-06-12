
import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onToggle, onEdit, darkMode }) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul style={{ padding: 0 }}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
              onEdit={onEdit}
              darkMode={darkMode}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;