# Full Stack Todo Application

A modern, full-featured todo application with category management, filtering, and sorting capabilities. Built with TypeScript on both frontend and backend.

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **Zod** - Schema validation
- **UUID** - Unique ID generation
- **In-memory storage** - Fast data persistence

### Frontend
- **React 18** - UI framework
- **Redux Toolkit** - State management
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **CSS3** - Modern styling with gradients and animations

## Features

### Core Functionality
- **Create Todos** - Add tasks with title, description, and due date
- **Edit Todos** - Modify existing tasks inline
- **Delete Todos** - Remove tasks
- **Mark Complete** - Toggle completion status with checkbox
- **Categories** - Organize todos into custom categories
- **Filter** - View all, active, or completed todos
- **Sort** - Order by due date or creation date
- **Grouped View** - Todos organized by category

### Bonus Features
- **Beautiful UI** - Modern gradient design with smooth animations
- **Quick Add Categories** - One-click buttons for common categories
- **Autocomplete** - Smart suggestions while typing categories
- **Connection Status** - Real-time backend connection indicator
- **Persistent State** - Redux Toolkit with async thunks
- **Responsive Design** - Works on mobile and desktop
- **Empty States** - Helpful messages when no data exists

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm installed
- Two terminal windows

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The backend will run on **http://localhost:4000**

### Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on **http://localhost:5173**

4. Open your browser to http://localhost:5173

## API Endpoints

### Todos
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PATCH /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── index.ts              # Express server setup
│   │   ├── types.ts              # TypeScript types
│   │   ├── db/
│   │   │   └── store.ts          # In-memory database
│   │   ├── routes/
│   │   │   ├── todos.ts          # Todo endpoints
│   │   │   └── categories.ts    # Category endpoints
│   │   └── validation/
│   │       └── schemas.ts        # Zod validation schemas
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── main.tsx              # App entry point
    │   ├── app.tsx               # Root component
    │   ├── types.ts              # TypeScript types
    │   ├── styles.css            # Global styles
    │   ├── api/
    │   │   └── client.ts         # API client
    │   ├── app/
    │   │   ├── store.ts          # Redux store
    │   │   └── hooks.ts          # Typed Redux hooks
    │   ├── features/
    │   │   ├── categoriesSlice.ts    # Categories state
    │   │   └── CategoriesPanel.tsx   # Categories UI
    │   └── todos/
    │       ├── todosSlice.ts         # Todos state
    │       ├── TodoBoard.tsx         # Main board view
    │       ├── TodoForm.tsx          # Create todo form
    │       └── TodoItem.tsx          # Individual todo
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

## Usage Guide

### Getting Started
1. **Create Categories** - Use the left sidebar to add categories (Work, Personal, etc.)
2. **Add Todos** - Fill out the form with title, due date, category, and optional description
3. **Manage Todos** - Check off completed tasks, edit titles, or delete items
4. **Filter & Sort** - Use the filter buttons to show all/active/completed, and sort by date

### Tips
- Use Quick Add buttons for instant category creation
- Type in category input for autocomplete suggestions
- Filter by status to focus on what matters
- Sort by due date to see urgent tasks first
- Check the connection indicator to ensure backend is running

## Technical Highlights

- **Type Safety** - End-to-end TypeScript coverage
- **State Management** - Redux Toolkit with createAsyncThunk for API calls
- **Validation** - Zod schemas for runtime type checking
- **Error Handling** - Graceful degradation with user-friendly messages
- **Code Organization** - Feature-based folder structure
- **Modern Tooling** - Vite for fast development and builds

## Troubleshooting

**Categories not appearing?**
- Ensure backend is running on port 4000
- Check the connection status indicator in the header

**Build errors?**
- Delete `node_modules` and run `npm install` again
- Ensure Node.js version is 18 or higher

**Port already in use?**
- Backend: Change port in `backend/src/index.ts`
- Frontend: Vite will prompt to use a different port

## License

MIT

## Author

Luis Cantu

Built as a technical assessment demonstrating full-stack TypeScript development with React, Redux Toolkit, and Express.js


