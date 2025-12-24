import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { Todo } from "../types";

type FilterType = 'all' | 'active' | 'completed';
type SortType = 'dueDate' | 'createdAt';

export default function TodoBoard() {
  const todos = useAppSelector(s => s.todos);
  const categories = useAppSelector(s => s.categories);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('dueDate');

  const filterTodos = (todoList: Todo[]) => {
    switch (filter) {
      case 'active':
        return todoList.filter(t => !t.completed);
      case 'completed':
        return todoList.filter(t => t.completed);
      default:
        return todoList;
    }
  };

  const sortTodos = (todoList: Todo[]) => {
    return [...todoList].sort((a, b) => {
      const dateA = new Date(sortBy === 'dueDate' ? a.dueDate : a.createdAt).getTime();
      const dateB = new Date(sortBy === 'dueDate' ? b.dueDate : b.createdAt).getTime();
      return dateA - dateB;
    });
  };

  return (
    <div className="todo-board">
      <TodoForm />

      <div className="filters-section">
        <div className="filter-group">
          <label>Filter:</label>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="filter-group">
          <label>Sort by:</label>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${sortBy === 'dueDate' ? 'active' : ''}`}
              onClick={() => setSortBy('dueDate')}
            >
              Due Date
            </button>
            <button
              className={`filter-btn ${sortBy === 'createdAt' ? 'active' : ''}`}
              onClick={() => setSortBy('createdAt')}
            >
              Created Date
            </button>
          </div>
        </div>
      </div>

      {categories.map(cat => {
        const categoryTodos = todos.filter(t => t.categoryId === cat.id);
        const filteredTodos = filterTodos(categoryTodos);
        const sortedTodos = sortTodos(filteredTodos);

        return (
          <div key={cat.id} className="category-section">
            <h3>{cat.name}</h3>
            <ul className="todo-list">
              {sortedTodos.length > 0 ? (
                sortedTodos.map(todo => (
                  <TodoItem key={todo.id} todo={todo} />
                ))
              ) : (
                <div className="empty-state">
                  {categoryTodos.length > 0
                    ? `No ${filter} todos in this category`
                    : 'No todos in this category yet'}
                </div>
              )}
            </ul>
          </div>
        );
      })}

      {categories.length === 0 && (
        <div className="category-section">
          <div className="empty-state">
            Create a category to get started!
          </div>
        </div>
      )}
    </div>
  );
}
