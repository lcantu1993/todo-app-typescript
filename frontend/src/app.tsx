import { useEffect, useState } from "react";
import { useAppDispatch } from "./app/hooks";
import { fetchTodos } from "./todos/todosSlice";
import { fetchCategories } from "./features/categoriesSlice";
import TodoBoard from "./todos/TodoBoard";
import CategoriesPanel from "./features/CategoriesPanel";
import "./styles.css";

export default function App() {
  const dispatch = useAppDispatch();
  const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/categories');
        if (response.ok) {
          setBackendStatus('connected');
          dispatch(fetchTodos());
          dispatch(fetchCategories());
        } else {
          setBackendStatus('disconnected');
        }
      } catch (error) {
        setBackendStatus('disconnected');
      }
    };

    checkBackend();
  }, [dispatch]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="header-top">
            <div className="logo">
              <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h1>Todo Manager</h1>
            </div>
            <div className={`status-indicator ${backendStatus}`}>
              <div className="status-dot"></div>
              <span>
                {backendStatus === 'checking' && 'Connecting...'}
                {backendStatus === 'connected' && 'Connected'}
                {backendStatus === 'disconnected' && 'Backend Offline'}
              </span>
            </div>
          </div>
          <p className="tagline">Organize your tasks efficiently</p>
        </div>
      </header>

      {backendStatus === 'disconnected' && (
        <div className="error-banner">
          <strong>Backend server is not running!</strong> Please start the backend server:
          <code>cd backend && npm run dev</code>
        </div>
      )}

      <div className="main-content">
        <CategoriesPanel />
        <TodoBoard />
      </div>

      <footer className="app-footer">
        <p>&copy; 2025 Todo Manager. Built with React, Redux Toolkit & TypeScript</p>
      </footer>
    </div>
  );
}
