import { Router } from "express";
import { v4 as uuid } from "uuid";
import { store } from "../db/store";
import { categorySchema } from "../validation/schemas";

export const categoriesRouter = Router();

categoriesRouter.get("/", (_, res) => {
  res.json([...store.categories.values()]);
});

categoriesRouter.post("/", (req, res) => {
  const parsed = categorySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const category = {
    id: uuid(),
    name: parsed.data.name,
    createdAt: new Date().toISOString()
  };

  store.categories.set(category.id, category);
  res.status(201).json(category);
});
