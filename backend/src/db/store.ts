import { Todo, Category } from "../types";

export const store = {
  todos: new Map<string, Todo>(),
  categories: new Map<string, Category>()
};
