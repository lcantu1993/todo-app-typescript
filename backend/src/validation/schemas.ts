import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string(),
  categoryId: z.string()
});

export const categorySchema = z.object({
  name: z.string().min(1)
});
