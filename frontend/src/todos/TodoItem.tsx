import { useState } from "react";
import { Todo } from "../types";
import { useAppDispatch } from "../app/hooks";
import { deleteTodo, updateTodo } from "./todosSlice";

type Props = {
  todo: Todo;
};

export default function TodoItem({ todo }: Props) {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const toggleComplete = () => {
    dispatch(updateTodo({ id: todo.id, patch: { completed: !todo.completed } }));
  };

  const saveEdit = () => {
    if (title.trim()) {
      dispatch(updateTodo({ id: todo.id, patch: { title } }));
      setEditing(false);
    }
  };

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleComplete}
        className="todo-checkbox"
      />

      {editing ? (
        <>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="todo-edit-input"
            autoFocus
          />
          <div className="todo-actions">
            <button onClick={saveEdit} className="btn btn-small btn-success">
              Save
            </button>
            <button onClick={() => setEditing(false)} className="btn btn-small btn-secondary">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="todo-content">
            <div className={`todo-title ${todo.completed ? "completed" : ""}`}>
              {todo.title}
            </div>
            {todo.description && (
              <div className="todo-description">{todo.description}</div>
            )}
            <div className="todo-meta">
              <span className="todo-meta-item">
                <strong>Due:</strong> {new Date(todo.dueDate).toLocaleDateString()}
              </span>
              <span className="todo-meta-item">
                <strong>Created:</strong> {new Date(todo.createdAt).toLocaleDateString()}
              </span>
              {todo.completed && (
                <span className="todo-meta-item todo-status-badge completed-badge">
                  Completed
                </span>
              )}
            </div>
          </div>

          <div className="todo-actions">
            <button onClick={() => setEditing(true)} className="btn btn-small btn-secondary">
              Edit
            </button>
            <button
              onClick={() => dispatch(deleteTodo(todo.id))}
              className="btn btn-small btn-danger"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
