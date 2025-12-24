import { Router } from "express";
import { v4 as uuid } from "uuid";
import { store } from "../db/store";
import { todoSchema } from "../validation/schemas";

export const todosRouter = Router();

todosRouter.get("/", (_, res) => {
  res.json([...store.todos.values()]);
});

todosRouter.post("/", (req, res) => {
  const parsed = todoSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const todo = {
    id: uuid(),
    title: parsed.data.title,
    description: parsed.data.description ?? "",
    dueDate: parsed.data.dueDate,
    categoryId: parsed.data.categoryId,
    completed: false,
    createdAt: new Date().toISOString()
  };

  store.todos.set(todo.id, todo);
  res.status(201).json(todo);
});

todosRouter.patch("/:id", (req, res) => {
  const todo = store.todos.get(req.params.id);
  if (!todo) return res.status(404).end();

  Object.assign(todo, req.body);
  res.json(todo);
});

todosRouter.delete("/:id", (req, res) => {
  store.todos.delete(req.params.id);
  res.status(204).end();
});
