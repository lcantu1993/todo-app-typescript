import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/client";
import { Todo } from "../types";

export const fetchTodos = createAsyncThunk("todos/fetch", () =>
  api<Todo[]>("/todos")
);

export const createTodo = createAsyncThunk(
  "todos/create",
  (data: Omit<Todo, "id" | "createdAt" | "completed">) =>
    api<Todo>("/todos", {
      method: "POST",
      body: JSON.stringify(data)
    })
);

export const updateTodo = createAsyncThunk(
  "todos/update",
  ({ id, patch }: { id: string; patch: Partial<Todo> }) =>
    api<Todo>(`/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch)
    })
);

export const deleteTodo = createAsyncThunk("todos/delete", (id: string) =>
  api<void>(`/todos/${id}`, { method: "DELETE" })
);

const slice = createSlice({
  name: "todos",
  initialState: [] as Todo[],
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchTodos.fulfilled, (_, a) => a.payload);
    b.addCase(createTodo.fulfilled, (state, a) => {
      state.push(a.payload);
    });
    b.addCase(updateTodo.fulfilled, (state, a) => {
      const idx = state.findIndex(t => t.id === a.payload.id);
      if (idx !== -1) state[idx] = a.payload;
    });
    b.addCase(deleteTodo.fulfilled, (state, a) => {
      return state.filter(t => t.id !== a.meta.arg);
    });
  }
});

export default slice.reducer;
