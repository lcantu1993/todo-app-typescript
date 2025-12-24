import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { createCategory } from "./categoriesSlice";

const SUGGESTED_CATEGORIES = [
  "Work",
  "Personal",
  "Shopping",
  "Health & Fitness",
  "Study",
  "Home",
  "Finance",
  "Travel"
];

export default function CategoriesPanel() {
  const categories = useAppSelector(s => s.categories);
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(createCategory({ name: name.trim() }));
      setName("");
      setShowSuggestions(false);
    }
  };

  const addSuggestedCategory = (categoryName: string) => {
    if (!categories.find(c => c.name === categoryName)) {
      dispatch(createCategory({ name: categoryName }));
    }
  };

  const filteredSuggestions = SUGGESTED_CATEGORIES.filter(
    cat => !categories.find(c => c.name === cat) &&
    cat.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <div className="categories-panel">
      <h3>Categories</h3>

      <form onSubmit={handleSubmit} className="category-form">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="New category..."
            value={name}
            onChange={e => setName(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="category-input"
          />
          {showSuggestions && name && filteredSuggestions.length > 0 && (
            <ul className="suggestions-dropdown">
              {filteredSuggestions.map(cat => (
                <li
                  key={cat}
                  onClick={() => {
                    setName(cat);
                    setShowSuggestions(false);
                  }}
                  className="suggestion-item"
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>

      <div className="quick-add">
        <p className="quick-add-label">Quick Add:</p>
        <div className="quick-add-buttons">
          {SUGGESTED_CATEGORIES.filter(cat => !categories.find(c => c.name === cat)).slice(0, 4).map(cat => (
            <button
              key={cat}
              onClick={() => addSuggestedCategory(cat)}
              className="btn btn-small btn-secondary"
            >
              + {cat}
            </button>
          ))}
        </div>
      </div>

      <ul className="category-list">
        {categories.map(c => (
          <li key={c.id} className="category-item">{c.name}</li>
        ))}
        {categories.length === 0 && (
          <li className="empty-state">No categories yet. Add one above!</li>
        )}
      </ul>
    </div>
  );
}
