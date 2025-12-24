import { configureStore } from "@reduxjs/toolkit";
import todos from "../todos/todosSlice";
import categories from "../features/categoriesSlice";

export const store = configureStore({
  reducer: { todos, categories }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
