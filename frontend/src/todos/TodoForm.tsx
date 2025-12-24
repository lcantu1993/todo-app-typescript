import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createTodo } from "./todosSlice";

export default function TodoForm() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(s => s.categories);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !dueDate || !categoryId) return;

    dispatch(
      createTodo({
        title,
        description,
        dueDate: new Date(dueDate).toISOString(),
        categoryId
      })
    );

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={submit} className="todo-form">
      <h3>Create New Todo</h3>

      <div className="form-grid">
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            placeholder="Enter todo title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Due Date *</label>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Category *</label>
          <select
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group form-group-full">
          <label>Description</label>
          <textarea
            placeholder="Enter description (optional)..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Add Todo
      </button>
    </form>
  );
}
